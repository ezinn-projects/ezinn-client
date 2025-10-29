import { NextRequest, NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const status = searchParams.get("status"); // "booked", "cancelled", "finished"

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^(0)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại không đúng định dạng" },
        { status: 400 }
      );
    }

    // Kiểm tra kết nối MongoDB trước khi thực hiện truy vấn
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "MongoDB connection failed" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jozo");
    const bookingsCollection = db.collection("room_schedules");

    // Build query based on status filter
    const query: Record<string, unknown> = { customerPhone: phone };

    if (status && status !== "all") {
      if (status === "booked") {
        query.status = { $in: ["booked", "in use", "locked"] };
      } else if (status === "cancelled") {
        query.status = "cancelled";
      } else if (status === "finished") {
        query.status = "finished";
      }
    }

    const bookings = await bookingsCollection
      .find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .toArray();

    return NextResponse.json({
      success: true,
      data: bookings,
      message: `Tìm thấy ${bookings.length} đặt box`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server khi tìm kiếm đặt box" },
      { status: 500 }
    );
  }
}
