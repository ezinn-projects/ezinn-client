import { NextRequest, NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { bookingId, video } = await request.json();

    if (!bookingId || !video) {
      return NextResponse.json(
        { success: false, message: "Booking ID và video là bắt buộc" },
        { status: 400 }
      );
    }

    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "Không thể kết nối đến database" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jozo");

    // Kiểm tra booking có tồn tại không
    const booking = await db.collection("bookings").findOne({
      _id: bookingId,
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy booking" },
        { status: 404 }
      );
    }

    // Thêm video vào queue của booking
    const result = await db.collection("bookings").updateOne(
      { _id: bookingId },
      {
        $push: {
          queue: {
            ...video,
            addedAt: new Date(),
            status: "pending", // pending, playing, completed
          },
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Không thể thêm video vào queue" },
        { status: 500 }
      );
    }

    // Lấy thông tin booking đã cập nhật để trả về
    const updatedBooking = await db.collection("bookings").findOne({
      _id: bookingId,
    });

    console.log("updatedBooking", updatedBooking);

    // Revalidate cache để đảm bảo dữ liệu mới được fetch
    revalidatePath(`/search-songs/${bookingId}`);
    revalidatePath(`/api/bookings/${bookingId}`);

    return NextResponse.json({
      success: true,
      message: "Đã thêm video vào queue thành công",
      bookingId: bookingId,
      bookingCode: updatedBooking?.bookingCode,
      queueSongs: updatedBooking?.queue || [],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
