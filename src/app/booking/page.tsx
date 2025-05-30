"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/input";
import { Mail, Phone, User, Clock, Check, Copy } from "lucide-react";
import { bookingSchema, BookingFormData } from "@/schemas/booking.schema";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DateSelect } from "@/components/ui/date-select";

export const dynamic = "force-dynamic";

type TimeSlot = string;
type RoomType = "small" | "medium" | "large";

interface AvailableSlotsResponse {
  success: boolean;
  data?: {
    available_slots: TimeSlot[];
    booked_slots: TimeSlot[];
    date: string;
    room_type: string;
    available_rooms: Record<RoomType, number>;
  };
  message?: string;
}

interface PriceData {
  _id: string;
  day_type: "weekday" | "weekend" | "holiday";
  time_slots: {
    start: string;
    end: string;
    prices: {
      room_type: RoomType;
      price: number;
    }[];
  }[];
  effective_date: string;
  end_date: string | null;
  note: string;
}

// Định nghĩa các giờ có thể bắt đầu
const START_TIMES = [
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

// Mapping for room types
const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  small: "Phòng S-Box (1-3 người)",
  medium: "Phòng M-Box (4-5 người)",
  large: "Phòng L-Box (6-8 người)",
};

// Cấu trúc khung giờ thực tế
const TIME_FRAMES = [
  { start: "10:00", end: "18:00", label: "Khung giờ ban ngày" },
  { start: "18:00", end: "23:00", label: "Khung giờ buổi tối" },
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
    if (roomTypeParam && ["small", "medium", "large"].includes(roomTypeParam)) {
      onRoomTypeChange(roomTypeParam);
    }
  }, [roomTypeParam, onRoomTypeChange]);

  return null;
}

export default function BookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>("small");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [availableStartTimes, setAvailableStartTimes] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [isRoomAvailable, setIsRoomAvailable] = useState(true);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState<{
    name: string;
    phone: string;
    date: string;
    time: string;
    roomType: string;
    price: number;
  } | null>(null);

  const handleRoomTypeChange = useCallback((roomType: RoomType) => {
    setSelectedRoomType(roomType);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  // Chuyển đổi giờ bắt đầu và thời lượng thành danh sách các time slots
  const calculateSelectedTimeSlots = (): TimeSlot[] => {
    if (!selectedStartTime || !selectedDuration) return [];

    const result: TimeSlot[] = [];

    // Tách giờ và phút từ giờ bắt đầu
    const [startHour, startMinute] = selectedStartTime.split(":").map(Number);

    // Tính tổng phút
    let totalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = totalMinutes + selectedDuration * 60;

    // Tạo các time slots theo khoảng 1 giờ
    while (totalMinutes < endTotalMinutes) {
      const currentHour = Math.floor(totalMinutes / 60);
      const currentMinute = totalMinutes % 60;

      // Lấy giờ tiếp theo (luôn tính slot theo giờ tròn)
      let nextTotalMinutes;
      if (currentMinute === 0) {
        // Nếu là giờ tròn, slot tiếp theo là 1 giờ sau
        nextTotalMinutes = totalMinutes + 60;
      } else if (currentMinute === 30) {
        // Nếu là giờ rưỡi, slot tiếp theo là giờ tròn tiếp
        nextTotalMinutes = (currentHour + 1) * 60;
      } else {
        // Trường hợp khác, làm tròn lên giờ
        nextTotalMinutes = (currentHour + 1) * 60;
      }

      const nextHour = Math.floor(nextTotalMinutes / 60);
      const nextMinute = nextTotalMinutes % 60;

      // Chỉ thêm các slots từ 10h đến 23h
      if (currentHour >= 10 && nextHour <= 23) {
        const fromTime = `${currentHour
          .toString()
          .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
        const toTime = `${nextHour.toString().padStart(2, "0")}:${nextMinute
          .toString()
          .padStart(2, "0")}`;

        result.push(`${fromTime}-${toTime}`);
      }

      totalMinutes = nextTotalMinutes;
    }

    return result;
  };

  // Mảng các time slots đã chọn
  const selectedTimeSlots = calculateSelectedTimeSlots();

  // Kiểm tra xem thời gian đã chọn có khả dụng không
  const isSelectedTimeAvailable = (): boolean => {
    if (selectedTimeSlots.length === 0) return false;

    // Tính toán thời điểm bắt đầu và kết thúc chính xác
    const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = totalStartMinutes + selectedDuration * 60;
    const endHour = Math.floor(totalEndMinutes / 60);
    const endMinute = totalEndMinutes % 60;

    // Kiểm tra xem thời gian kết thúc có vượt quá 23:00 không
    if (endHour > 23 || (endHour === 23 && endMinute > 0)) {
      return false;
    }

    // Tạo danh sách các khung giờ cần kiểm tra
    const requiredSlots: string[] = [];

    // Thêm các khung giờ cần thiết
    for (let currentHour = startHour; currentHour < endHour; currentHour++) {
      // Thêm khung giờ hiện tại
      const currentSlot = `${currentHour.toString().padStart(2, "0")}:00-${(
        currentHour + 1
      )
        .toString()
        .padStart(2, "0")}:00`;
      requiredSlots.push(currentSlot);

      // Nếu là giờ cuối và có phút kết thúc > 0, thêm khung giờ tiếp theo
      if (currentHour === endHour - 1 && endMinute > 0) {
        const nextSlot = `${(currentHour + 1)
          .toString()
          .padStart(2, "0")}:00-${(currentHour + 2)
          .toString()
          .padStart(2, "0")}:00`;
        requiredSlots.push(nextSlot);
      }
    }

    // Kiểm tra xem tất cả các khung giờ cần thiết có khả dụng không
    const allSlotsAvailable = requiredSlots.every((slot) =>
      availableSlots.includes(slot)
    );
    if (!allSlotsAvailable) {
      return false;
    }

    // Kiểm tra thêm các trường hợp đặc biệt
    if (selectedStartTime.endsWith(":30")) {
      // Đối với giờ bắt đầu là :30, cần đảm bảo không có booking nào bắt đầu trong khoảng thời gian này
      const startSlot = `${startHour.toString().padStart(2, "0")}:00-${(
        startHour + 1
      )
        .toString()
        .padStart(2, "0")}:00`;
      const nextSlot = `${(startHour + 1).toString().padStart(2, "0")}:00-${(
        startHour + 2
      )
        .toString()
        .padStart(2, "0")}:00`;

      // Kiểm tra cả hai khung giờ liền kề
      if (
        !availableSlots.includes(startSlot) ||
        !availableSlots.includes(nextSlot)
      ) {
        return false;
      }
    }

    // Kiểm tra xem có booking nào kết thúc trong khoảng thời gian này không
    if (endMinute > 0) {
      const endSlot = `${endHour.toString().padStart(2, "0")}:00-${(endHour + 1)
        .toString()
        .padStart(2, "0")}:00`;
      if (!availableSlots.includes(endSlot)) {
        return false;
      }
    }

    return true;
  };

  // Tính toán các giờ bắt đầu khả dụng dựa trên slots trống
  const calculateAvailableStartTimes = useCallback(
    (availableSlots: TimeSlot[]) => {
      const availableTimes: string[] = [];

      // Bổ sung giờ bắt đầu từ mỗi slot chuẩn 1 giờ (ví dụ: 10:00-11:00 -> 10:00)
      availableSlots.forEach((slot) => {
        const startTime = slot.split("-")[0];
        // Chỉ thêm vào các giờ từ 10h sáng trở đi
        if (!availableTimes.includes(startTime) && startTime >= "10:00") {
          availableTimes.push(startTime);
        }
      });

      // Thêm các giờ bắt đầu từ 30 phút (ví dụ: 10:30) nếu có cả slot hiện tại và slot tiếp theo khả dụng
      START_TIMES.filter((time) => time.endsWith(":30")).forEach(
        (halfHourTime) => {
          // Chỉ xử lý các giờ từ 10:30 trở đi
          if (halfHourTime < "10:00") return;

          const hour = parseInt(halfHourTime.split(":")[0]);

          // Cần kiểm tra slot chứa giờ bắt đầu
          const currentSlot = `${hour.toString().padStart(2, "0")}:00-${(
            hour + 1
          )
            .toString()
            .padStart(2, "0")}:00`;

          // Và slot tiếp theo
          const nextSlot = `${(hour + 1).toString().padStart(2, "0")}:00-${(
            hour + 2
          )
            .toString()
            .padStart(2, "0")}:00`;

          // Kiểm tra cả hai slot đều phải có sẵn trong danh sách khả dụng
          if (
            availableSlots.includes(currentSlot) &&
            availableSlots.includes(nextSlot)
          ) {
            availableTimes.push(halfHourTime);
          }
        }
      );

      // Sắp xếp theo thứ tự thời gian và loại bỏ tất cả giờ trước 10h sáng
      availableTimes.sort();
      const filteredByMinTime = availableTimes.filter(
        (time) => time >= "10:00"
      );

      // Nếu là ngày hiện tại, lọc bỏ các giờ đã qua
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const selectedDateNoTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );

      // Chỉ lọc giờ nếu ngày được chọn là hôm nay
      if (selectedDateNoTime.getTime() === today.getTime()) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Lọc bỏ các giờ đã qua
        const filteredTimes = filteredByMinTime.filter((time) => {
          const [hour, minute] = time.split(":").map(Number);

          // Nếu giờ trong quá khứ, loại bỏ
          if (hour < currentHour) return false;

          // Nếu cùng giờ nhưng phút đã qua, loại bỏ
          if (hour === currentHour && minute <= currentMinute) return false;

          // Thêm buffer 30 phút để người dùng có thời gian đến
          if (hour === currentHour && minute < currentMinute + 30) return false;

          return true;
        });

        setAvailableStartTimes(filteredTimes);
      } else {
        setAvailableStartTimes(filteredByMinTime);
      }
    },
    [selectedDate]
  );

  // Fetch available time slots when date or room type changes
  useEffect(() => {
    async function fetchAvailableSlots() {
      if (!selectedDate || !selectedRoomType) return;

      setIsLoadingSlots(true);
      try {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const response = await fetch(
          `/api/bookings/available-slots?date=${formattedDate}&room_type=${selectedRoomType}`
        );

        const data: AvailableSlotsResponse = await response.json();

        if (!data.success) {
          setIsRoomAvailable(false);
          toast({
            title: "Thông báo",
            description: data.message || "Phòng đang được bảo trì",
            variant: "destructive",
            duration: 5000, // Hiển thị trong 5 giây
          });
          setAvailableSlots([]);
          setAvailableStartTimes([]);
          setSelectedStartTime("");
          setSelectedDuration(1);
          return;
        }

        if (!data.data || data.data.available_slots.length === 0) {
          setIsRoomAvailable(false);
          toast({
            title: "Thông báo",
            description: "Phòng đang được bảo trì",
            variant: "destructive",
            duration: 5000, // Hiển thị trong 5 giây
          });
          setAvailableSlots([]);
          setAvailableStartTimes([]);
          setSelectedStartTime("");
          setSelectedDuration(1);
          return;
        }

        setIsRoomAvailable(true);
        // Sắp xếp các slot theo thứ tự thời gian
        const sortedSlots = [...data.data.available_slots].sort((a, b) => {
          const startTimeA = parseInt(a.split("-")[0].split(":")[0]);
          const startTimeB = parseInt(b.split("-")[0].split(":")[0]);
          return startTimeA - startTimeB;
        });

        setAvailableSlots(sortedSlots);

        // Tính toán các giờ bắt đầu khả dụng
        calculateAvailableStartTimes(sortedSlots);

        // Reset selections
        setSelectedStartTime("");
        setSelectedDuration(1);
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setIsRoomAvailable(false);
        toast({
          title: "Lỗi",
          description: "Không thể kết nối đến máy chủ",
          variant: "destructive",
          duration: 5000, // Hiển thị trong 5 giây
        });
      } finally {
        setIsLoadingSlots(false);
      }
    }

    fetchAvailableSlots();
  }, [selectedDate, selectedRoomType, calculateAvailableStartTimes]);

  // Theo dõi thay đổi giờ bắt đầu để cập nhật giới hạn thời lượng
  useEffect(() => {
    if (selectedStartTime && availableSlots.length > 0) {
      // Reset thời lượng khi đổi giờ bắt đầu
      setSelectedDuration(1);
    }
  }, [selectedStartTime, availableSlots]);

  // Tính ra thời lượng tối đa có thể đặt
  const getMaxDuration = (): number => {
    if (!selectedStartTime || availableSlots.length === 0) return 1;

    // Tách giờ và phút từ thời gian bắt đầu
    const [startHour] = selectedStartTime.split(":").map(Number);
    let currentHour = startHour;
    let maxDuration = 0;

    // Tìm số lượng slots liên tiếp khả dụng từ giờ bắt đầu
    while (true) {
      // Kiểm tra nếu thời gian vượt quá 23:00
      if (currentHour >= 23) break;

      // Slot 1 giờ hiện tại cần kiểm tra (luôn kiểm tra theo giờ tròn)
      const currentSlot = `${currentHour.toString().padStart(2, "0")}:00-${(
        currentHour + 1
      )
        .toString()
        .padStart(2, "0")}:00`;

      // Kiểm tra nếu slot không khả dụng
      if (!availableSlots.includes(currentSlot)) break;

      // Tăng thời lượng lên 1 giờ
      maxDuration += 1;

      // Nếu đã đạt 4 giờ, không cần kiểm tra thêm
      if (maxDuration >= 4) {
        maxDuration = 4;
        break;
      }

      // Tiếp tục với slot tiếp theo
      currentHour += 1;
    }

    return Math.max(1, maxDuration);
  };

  // Giới hạn thời lượng tối đa có thể đặt
  const maxDuration = getMaxDuration();

  // Lọc các tùy chọn thời lượng theo giới hạn
  const availableDurations = DURATION_OPTIONS.filter(
    (option) => option.value <= maxDuration
  );

  // Fetch price data when component mounts
  useEffect(() => {
    async function fetchPriceData() {
      try {
        const response = await fetch("/api/price");
        const result = await response.json();

        if (result.success && result.data) {
          setPriceData(result.data);
        } else {
          console.error("Failed to fetch price data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching price data:", error);
      }
    }

    fetchPriceData();
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    // Validate if time slots are selected
    if (selectedTimeSlots.length === 0 || !isSelectedTimeAvailable()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn thời gian hợp lệ",
        variant: "destructive",
      });
      return;
    }

    try {
      // Prepare booking data
      const bookingData = {
        ...data,
        room_type: selectedRoomType,
        booking_date: format(selectedDate, "yyyy-MM-dd"),
        time_slots: selectedTimeSlots,
        start_time: selectedStartTime,
        duration: selectedDuration,
        total_price: calculateTotalPrice(selectedRoomType, selectedTimeSlots),
      };

      // Call API to create booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        // Hiển thị modal xác nhận thay vì toast và redirect
        setBookingCode(result.data._id.slice(-6).toUpperCase());
        setBookingDetails({
          name: data.name,
          phone: data.phone,
          date: format(selectedDate, "dd/MM/yyyy", { locale: vi }),
          time: formatTimeDisplay(selectedTimeSlots),
          roomType: ROOM_TYPE_LABELS[selectedRoomType],
          price: calculateTotalPrice(selectedRoomType, selectedTimeSlots),
        });
        setShowConfirmModal(true);
      } else {
        // Show error message
        toast({
          title: "Đặt phòng thất bại!",
          description: result.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Đặt phòng thất bại!",
        description: "Có lỗi xảy ra, vui lòng thử lại sau.",
        variant: "destructive",
      });
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

  // Kiểm tra một thời điểm thuộc khung giờ nào
  const getTimeFrame = (
    time: string
  ): { start: string; end: string; label: string } | null => {
    // Chuyển đổi thời gian sang phút để dễ so sánh
    const [hour, minute] = time.split(":").map(Number);
    const totalMinutes = hour * 60 + minute;

    for (const frame of TIME_FRAMES) {
      const [frameStartHour, frameStartMinute] = frame.start
        .split(":")
        .map(Number);
      const [frameEndHour, frameEndMinute] = frame.end.split(":").map(Number);

      const frameStartMinutes = frameStartHour * 60 + frameStartMinute;
      const frameEndMinutes = frameEndHour * 60 + frameEndMinute;

      if (totalMinutes >= frameStartMinutes && totalMinutes < frameEndMinutes) {
        return frame;
      }
    }

    return null;
  };

  // Improved price calculation based on time slots and pricing data from API
  const calculateTotalPrice = (roomType: RoomType, timeSlots: TimeSlot[]) => {
    if (!timeSlots.length) return 0;

    // Nếu không có dữ liệu giá từ API, trả về 0
    if (!priceData.length) {
      return 0;
    }

    let totalPrice = 0;

    // Xác định loại ngày (ngày thường, cuối tuần, ngày lễ)
    const day = selectedDate.getDay();
    const isWeekend = day === 0 || day === 6; // 0 = Chủ nhật, 6 = Thứ bảy
    const dayType = isWeekend ? "weekend" : "weekday";

    // Tìm dữ liệu giá phù hợp
    const currentPriceData =
      priceData.find((p) => p.day_type === dayType) ||
      priceData.find((p) => p.day_type === "weekday") ||
      priceData[0];

    if (!currentPriceData) return 0;

    // Tìm thời gian bắt đầu và kết thúc
    if (!selectedStartTime) return 0;

    // Tính thời điểm kết thúc
    const [startHour, startMinute] = selectedStartTime.split(":").map(Number);
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = totalStartMinutes + selectedDuration * 60;
    const endHour = Math.floor(totalEndMinutes / 60);
    const endMinute = totalEndMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    // Xác định thuộc khung giờ nào
    const startFrame = getTimeFrame(selectedStartTime);
    const endFrame = getTimeFrame(endTime);

    if (!startFrame) return 0;

    // Tìm giá cho từng khung giờ
    const dayTimeSlot = currentPriceData.time_slots.find(
      (ts) => ts.start === "10:00" && ts.end === "18:00"
    );

    const nightTimeSlot = currentPriceData.time_slots.find(
      (ts) => ts.start === "18:00" && ts.end === "23:59"
    );

    console.log("currentPriceData", currentPriceData);

    // Debug thông tin khung giờ và giá
    console.log("Current price data:", currentPriceData);
    console.log("Day time slot:", dayTimeSlot);
    console.log("Night time slot:", nightTimeSlot);
    console.log("Selected start time:", selectedStartTime);
    console.log("Start frame:", startFrame);
    console.log("End frame:", endFrame);

    // Nếu không tìm thấy các khung giờ cụ thể, dùng khung giờ đầu tiên
    const defaultSlot = currentPriceData.time_slots[0];

    // Lấy giá theo phòng
    const getRoomPrice = (
      timeSlot:
        | {
            start: string;
            end: string;
            prices: {
              room_type: string;
              price: number;
            }[];
          }
        | undefined
    ) => {
      if (!timeSlot) return 0;
      const roomPrice = timeSlot.prices.find((p) => p.room_type === roomType);
      const price = roomPrice ? roomPrice.price : 0;
      console.log(
        `Price for ${roomType} in slot ${timeSlot.start}-${timeSlot.end}:`,
        price
      );
      return price;
    };

    // Tính giá
    if (startFrame === endFrame || !endFrame) {
      // Cùng một khung giờ
      if (startFrame.label === "Khung giờ ban ngày") {
        // Khung giờ ban ngày
        const dayPrice = getRoomPrice(dayTimeSlot || defaultSlot);
        totalPrice = dayPrice * selectedDuration;
        console.log(
          "Day time price calculation:",
          dayPrice,
          "*",
          selectedDuration,
          "=",
          totalPrice
        );
      } else {
        // Khung giờ buổi tối
        const nightPrice = getRoomPrice(nightTimeSlot || defaultSlot);
        totalPrice = nightPrice * selectedDuration;
        console.log(
          "Night time price calculation:",
          nightPrice,
          "*",
          selectedDuration,
          "=",
          totalPrice
        );
      }
    } else {
      // Đặt phòng qua hai khung giờ (ban ngày -> tối)
      const dayBoundaryMinutes = 18 * 60; // 18:00 tính theo phút
      const timeInFirstFrame = (dayBoundaryMinutes - totalStartMinutes) / 60; // Số giờ trong khung đầu
      const timeInSecondFrame = selectedDuration - timeInFirstFrame; // Số giờ trong khung sau

      console.log(
        "Split time calculation - First frame hours:",
        timeInFirstFrame
      );
      console.log(
        "Split time calculation - Second frame hours:",
        timeInSecondFrame
      );

      if (startFrame.label === "Khung giờ ban ngày") {
        // Từ ban ngày sang tối
        const dayPrice = getRoomPrice(dayTimeSlot || defaultSlot);
        const nightPrice = getRoomPrice(nightTimeSlot || defaultSlot);

        const dayPortion = dayPrice * timeInFirstFrame;
        const nightPortion = nightPrice * timeInSecondFrame;

        console.log(
          "Day portion:",
          dayPrice,
          "*",
          timeInFirstFrame,
          "=",
          dayPortion
        );
        console.log(
          "Night portion:",
          nightPrice,
          "*",
          timeInSecondFrame,
          "=",
          nightPortion
        );

        totalPrice = dayPortion + nightPortion;
        console.log("Total price (day to night):", totalPrice);
      } else {
        // Từ tối sang ban ngày (trường hợp hiếm gặp)
        const nightPrice = getRoomPrice(nightTimeSlot || defaultSlot);
        const dayPrice = getRoomPrice(dayTimeSlot || defaultSlot);

        const nightPortion = nightPrice * timeInFirstFrame;
        const dayPortion = dayPrice * timeInSecondFrame;

        console.log(
          "Night portion:",
          nightPrice,
          "*",
          timeInFirstFrame,
          "=",
          nightPortion
        );
        console.log(
          "Day portion:",
          dayPrice,
          "*",
          timeInSecondFrame,
          "=",
          dayPortion
        );

        totalPrice = nightPortion + dayPortion;
        console.log("Total price (night to day):", totalPrice);
      }
    }

    // Làm tròn giá tiền về đơn vị 1000đ
    const roundedPrice = Math.round(totalPrice / 1000) * 1000;
    console.log("Final rounded price:", roundedPrice);
    return roundedPrice;
  };

  // Format giờ hiển thị đẹp hơn
  const formatTimeDisplay = (timeSlots: TimeSlot[]): string => {
    if (timeSlots.length === 0) return "";

    // Sắp xếp slots theo thứ tự thời gian
    const sortedSlots = [...timeSlots].sort((a, b) => {
      const startTimeA = a.split("-")[0];
      const startTimeB = b.split("-")[0];
      return startTimeA.localeCompare(startTimeB);
    });

    // Lấy giờ bắt đầu từ slot đầu tiên
    const firstSlot = sortedSlots[0];

    // Giờ bắt đầu và kết thúc
    const startTime = firstSlot.split("-")[0];

    // Tính giờ kết thúc chính xác dựa trên thời lượng đã chọn
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = totalStartMinutes + selectedDuration * 60;

    const endHour = Math.floor(totalEndMinutes / 60);
    const endMinute = totalEndMinutes % 60;
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    return `${startTime} - ${endTime}`;
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

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Suspense fallback={<div>Loading...</div>}>
        <BookingWithSearchParams onRoomTypeChange={handleRoomTypeChange} />
      </Suspense>

      <h1 className="text-3xl font-bold text-lightpink mb-8 text-center text-white">
        Đặt Phòng {ROOM_TYPE_LABELS[selectedRoomType]}
      </h1>

      {!isRoomAvailable ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-lightpink mb-4">
            Phòng đang được bảo trì
          </h2>
          <p className="text-gray-600 mb-6">
            Rất tiếc, phòng này hiện đang trong quá trình bảo trì. Vui lòng thử
            lại sau hoặc chọn phòng khác.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-lightpink text-white rounded-lg hover:bg-pink-600 transition-colors animate-buttonheartbeat"
          >
            Về trang chủ
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Customer Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-lightpink mb-4">
                Thông tin khách hàng
              </h2>

              <Input
                label="Họ và tên"
                {...register("name")}
                placeholder="Nhập họ và tên của bạn"
                required
                error={errors.name?.message}
                prefix={<User className="h-4 w-4" />}
              />

              <Input
                label="Số điện thoại"
                {...register("phone")}
                placeholder="Nhập số điện thoại của bạn"
                type="number"
                maxLength={10}
                required
                error={errors.phone?.message}
                prefix={<Phone className="h-4 w-4" />}
              />

              <Input
                label="Email"
                {...register("email")}
                placeholder="Nhập email của bạn (không bắt buộc)"
                error={errors.email?.message}
                prefix={<Mail className="h-4 w-4" />}
                helpText="Chúng tôi sẽ gửi thông tin xác nhận đến email này"
              />

              {/* add note */}
              <Input
                label="Ghi chú"
                {...register("note")}
                placeholder="Nhập ghi chú của bạn"
                helpText="Ghi chú cho chúng tôi"
              />
            </div>

            {/* Booking Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-lightpink mb-4">
                Thông tin đặt phòng
              </h2>

              <div className="mb-4">
                <label className="block text-lightpink mb-1"></label>
                <div className="relative">
                  <DateSelect
                    value={selectedDate}
                    onChange={setSelectedDate}
                    label="Ngày đặt"
                    required
                  />
                </div>
              </div>

              {isLoadingSlots ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-lightpink border-t-transparent"></div>
                  <p className="mt-2 text-gray-600">
                    Đang kiểm tra khung giờ trống...
                  </p>
                </div>
              ) : (
                <>
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
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="w-full border rounded px-3 py-2 pl-10 text-black outline-none focus:ring-2 focus:ring-lightpink focus:border-lightpink"
                        disabled={availableStartTimes.length === 0}
                      >
                        <option value="">Chọn giờ bắt đầu</option>
                        {availableStartTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    {availableStartTimes.length === 0 && !isLoadingSlots && (
                      <p className="mt-1 text-sm text-red-500">
                        Không có khung giờ trống cho ngày đã chọn
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
                          onChange={(e) =>
                            setSelectedDuration(parseFloat(e.target.value))
                          }
                          className="w-full border rounded px-3 py-2 pl-10 text-black outline-none focus:ring-2 focus:ring-lightpink focus:border-lightpink"
                        >
                          {availableDurations.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Thời gian tối đa có thể đặt: {maxDuration} giờ
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Hiển thị giờ đã chọn */}
              {selectedTimeSlots.length > 0 && isSelectedTimeAvailable() && (
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <p className="text-green-600 font-medium">
                    Thời gian đã chọn:{" "}
                    <span className="font-bold">
                      {formatTimeDisplay(selectedTimeSlots)}
                    </span>
                  </p>
                  <p className="text-sm text-green-600">{getSelectedHours()}</p>
                </div>
              )}

              {selectedTimeSlots.length > 0 && !isSelectedTimeAvailable() && (
                <div className="mt-4 p-3 bg-red-50 rounded-md">
                  <p className="text-red-600">
                    Thời gian đã chọn không khả dụng. Vui lòng chọn thời gian
                    khác.
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            {selectedTimeSlots.length > 0 && isSelectedTimeAvailable() && (
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h2 className="text-lg font-semibold text-lightpink mb-2">
                  Tóm tắt đặt phòng
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
                    {formatTimeDisplay(selectedTimeSlots)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-lightpink">Số giờ:</span>
                  <span className="font-medium text-lightpink">
                    {getSelectedHours()}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span className="text-lightpink">Tổng tiền dự tính:</span>
                  <span className="text-lightpink">
                    {calculateTotalPrice(
                      selectedRoomType,
                      selectedTimeSlots
                    ).toLocaleString("vi-VN")}
                    đ
                  </span>
                </div>

                <div className="mt-4 text-sm border-t pt-3 text-gray-600">
                  <p className="mb-1">
                    <span className="font-medium">Lưu ý về thanh toán:</span>{" "}
                    Jozo áp dụng chính sách thanh toán trực tiếp tại Jozo sau
                    khi sử dụng dịch vụ. Chúng tôi không nhận đặt cọc hoặc
                    chuyển khoản trước để đảm bảo trải nghiệm thuận tiện nhất
                    cho quý khách.
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
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Thông báo",
                  description: "Tính năng đang trong quá trình phát triển",
                  variant: "destructive",
                  duration: 5000,
                });
              }}
              className="w-full py-3 mt-6 font-medium tracking-wide text-white bg-lightpink rounded-lg hover:bg-pink-600 transition duration-2000 animate-buttonheartbeat opacity-70 cursor-not-allowed"
            >
              Đặt phòng ngay
            </button>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && bookingDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
            <div className="bg-lightpink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Check className="text-white w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-center text-lightpink mb-4">
              Đặt phòng thành công!
            </h2>

            <div className="mb-6 border-2 border-dashed border-lightpink/40 rounded-lg p-4 bg-lightpink/5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Mã đặt phòng:</span>
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
                <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                  <span className="text-gray-600 font-medium">
                    Tổng tiền dự kiến:
                  </span>
                  <span className="font-bold text-lightpink">
                    {bookingDetails.price.toLocaleString("vi-VN")}đ
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
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
