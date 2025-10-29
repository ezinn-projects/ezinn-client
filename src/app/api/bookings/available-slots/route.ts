import { NextRequest, NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import { RoomScheduleStatus } from "@/types/room-schedule";
import { ObjectId } from "mongodb";

// Định nghĩa thêm danh sách time slots cố định theo giờ
const ALL_TIME_SLOTS = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
  "21:00-22:00",
];

// Danh sách các trạng thái khiến slot không khả dụng
const UNAVAILABLE_STATUSES = [
  RoomScheduleStatus.Booked,
  RoomScheduleStatus.InUse,
  RoomScheduleStatus.Locked,
];

// Tổng số phòng theo loại
const TOTAL_ROOMS = {
  small: 2,
  medium: 2,
  large: 1,
};

export async function GET(request: NextRequest) {
  try {
    // Lấy thông tin từ query parameters
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const roomType = searchParams.get("room_type");

    // Validate input
    if (!date || !roomType) {
      return NextResponse.json(
        {
          success: false,
          message: "Thiếu thông tin ngày hoặc loại phòng",
        },
        { status: 400 }
      );
    }

    // Format date to ISO date string (YYYY-MM-DD)
    const requestedDate = new Date(date);
    const formattedDate = requestedDate.toISOString().split("T")[0];

    // Check MongoDB connection
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "Không thể kết nối đến database" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jozo");

    // Bước 1: Lấy thông tin phòng dựa theo room_type
    const roomsCollection = db.collection("rooms");
    const rooms = await roomsCollection
      .find({
        $or: [{ type: roomType }, { roomType: roomType }],
      })
      .toArray();

    if (!rooms || rooms.length === 0) {
      return NextResponse.json(
        { success: false, message: "Phòng đang được bảo trì" },
        { status: 404 }
      );
    }

    // Lấy tất cả roomIds từ kết quả
    const roomIds = rooms.map((room) => new ObjectId(room._id));

    // Bước 2: Lấy tất cả lịch của các phòng này trong ngày đã chọn
    const schedulesCollection = db.collection("room_schedules");

    // Tính toán startOfDay và endOfDay
    const startOfDay = new Date(formattedDate);
    const endOfDay = new Date(formattedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Tìm tất cả lịch của các phòng này trong ngày đã chọn
    const schedules = await schedulesCollection
      .find({
        roomId: { $in: roomIds },
        $or: [
          // Lịch bắt đầu trong ngày này
          { startTime: { $gte: startOfDay, $lte: endOfDay } },
          // Lịch kết thúc trong ngày này
          { endTime: { $gte: startOfDay, $lte: endOfDay } },
          // Lịch bắt đầu trước ngày này và kết thúc sau ngày này (bao phủ cả ngày)
          { startTime: { $lt: startOfDay }, endTime: { $gt: endOfDay } },
        ],
        status: { $in: UNAVAILABLE_STATUSES },
      })
      .toArray();

    // Bước 3: Kiểm tra các khung giờ không khả dụng
    const bookedSlots = new Set<string>();
    const bookedRoomsBySlot: Record<string, Set<string>> = {};

    ALL_TIME_SLOTS.forEach((slot) => {
      bookedRoomsBySlot[slot] = new Set<string>();
    });

    schedules.forEach((schedule) => {
      const scheduleStart = new Date(schedule.startTime);
      const scheduleEnd = new Date(schedule.endTime);

      // Chỉ xử lý lịch trong ngày đã chọn
      if (scheduleStart <= endOfDay && scheduleEnd >= startOfDay) {
        // Điều chỉnh thời gian bắt đầu và kết thúc cho ngày hiện tại
        const effectiveStart =
          scheduleStart < startOfDay ? startOfDay : scheduleStart;
        const effectiveEnd = scheduleEnd > endOfDay ? endOfDay : scheduleEnd;

        // Chuyển đổi sang giờ để dễ so sánh
        const startHour = effectiveStart.getHours();
        const endHour = effectiveEnd.getHours();

        // Đánh dấu tất cả slots bị sử dụng
        for (let hour = startHour; hour < endHour; hour++) {
          if (hour >= 9 && hour < 22) {
            // Chỉ check trong khung giờ hoạt động
            const slot = `${hour.toString().padStart(2, "0")}:00-${(hour + 1)
              .toString()
              .padStart(2, "0")}:00`;

            // Thêm vào danh sách slot đã book
            bookedSlots.add(slot);

            // Thêm phòng vào danh sách phòng đã đặt cho slot này
            if (bookedRoomsBySlot[slot]) {
              bookedRoomsBySlot[slot].add(schedule.roomId.toString());
            }
          }
        }
      }
    });

    // Bước 4: Tính toán các khung giờ còn khả dụng
    const availableSlots = ALL_TIME_SLOTS.filter(
      (slot) =>
        !bookedSlots.has(slot) || bookedRoomsBySlot[slot].size < rooms.length
    );

    // Bước 5: Tính toán số phòng còn trống cho mỗi slot
    const availableRoomCount = {
      small: TOTAL_ROOMS.small,
      medium: TOTAL_ROOMS.medium,
      large: TOTAL_ROOMS.large,
    };

    // Nếu có bất kỳ time slot nào bị đặt hết tất cả các phòng thì coi như không còn phòng
    if (
      ALL_TIME_SLOTS.some(
        (slot) =>
          bookedRoomsBySlot[slot].size >=
          (roomType === "small"
            ? TOTAL_ROOMS.small
            : roomType === "medium"
            ? TOTAL_ROOMS.medium
            : TOTAL_ROOMS.large)
      )
    ) {
      availableRoomCount[roomType as keyof typeof TOTAL_ROOMS] -= 1;
    }

    return NextResponse.json({
      success: true,
      data: {
        date: formattedDate,
        room_type: roomType,
        available_slots: availableSlots,
        booked_slots: Array.from(bookedSlots),
        available_rooms: availableRoomCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Lỗi khi lấy dữ liệu khung giờ trống",
      },
      { status: 500 }
    );
  }
}
