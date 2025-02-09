import { NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";

export async function GET() {
  try {
    // Kiểm tra kết nối MongoDB
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "MongoDB connection failed" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jozo");

    // Lấy danh sách phòng
    const rooms = await db.collection("rooms").find({}).toArray();

    // Lấy bảng giá (mặc định lấy giá ngày thường)
    const prices = await db
      .collection("prices")
      .findOne({ day_type: "weekday" });

    if (!prices) {
      return NextResponse.json(
        { success: false, message: "Price data not found" },
        { status: 404 }
      );
    }

    // Thêm thông tin giá vào từng phòng
    const roomsWithPrices = rooms.map((room) => {
      const roomPrices = prices.time_slots.map(
        (slot: {
          start: string;
          end: string;
          prices: Array<{ room_type: string; price: number }>;
        }) => {
          const priceInfo = slot.prices.find(
            (p) => p.room_type === room.roomType
          );
          return {
            timeSlot: `${slot.start}-${slot.end}`,
            price: priceInfo ? priceInfo.price : 0,
          };
        }
      );

      return {
        ...room,
        prices: roomPrices,
      };
    });

    return NextResponse.json({
      success: true,
      data: roomsWithPrices,
    });
  } catch (error) {
    console.error("Error fetching rooms with prices:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
