"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/input";
import { Mail, Phone, User, Clock, Check, Copy, Download } from "lucide-react";
import { bookingSchema, BookingFormData } from "@/schemas/booking.schema";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DateSelect } from "@/components/ui/date-select";
import { BookingRequest } from "@/types/booking.d";
import { createApiEndpoint, cancelBooking } from "@/lib/api-utils";
import { useTicketActions } from "@/hooks/use-ticket-actions";
import { usePrices } from "@/hooks/use-prices";

export const dynamic = "force-dynamic";

type RoomType = "Small" | "Medium" | "Large";

// Mapping for room types
const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  Small: "S-Box (1-3 người)",
  Medium: "M-Box (4-5 người)",
  Large: "L-Box (6-8 người)",
};

// Định nghĩa các giờ có thể bắt đầu
const ALL_START_TIMES = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

// Hàm lấy các giờ có thể đặt dựa trên thời gian hiện tại
const getAvailableStartTimes = (selectedDate: Date): string[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const selectedDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  // Nếu chọn ngày khác ngày hôm nay, cho phép tất cả giờ
  if (selectedDay.getTime() !== today.getTime()) {
    return ALL_START_TIMES;
  }

  // Nếu chọn ngày hôm nay, chỉ cho phép giờ từ hiện tại + 30 phút trở đi
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Thêm buffer 30 phút để khách có thời gian chuẩn bị
  const minTimeInMinutes = currentTimeInMinutes + 30;

  return ALL_START_TIMES.filter((time) => {
    const [hour, minute] = time.split(":").map(Number);
    const timeInMinutes = hour * 60 + minute;
    return timeInMinutes >= minTimeInMinutes;
  });
};

// Số giờ có thể đặt (0.5 giờ đến 4 giờ)
const DURATION_OPTIONS = [
  { value: 1, label: "1 giờ" },
  { value: 1.5, label: "1.5 giờ" },
  { value: 2, label: "2 giờ" },
  { value: 2.5, label: "2.5 giờ" },
  { value: 3, label: "3 giờ" },
  { value: 3.5, label: "3.5 giờ" },
  { value: 4, label: "4 giờ" },
];

// Component để handle search params
function BookingWithSearchParams({
  onRoomTypeChange,
}: {
  onRoomTypeChange: (roomType: RoomType) => void;
}) {
  const searchParams = useSearchParams();
  const roomTypeParam = searchParams.get("roomType") as RoomType | null;

  useEffect(() => {
    if (roomTypeParam && ["Small", "Medium", "Large"].includes(roomTypeParam)) {
      onRoomTypeChange(roomTypeParam);
    }
  }, [roomTypeParam, onRoomTypeChange]);

  return null;
}

export default function BookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>("Small");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sử dụng custom hook để quản lý prices với cache
  const { prices, loading: pricesLoading, error: pricesError } = usePrices();

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState<{
    name: string;
    phone: string;
    date: string;
    time: string;
    roomType: string;
  } | null>(null);

  // Cancel booking state
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Ticket actions hook
  const { downloadTicket } = useTicketActions();

  const handleRoomTypeChange = useCallback((roomType: RoomType) => {
    setSelectedRoomType(roomType);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      roomType: "Small",
      startTime: "",
      endTime: "",
      note: "",
    },
  });

  // Watch form values để cập nhật roomType
  watch("roomType");

  useEffect(() => {
    setValue("roomType", selectedRoomType);
  }, [selectedRoomType, setValue]);

  // Reset selectedStartTime khi ngày thay đổi và giờ đã chọn không còn hợp lệ
  useEffect(() => {
    const availableTimes = getAvailableStartTimes(selectedDate);
    if (selectedStartTime && !availableTimes.includes(selectedStartTime)) {
      setSelectedStartTime("");
      setValue("startTime", "");
    }
  }, [selectedDate, selectedStartTime, setValue]);

  // Tính toán thời gian kết thúc dựa trên thời gian bắt đầu và thời lượng
  const calculateEndTime = (startTime: string, duration: number): string => {
    if (!startTime) return "";

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = totalStartMinutes + duration * 60;

    const endHour = Math.floor(totalEndMinutes / 60);
    const endMinute = totalEndMinutes % 60;

    return `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;
  };

  // Cập nhật endTime khi startTime hoặc duration thay đổi
  useEffect(() => {
    if (selectedStartTime && selectedDuration) {
      const endTime = calculateEndTime(selectedStartTime, selectedDuration);
      setValue("endTime", endTime);
    }
  }, [selectedStartTime, selectedDuration, setValue]);

  // Tạo ISO string với timezone +07:00
  const createISOString = (date: Date, time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);

    // Tạo ISO string với timezone +07:00
    const offset = 7 * 60; // +07:00 in minutes
    const utc = new Date(
      dateTime.getTime() - dateTime.getTimezoneOffset() * 60000
    );
    const localTime = new Date(utc.getTime() + offset * 60000);

    return localTime.toISOString().replace("Z", "+07:00");
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedStartTime || !selectedDuration) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn thời gian hợp lệ",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Tạo startTime và endTime với format ISO string +07:00
      const startTimeISO = createISOString(selectedDate, selectedStartTime);
      const endTimeISO = createISOString(
        selectedDate,
        calculateEndTime(selectedStartTime, selectedDuration)
      );

      // Chuẩn bị dữ liệu booking theo format API mới
      const bookingData: BookingRequest = {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || undefined,
        roomType: data.roomType,
        startTime: startTimeISO,
        endTime: endTimeISO,
        note: data.note || undefined,
      };

      console.log("Booking data:", bookingData);

      // Gọi API mới
      const apiUrl = createApiEndpoint("/bookings/online");
      console.log("Using API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        // Hiển thị modal xác nhận
        const bookingId = result.booking?._id || "";
        setBookingId(bookingId);
        setBookingCode(bookingId.slice(-6).toUpperCase());
        setBookingDetails({
          name: data.customerName,
          phone: data.customerPhone,
          date: format(selectedDate, "dd/MM/yyyy", { locale: vi }),
          time: `${selectedStartTime} - ${calculateEndTime(
            selectedStartTime,
            selectedDuration
          )}`,
          roomType: ROOM_TYPE_LABELS[data.roomType],
        });
        setShowConfirmModal(true);

        toast({
          title: "Đặt box thành công!",
          description: "Chúc mừng bạn đã đặt box thành công",
        });
      } else {
        toast({
          title: "Đặt box thất bại!",
          description: result.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Đặt box thất bại!",
        description: "Có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy booking code to clipboard
  const copyBookingCode = () => {
    navigator.clipboard.writeText(bookingCode);
    toast({
      title: "Đã sao chép",
      description: "Mã đặt phòng đã được sao chép vào clipboard",
    });
  };

  // Download ticket as image
  const handleDownloadTicket = async () => {
    if (!bookingDetails || !bookingCode) return;

    const success = await downloadTicket({
      ...bookingDetails,
      bookingCode,
    });

    if (success) {
      toast({
        title: "Tải xuống thành công!",
        description: "Vé đặt phòng đã được tải xuống.",
      });
    } else {
      toast({
        title: "Lỗi tải xuống",
        description: "Có lỗi xảy ra khi tải xuống vé. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  // Cancel booking
  const handleCancelBooking = async () => {
    if (!bookingId || !bookingDetails) return;

    setIsCancelling(true);

    try {
      const result = await cancelBooking(bookingId, bookingDetails.phone);

      if (result.success) {
        toast({
          title: "Hủy booking thành công!",
          description: "Booking đã được hủy thành công.",
        });

        // Đóng modal và reset state
        setShowConfirmModal(false);
        setShowCancelModal(false);
        setBookingId("");
        setBookingCode("");
        setBookingDetails(null);

        // Reset form
        router.push("/");
      } else {
        toast({
          title: "Hủy booking thất bại!",
          description: result.message || "Có lỗi xảy ra khi hủy booking.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast({
        title: "Hủy booking thất bại!",
        description: "Có lỗi xảy ra khi hủy booking. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  // Tính toán số giờ đã đặt, hỗ trợ cả thời gian 0.5 giờ
  const getSelectedHours = (): string => {
    if (selectedDuration % 1 === 0) {
      return `${selectedDuration} giờ`;
    } else {
      const hours = Math.floor(selectedDuration);
      return hours > 0 ? `${hours},5 giờ` : "0,5 giờ";
    }
  };

  // Tính giá dự kiến
  const calculateEstimatedPrice = (): number => {
    if (!selectedStartTime || !selectedDuration || prices.length === 0) {
      return 0;
    }

    // Xác định loại ngày
    const dayOfWeek = selectedDate.getDay();
    let dayType: "weekday" | "weekend" | "holiday" = "weekday";

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dayType = "weekend";
    }
    // TODO: Thêm logic kiểm tra ngày lễ nếu cần

    // Chuyển đổi room type từ format mới sang cũ
    const roomTypeMapping: Record<RoomType, string> = {
      Small: "small",
      Medium: "medium",
      Large: "large",
    };
    const roomType = roomTypeMapping[selectedRoomType];

    // Tìm price rule phù hợp
    const priceRule = prices.find((p) => p.day_type === dayType);
    if (!priceRule) return 0;

    // Tính thời gian kết thúc
    const endTime = calculateEndTime(selectedStartTime, selectedDuration);

    // Tính tổng giá cho thời lượng đã chọn
    let totalPrice = 0;
    let currentTime = selectedStartTime;
    let remainingDuration = selectedDuration;

    console.log(
      `Tính giá cho ${selectedStartTime} - ${endTime} (${selectedDuration} giờ)`
    );

    while (remainingDuration > 0) {
      console.log(
        `Current time: ${currentTime}, Remaining: ${remainingDuration} giờ`
      );

      // Tìm time slot chứa currentTime hoặc slot tiếp theo
      let timeSlot = priceRule.time_slots.find((slot) => {
        const [startHour, startMinute] = slot.start.split(":").map(Number);
        const [endHour, endMinute] = slot.end.split(":").map(Number);
        const [currentHour, currentMinute] = currentTime.split(":").map(Number);

        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        const currentMinutes = currentHour * 60 + currentMinute;

        return currentMinutes >= startMinutes && currentMinutes < endMinutes;
      });

      // Nếu không tìm thấy slot (có thể do gap), tìm slot tiếp theo
      if (!timeSlot) {
        timeSlot = priceRule.time_slots.find((slot) => {
          const [startHour, startMinute] = slot.start.split(":").map(Number);
          const [currentHour, currentMinute] = currentTime
            .split(":")
            .map(Number);

          const startMinutes = startHour * 60 + startMinute;
          const currentMinutes = currentHour * 60 + currentMinute;

          return startMinutes > currentMinutes;
        });
      }

      if (!timeSlot) {
        console.log(`Không tìm thấy time slot cho ${currentTime}`);
        break;
      }

      console.log(`Tìm thấy slot: ${timeSlot.start} - ${timeSlot.end}`);

      // Tìm giá cho loại phòng
      const roomPrice = timeSlot.prices.find((p) => p.room_type === roomType);
      if (!roomPrice) {
        console.log(`Không tìm thấy giá cho ${roomType}`);
        break;
      }

      // Tính thời gian có thể sử dụng trong slot này
      const [slotStartHour, slotStartMinute] = timeSlot.start
        .split(":")
        .map(Number);
      const [slotEndHour, slotEndMinute] = timeSlot.end.split(":").map(Number);
      const [currentHour, currentMinute] = currentTime.split(":").map(Number);

      const slotStartMinutes = slotStartHour * 60 + slotStartMinute;
      const slotEndMinutes = slotEndHour * 60 + slotEndMinute;
      const currentMinutes = currentHour * 60 + currentMinute;

      // Nếu currentTime nằm trước slot (do gap), bắt đầu từ đầu slot
      const actualStartMinutes = Math.max(currentMinutes, slotStartMinutes);
      const availableMinutesInSlot = slotEndMinutes - actualStartMinutes;
      const neededMinutes = remainingDuration * 60;
      const usedMinutes = Math.min(availableMinutesInSlot, neededMinutes);

      // Tính giá theo số phút thực tế sử dụng
      const usedHours = usedMinutes / 60;
      const priceForThisSlot = usedHours * roomPrice.price;
      totalPrice += priceForThisSlot;
      remainingDuration -= usedMinutes / 60;

      // Cập nhật currentTime cho slot tiếp theo
      const newMinutes = actualStartMinutes + usedMinutes;
      const newHour = Math.floor(newMinutes / 60);
      const newMinute = newMinutes % 60;
      currentTime = `${newHour.toString().padStart(2, "0")}:${newMinute
        .toString()
        .padStart(2, "0")}`;
    }

    // Làm tròn xuống đến hàng nghìn (VD: 50333 -> 50000)
    return Math.floor(totalPrice / 1000) * 1000;
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      {/* Quay về button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-6"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium">Quay về</span>
      </button>

      <Suspense fallback={<div>Loading...</div>}>
        <BookingWithSearchParams onRoomTypeChange={handleRoomTypeChange} />
      </Suspense>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-lightpink mb-8 text-center ">
          {ROOM_TYPE_LABELS[selectedRoomType]}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Customer Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-lightpink mb-4">
              Thông tin khách hàng
            </h2>

            <Input
              label="Họ và tên"
              {...register("customerName")}
              placeholder="Nhập họ và tên của bạn"
              required
              error={errors.customerName?.message}
              prefix={<User className="h-4 w-4" />}
              maxLength={50}
            />

            <Input
              label="Số điện thoại"
              {...register("customerPhone")}
              placeholder="Nhập số điện thoại của bạn"
              type="tel"
              maxLength={10}
              required
              error={errors.customerPhone?.message}
              prefix={<Phone className="h-4 w-4" />}
            />

            <Input
              label="Email"
              {...register("customerEmail")}
              placeholder="Nhập email của bạn (không bắt buộc)"
              error={errors.customerEmail?.message}
              prefix={<Mail className="h-4 w-4" />}
              maxLength={50}
            />

            <Input
              label="Ghi chú"
              {...register("note")}
              placeholder="Nhập ghi chú"
              helpText="VD: Tổ chức sinh nhật, tổ chức tiệc, ..."
              maxLength={100}
            />
          </div>

          {/* Booking Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-lightpink mb-4">
              Thông tin đặt phòng
            </h2>

            <div className="mb-4">
              <div className="relative">
                <DateSelect
                  value={selectedDate}
                  onChange={setSelectedDate}
                  label="Ngày đặt"
                  required
                />
              </div>
            </div>

            {/* Chọn giờ bắt đầu */}
            <div className="mb-4">
              <label className="block text-lightpink mb-1">
                Giờ bắt đầu
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Clock className="h-4 w-4" />
                </div>
                <select
                  value={selectedStartTime}
                  onChange={(e) => {
                    setSelectedStartTime(e.target.value);
                    setValue("startTime", e.target.value);
                  }}
                  className="w-full border rounded px-3 py-2 pl-10 text-black outline-none focus:ring-2 focus:ring-lightpink focus:border-lightpink"
                >
                  <option value="">Chọn giờ bắt đầu</option>
                  {getAvailableStartTimes(selectedDate).map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              {getAvailableStartTimes(selectedDate).length === 0 && (
                <p className="mt-1 text-sm text-orange-500">
                  Không còn giờ trống trong ngày này. Vui lòng chọn ngày khác.
                </p>
              )}
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            {/* Chọn thời lượng */}
            {selectedStartTime && (
              <div className="mb-4">
                <label className="block text-lightpink mb-1">
                  Thời lượng
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <select
                    value={selectedDuration}
                    onChange={(e) => {
                      const duration = parseFloat(e.target.value);
                      setSelectedDuration(duration);
                      const endTime = calculateEndTime(
                        selectedStartTime,
                        duration
                      );
                      setValue("endTime", endTime);
                    }}
                    className="w-full border rounded px-3 py-2 pl-10 text-black outline-none focus:ring-2 focus:ring-lightpink focus:border-lightpink"
                  >
                    {DURATION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          {selectedStartTime && selectedDuration && (
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold text-lightpink mb-2">
                Thông tin đặt box
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-lightpink">Loại phòng:</span>
                <span className="font-medium text-lightpink">
                  {ROOM_TYPE_LABELS[selectedRoomType]}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-lightpink">Ngày:</span>
                <span className="font-medium text-lightpink">
                  {format(selectedDate, "dd/MM/yyyy", { locale: vi })}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-lightpink">Thời gian:</span>
                <span className="font-medium text-lightpink">
                  {selectedStartTime} -{" "}
                  {calculateEndTime(selectedStartTime, selectedDuration)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-lightpink">Số giờ:</span>
                <span className="font-medium text-lightpink">
                  {getSelectedHours()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-lightpink">Giá dự kiến:</span>
                <span className="font-bold text-green-600 text-lg">
                  {pricesLoading
                    ? "Đang tải..."
                    : pricesError
                    ? "Lỗi tải giá"
                    : `${calculateEstimatedPrice().toLocaleString("vi-VN")}đ`}
                </span>
              </div>

              <div className="mt-4 text-sm border-t pt-3 text-gray-600">
                <p className="mb-1">
                  <span className="font-medium">Lưu ý về thanh toán:</span> Quý
                  sách sẽ thanh toán sau khi sử dụng dịch vụ. Jozo không nhận
                  cọc/thanh toán trước.
                </p>

                <p className="text-red-500">
                  Nếu đến trễ quá 15 phút so với giờ đặt, phòng sẽ được hủy và
                  có thể được sắp xếp cho khách khác.
                </p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting ||
              !selectedStartTime ||
              !selectedDuration ||
              getAvailableStartTimes(selectedDate).length === 0
            }
            className="w-full py-3 mt-6 font-medium tracking-wide text-white bg-lightpink rounded-lg hover:bg-pink-600 transition duration-2000 animate-buttonheartbeat disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang xử lý..." : "Đặt ngay"}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && bookingDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
            {/* Action buttons in top right */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleDownloadTicket}
                className="p-2 bg-lightpink text-white rounded-lg hover:bg-pink-600 transition-colors"
                title="Tải vé"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-lightpink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Check className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-center text-lightpink mb-4">
              Đặt box thành công!
            </h2>

            <div className="mb-6 border-2 border-dashed border-lightpink/40 rounded-lg p-4 bg-lightpink/5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lightpink">Mã đặt phòng:</span>
                <div className="flex items-center">
                  <span className="font-mono text-lg font-bold tracking-wider text-lightpink mr-2">
                    {bookingCode}
                  </span>
                  <button
                    onClick={copyBookingCode}
                    className="text-lightpink hover:text-pink-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic mb-3">
                Vui lòng lưu lại mã đặt phòng để tra cứu sau này
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên khách hàng:</span>
                  <span className="font-medium text-lightpink">
                    {bookingDetails.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium text-lightpink">
                    {bookingDetails.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loại phòng:</span>
                  <span className="font-medium text-lightpink">
                    {bookingDetails.roomType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đặt:</span>
                  <span className="font-medium text-lightpink">
                    {bookingDetails.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium text-lightpink">
                    {bookingDetails.time}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 mb-6">
              Yay! Đặt box thành công rồi nè! 🎉 Hẹn gặp khách iu đúng giờ để
              cùng quẩy tung nóc nha! ✨
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push("/")}
                className="w-full py-3 bg-lightpink text-white rounded-lg hover:bg-pink-600 transition-colors animate-buttonheartbeat"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Xác nhận hủy
              </h2>

              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn hủy box này không? Hành động này không thể
                hoàn tác.
              </p>

              {bookingDetails && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Thông tin:
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã đặt box:</span>
                      <span className="font-medium">{bookingCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tên:</span>
                      <span className="font-medium">{bookingDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SĐT:</span>
                      <span className="font-medium">
                        {bookingDetails.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày:</span>
                      <span className="font-medium">{bookingDetails.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-medium">{bookingDetails.time}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  disabled={isCancelling}
                >
                  Không hủy
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={isCancelling}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCancelling ? "Đang hủy..." : "Xác nhận hủy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
