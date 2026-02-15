"use client";

import { DateSelect } from "@/components/ui/date-select";
import Input from "@/components/ui/input";
import CancelBookingModal from "@/components/ui/cancel-booking-modal";
import BookingSuccessModal from "@/components/ui/booking-success-modal";
import { useTicketActions } from "@/hooks/use-ticket-actions";
import { toast } from "@/hooks/use-toast";
import { cancelBooking, createApiEndpoint } from "@/lib/api-utils";
import { BookingFormData, bookingSchema } from "@/schemas/booking.schema";
import { BookingRequest } from "@/types/booking.d";
import { Price } from "@/types/price";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Mail, Phone, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type RoomType = "Small" | "Medium" | "Large";

type HolidayItem = {
  date: string;
  name: string;
  description: string | null;
};

const sameDay = (d1: Date, d2: Date): boolean =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// Mùng 1 Tết 2026 - Jozo nghỉ, không nhận đặt
const TET_DAY_OFF = new Date(2026, 1, 17); // 17/2/2026
const isTetDay1Off = (date: Date | null): boolean =>
  !!date && sameDay(date, TET_DAY_OFF);

// 30 Tết 16/2/2026 - 9h quán đóng để dọn dẹp đón giao thừa; giờ kết thúc tối đa 21:00 (nếu đặt 8h thì 9h phải đóng)
const EVE_TET_2026 = new Date(2026, 1, 16); // 16/2/2026
const isEveTet2026 = (date: Date | null): boolean =>
  !!date && sameDay(date, EVE_TET_2026);
const EVE_TET_CLOSE_MINUTES = 21 * 60; // 21:00 = 9h tối

// Từ 18/2/2026 trở đi: cho phép đặt đến 23h
const EXTENDED_HOURS_FROM = new Date(2026, 1, 18);
const isExtendedHoursDate = (date: Date | null): boolean =>
  !!date && (date > EXTENDED_HOURS_FROM || sameDay(date, EXTENDED_HOURS_FROM));

// Constants và utility functions
const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  Small: "S-Box (1-3 người)",
  Medium: "M-Box (4-5 người)",
  Large: "L-Box (6-8 người)",
};

// Generate time slots function
const generateTimeSlots = (
  startHour: number,
  endHour: number,
  intervalMinutes: number = 30,
): string[] => {
  const times: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      if (hour === endHour && minute > 0) break; // Dừng ở endHour:00

      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(timeString);
    }
  }

  return times;
};

// Generate all time slots from 10:00 to 22:00 (giờ kết thúc tối đa 23:00 khi đặt 1h từ 22:00)
const ALL_START_TIMES = generateTimeSlots(10, 22, 30);

const DURATION_OPTIONS = [
  { value: 1, label: "1 giờ" },
  { value: 1.5, label: "1.5 giờ" },
  { value: 2, label: "2 giờ" },
  { value: 2.5, label: "2.5 giờ" },
  { value: 3, label: "3 giờ" },
  { value: 3.5, label: "3.5 giờ" },
  { value: 4, label: "4 giờ" },
];

// Utility functions
const getAvailableStartTimes = (selectedDate: Date): string[] => {
  let baseTimes = ALL_START_TIMES;

  // 30 Tết 16/2: chỉ cho đặt đến 8h tối (giờ bắt đầu tối đa 20:00), 9h quán đóng
  if (isEveTet2026(selectedDate)) {
    baseTimes = baseTimes.filter((time) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute <= 20 * 60; // 20:00 = 8h tối, 20:00 + 1h = 21:00 (9h đóng)
    });
  } else if (!isExtendedHoursDate(selectedDate)) {
    // Trước 18/2: giới hạn kết thúc 22:00 (giờ bắt đầu tối đa 21:00)
    baseTimes = baseTimes.filter((time) => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute <= 21 * 60;
    });
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const selectedDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
  );

  if (selectedDay.getTime() !== today.getTime()) {
    return baseTimes;
  }

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const minTimeInMinutes = currentTimeInMinutes + 30;

  return baseTimes.filter((time) => {
    const [hour, minute] = time.split(":").map(Number);
    const timeInMinutes = hour * 60 + minute;
    return timeInMinutes >= minTimeInMinutes;
  });
};

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

// Kiểm tra điều kiện đặt trước ít nhất 1 giờ để áp dụng ưu đãi
const isEligibleForEarlyBooking = (
  selectedDate: Date | null,
  selectedStartTime: string,
): boolean => {
  if (!selectedDate || !selectedStartTime) return false;

  const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
  const bookingDateTime = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    startHour,
    startMinute,
    0,
    0,
  );

  const now = new Date();
  const diffMs = bookingDateTime.getTime() - now.getTime();

  return diffMs >= 60 * 60 * 1000; // Ít nhất 1 giờ trước giờ bắt đầu
};

const createISOString = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes, 0, 0);

  const offset = 7 * 60; // +07:00 in minutes
  const utc = new Date(
    dateTime.getTime() - dateTime.getTimezoneOffset() * 60000,
  );
  const localTime = new Date(utc.getTime() + offset * 60000);

  return localTime.toISOString().replace("Z", "+07:00");
};

// Price calculation function
type EstimatedPrice = {
  basePrice: number;
  discountRate: number;
  finalPrice: number;
};

const calculateEstimatedPrice = (
  selectedDate: Date | null,
  selectedStartTime: string,
  selectedDuration: number,
  roomType: RoomType,
  prices: Price[],
  holidays: HolidayItem[] = [],
): EstimatedPrice => {
  if (
    !selectedStartTime ||
    !selectedDuration ||
    !selectedDate ||
    prices.length === 0
  ) {
    return { basePrice: 0, discountRate: 0, finalPrice: 0 };
  }

  // Xác định loại ngày: weekend (T7/CN) hoặc holiday → dùng giá weekend
  const dayOfWeek = selectedDate.getDay();
  const isHoliday = holidays.some((h) =>
    sameDay(selectedDate, new Date(h.date)),
  );
  let dayType: "weekday" | "weekend" | "holiday" = "weekday";

  if (dayOfWeek === 0 || dayOfWeek === 6 || isHoliday) {
    dayType = "weekend";
  }

  // Chuyển đổi room type từ format mới sang cũ
  const roomTypeMapping: Record<RoomType, string> = {
    Small: "small",
    Medium: "medium",
    Large: "large",
  };
  const roomTypeStr = roomTypeMapping[roomType];

  // Tìm price rule phù hợp
  const priceRule = prices.find((p) => p.day_type === dayType);
  if (!priceRule) return { basePrice: 0, discountRate: 0, finalPrice: 0 };

  // Tính tổng giá cho thời lượng đã chọn
  let totalPrice = 0;
  let currentTime = selectedStartTime;
  let remainingDuration = selectedDuration;

  while (remainingDuration > 0) {
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
        const [currentHour, currentMinute] = currentTime.split(":").map(Number);

        const startMinutes = startHour * 60 + startMinute;
        const currentMinutes = currentHour * 60 + currentMinute;

        return startMinutes > currentMinutes;
      });
    }

    if (!timeSlot) {
      break;
    }

    // Tìm giá cho loại box
    const roomPrice = timeSlot.prices.find((p) => p.room_type === roomTypeStr);
    if (!roomPrice) {
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
  const basePrice = Math.floor(totalPrice / 1000) * 1000;

  // Ưu đãi đặt trước: T2-T6 giảm 10%, T7-CN giảm 5%
  let discountRate = 0;
  const eligibleForDiscount = isEligibleForEarlyBooking(
    selectedDate,
    selectedStartTime,
  );
  if (eligibleForDiscount) {
    if (dayType === "weekday") {
      discountRate = 0.1;
    } else if (dayType === "weekend") {
      discountRate = 0.05;
    }
  }

  const finalPrice =
    Math.floor((totalPrice * (1 - discountRate)) / 1000) * 1000;

  return {
    basePrice,
    discountRate,
    finalPrice,
  };
};

interface BookingFormProps {
  roomType: RoomType;
  prices: Price[];
}

export default function BookingForm({ roomType, prices }: BookingFormProps) {
  const router = useRouter();
  const { downloadTicket } = useTicketActions();

  // State management
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Modal states
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

  // Cancel booking states
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [holidays, setHolidays] = useState<HolidayItem[]>([]);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      roomType: roomType,
      startTime: "",
      endTime: "",
      note: "",
    },
  });

  // Memoized calculations
  const availableTimes = useMemo(() => {
    return selectedDate ? getAvailableStartTimes(selectedDate) : [];
  }, [selectedDate]);

  // 30 Tết 16/2: thời lượng tối đa = phải kết thúc trước 21h (9h đóng)
  const durationOptions = useMemo(() => {
    if (!selectedDate || !isEveTet2026(selectedDate) || !selectedStartTime)
      return DURATION_OPTIONS;
    const [h, m] = selectedStartTime.split(":").map(Number);
    const startMinutes = h * 60 + m;
    const maxDurationHours = (EVE_TET_CLOSE_MINUTES - startMinutes) / 60;
    return DURATION_OPTIONS.filter((o) => o.value <= maxDurationHours);
  }, [selectedDate, selectedStartTime]);

  const endTime = useMemo(() => {
    return calculateEndTime(selectedStartTime, selectedDuration);
  }, [selectedStartTime, selectedDuration]);

  const { basePrice, discountRate, finalPrice } = useMemo(() => {
    return calculateEstimatedPrice(
      selectedDate,
      selectedStartTime,
      selectedDuration,
      roomType,
      prices,
      holidays,
    );
  }, [
    selectedDate,
    selectedStartTime,
    selectedDuration,
    roomType,
    prices,
    holidays,
  ]);

  const selectedHoliday = useMemo(() => {
    if (!selectedDate || holidays.length === 0) return null;
    return (
      holidays.find((h) => sameDay(selectedDate, new Date(h.date))) ?? null
    );
  }, [selectedDate, holidays]);

  // Effects
  useEffect(() => {
    setIsClient(true);
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((json: { success?: boolean; data?: HolidayItem[] }) => {
        if (json.success && Array.isArray(json.data)) setHolidays(json.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setValue("roomType", roomType);
  }, [roomType, setValue]);

  useEffect(() => {
    if (selectedDate && isClient) {
      if (selectedStartTime && !availableTimes.includes(selectedStartTime)) {
        setSelectedStartTime("");
        setValue("startTime", "");
      }
      // 30 Tết 16/2: nếu thời lượng đã chọn vượt quá giờ đóng 21h thì reset xuống tối đa cho phép
      if (
        selectedDate &&
        isEveTet2026(selectedDate) &&
        selectedStartTime &&
        durationOptions.length > 0
      ) {
        const allowed = durationOptions.some((o) => o.value === selectedDuration);
        if (!allowed) {
          const maxOption = durationOptions[durationOptions.length - 1];
          setSelectedDuration(maxOption?.value ?? 1);
        }
      }
    }
  }, [selectedDate, selectedStartTime, setValue, isClient, availableTimes, selectedDuration, durationOptions]);

  useEffect(() => {
    if (selectedStartTime && selectedDuration && isClient) {
      setValue("endTime", endTime);
    }
  }, [selectedStartTime, selectedDuration, setValue, isClient, endTime]);

  // Handler functions với useCallback để tối ưu performance
  const onSubmit = useCallback(
    async (data: BookingFormData) => {
      if (!selectedStartTime || !selectedDuration || !selectedDate) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn thời gian hợp lệ",
          variant: "destructive",
        });
        return;
      }
      if (isTetDay1Off(selectedDate)) {
        toast({
          title: "Jozo nghỉ ngày mùng 1 Tết",
          description: "Hẹn khách iu vào ngày mùng 2.",
          variant: "destructive",
        });
        return;
      }
      if (isEveTet2026(selectedDate)) {
        const [endH, endM] = endTime.split(":").map(Number);
        if (endH * 60 + endM > EVE_TET_CLOSE_MINUTES) {
          toast({
            title: "Ngày 30 Tết",
            description: "9h (21h) quán đóng. Giờ kết thúc tối đa 21h.",
            variant: "destructive",
          });
          return;
        }
      }

      setIsSubmitting(true);

      try {
        // Tạo startTime và endTime với format ISO string +07:00
        const startTimeISO = createISOString(selectedDate, selectedStartTime);
        const endTimeISO = createISOString(selectedDate, endTime);

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

        // Gọi API mới
        const apiUrl = createApiEndpoint("/bookings/online");

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        const result = await response.json();

        console.log("result", result);

        if (result.success) {
          // Hiển thị modal xác nhận
          const bookingId = result.booking?._id || "";
          const bookingCodeFromApi =
            result.booking?.bookingCode || bookingId.slice(0, 6).toUpperCase();
          setBookingId(bookingId);
          setBookingCode(bookingCodeFromApi);
          setBookingDetails({
            name: data.customerName,
            phone: data.customerPhone,
            date: selectedDate
              ? format(selectedDate, "dd/MM/yyyy", { locale: vi })
              : "Đang tải...",
            time: `${selectedStartTime} - ${endTime}`,
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
            description:
              result.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
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
    },
    [selectedStartTime, selectedDuration, selectedDate, endTime],
  );

  const copyBookingCode = useCallback(() => {
    navigator.clipboard.writeText(bookingCode);
    toast({
      title: "Đã sao chép",
      description: "Mã đặt box đã được sao chép vào clipboard",
    });
  }, [bookingCode]);

  const handleDownloadTicket = useCallback(async () => {
    if (!bookingDetails || !bookingCode) return;

    const result = await downloadTicket({
      ...bookingDetails,
      bookingCode,
    });

    if (result.success) {
      toast({
        title: result.needsManualSave ? "Đã mở vé!" : "Tải xuống thành công!",
        description: result.message || "Vé đặt box đã được tải xuống.",
      });
    } else {
      toast({
        title: "Lỗi tải xuống",
        description:
          result.message || "Có lỗi xảy ra khi tải xuống vé. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  }, [bookingDetails, bookingCode, downloadTicket]);

  const handleCancelBooking = useCallback(async () => {
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
  }, [bookingId, bookingDetails, router]);

  // Helper functions
  const getSelectedHours = useCallback((): string => {
    if (selectedDuration % 1 === 0) {
      return `${selectedDuration} giờ`;
    } else {
      const hours = Math.floor(selectedDuration);
      return hours > 0 ? `${hours},5 giờ` : "0,5 giờ";
    }
  }, [selectedDuration]);

  return (
    <div className="bg-white p-3 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Quay về</span>
        </button>

        <h1 className="md:text-3xl text-xl font-bold text-lightpink text-center">
          {ROOM_TYPE_LABELS[roomType]}
        </h1>

        <div className="hidden md:block" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Customer Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-lightpink mb-4">
            Thông tin khách hàng
          </h2>

          <div className="space-y-4">
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
        </div>

        {/* Booking Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-lightpink mb-4">
            Thông tin đặt box
          </h2>

          <div className="space-y-4">
            {/* Date Selection */}
            <div>
              <div className="relative">
                {isClient && selectedDate ? (
                  <>
                    <DateSelect
                      value={selectedDate}
                      onChange={setSelectedDate}
                      label="Ngày đặt"
                      required
                    />
                    {selectedHoliday && (
                      <p className="mt-1.5 text-sm font-medium text-lightpink">
                        Ngày lễ: {selectedHoliday.name}
                      </p>
                    )}
                    {isTetDay1Off(selectedDate) && (
                      <p className="mt-1.5 text-sm font-medium text-lightpink bg-pink-50 border border-lightpink/30 rounded px-3 py-2">
                        Jozo nghỉ ngày mùng 1, hẹn khách iu vào ngày mùng 2.
                      </p>
                    )}
                    {isEveTet2026(selectedDate) && (
                      <p className="mt-1.5 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-300 rounded px-3 py-2">
                        Ngày 30 Tết: 21h (9h tối) Jozo nghỉ để dọn dẹp đón giao thừa. Giờ kết thúc tối đa 21h (nếu đặt 8h thì 9h phải đóng).
                      </p>
                    )}
                  </>
                ) : (
                  <div className="w-full border rounded px-3 py-2 text-gray-400 bg-gray-100">
                    Đang tải...
                  </div>
                )}
              </div>
            </div>

            {/* Start Time Selection */}
            <div>
              <label className="block text-lightpink mb-1">
                Giờ bắt đầu
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedStartTime}
                  onChange={(e) => {
                    setSelectedStartTime(e.target.value);
                    setValue("startTime", e.target.value);
                  }}
                  className="w-full border rounded px-3 py-2 text-black outline-none focus:ring-2 focus:ring-lightpink focus:border-lightpink"
                  disabled={!isClient || !selectedDate}
                >
                  <option value="">Chọn giờ bắt đầu</option>
                  {isClient &&
                    selectedDate &&
                    availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                </select>
              </div>
              {isClient && selectedDate && availableTimes.length === 0 && (
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

            {/* Duration Selection */}
            {selectedStartTime && (
              <div>
                <label className="block text-lightpink mb-1">
                  Thời lượng
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedDuration}
                    onChange={(e) => {
                      const duration = parseFloat(e.target.value);
                      setSelectedDuration(duration);
                    }}
                    className="w-full border rounded px-3 py-2 text-black outline-none focus:ring-2 focus:ring-lightpink focus:border-lightpink"
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Bạn có thể chọn số giờ sử dụng phù hợp với nhu cầu của mình
                </p>
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary - ẩn khi chọn ngày mùng 1 Tết */}
        {isClient &&
          selectedStartTime &&
          selectedDuration &&
          selectedDate &&
          !isTetDay1Off(selectedDate) && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold text-lightpink mb-2">
              Thông tin đặt box
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-lightpink">Loại box:</span>
                <span className="font-medium text-lightpink">
                  {ROOM_TYPE_LABELS[roomType]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lightpink">Ngày:</span>
                <span className="font-medium text-lightpink">
                  {selectedDate
                    ? format(selectedDate, "dd/MM/yyyy", { locale: vi })
                    : "Đang tải..."}
                  {selectedHoliday && (
                    <span className="ml-1 text-lightpink/90 font-normal">
                      ({selectedHoliday.name})
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lightpink">Thời gian:</span>
                <span className="font-medium text-lightpink">
                  {selectedStartTime} - {endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lightpink">Số giờ:</span>
                <span className="font-medium text-lightpink">
                  {getSelectedHours()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lightpink">Giá dự kiến (đã giảm):</span>
                <span className="font-bold text-green-600 text-lg">
                  {!isClient || prices.length === 0
                    ? "Đang tải..."
                    : `${finalPrice.toLocaleString("vi-VN")}đ`}
                </span>
              </div>
              {discountRate > 0 && (
                <>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Giá gốc:</span>
                    <span className="line-through">
                      {basePrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ưu đãi áp dụng:</span>
                    <span className="font-semibold text-lightpink">
                      {discountRate === 0.1
                        ? "Giảm 10% (Thứ 2 - Thứ 6)"
                        : "Giảm 5% (Thứ 7 - Chủ Nhật/Lễ)"}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-sm border-t pt-3 text-gray-600">
              {isEveTet2026(selectedDate) && (
                <p className="mb-2 text-amber-700 font-medium">
                  21h (9h tối) Jozo nghỉ để dọn dẹp đón giao thừa. Giờ kết thúc tối đa 21h.
                </p>
              )}
              <p className="mb-1">
                <span className="font-medium">Lưu ý về thanh toán:</span> Quý
                khách sẽ thanh toán sau khi sử dụng dịch vụ. Jozo không nhận
                cọc/thanh toán trước.
              </p>

              <p className="text-red-500">
                Nếu đến trễ quá 15 phút so với giờ đặt, box sẽ được hủy và có
                thể được sắp xếp cho khách khác.
              </p>
            </div>
          </div>
        )}

        {isTetDay1Off(selectedDate) ? (
          <div className="w-full py-3 mt-6 text-center font-medium text-lightpink bg-pink-50 border border-lightpink/30 rounded-lg">
            Jozo nghỉ ngày mùng 1, hẹn khách iu vào ngày mùng 2.
          </div>
        ) : (
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !isClient ||
              !selectedDate ||
              !selectedStartTime ||
              !selectedDuration ||
              (isClient && selectedDate && availableTimes.length === 0)
            }
            className="w-full py-3 mt-6 font-medium tracking-wide text-white bg-lightpink rounded-lg hover:bg-pink-600 transition duration-2000 animate-buttonheartbeat disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang xử lý..." : "Đặt ngay"}
          </button>
        )}
      </form>

      {/* Confirmation Modal */}
      <BookingSuccessModal
        isOpen={showConfirmModal}
        bookingDetails={bookingDetails!}
        bookingId={bookingId}
        bookingCode={bookingCode}
        onCopyCode={copyBookingCode}
        onDownloadTicket={handleDownloadTicket}
      />

      {/* Cancel Confirmation Modal */}
      <CancelBookingModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelBooking}
        isCancelling={isCancelling}
        bookingDetails={bookingDetails}
        bookingCode={bookingCode}
      />
    </div>
  );
}
