import { NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import { bookingSchema } from "@/schemas/booking.schema";
import { Booking } from "@/types/booking";
import { Document, WithId } from "mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data using the schema
    const validatedData = bookingSchema.parse(body);

    // Add required booking fields not in the schema
    const bookingData = {
      customer_name: validatedData.name,
      customer_phone: validatedData.phone,
      customer_email: validatedData.email || null,
      room_type: body.room_type,
      booking_date: body.booking_date,
      time_slots: body.time_slots,
      status: "pending",
      total_price: body.total_price || 0,
      created_at: new Date().toISOString(),
    };

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
    const bookingsCollection = db.collection("bookings");

    // Kiểm tra xem time slots đã được đặt chưa
    const requestedDate = new Date(body.booking_date);
    const formattedDate = requestedDate.toISOString().split("T")[0];

    const existingBookings = await bookingsCollection
      .find({
        booking_date: formattedDate,
        room_type: body.room_type,
        status: { $in: ["pending", "confirmed"] },
      })
      .toArray();

    // Kiểm tra xem có time slots nào bị trùng không
    const unavailableSlots: string[] = [];

    if (existingBookings.length > 0) {
      // Lấy tất cả time slots đã đặt
      const bookedSlots = existingBookings.flatMap(
        (booking: WithId<Document>) =>
          (booking as unknown as Booking).time_slots
      );

      // Kiểm tra xem có time slots nào được yêu cầu đã bị đặt
      body.time_slots.forEach((slot: string) => {
        if (bookedSlots.includes(slot)) {
          unavailableSlots.push(slot);
        }
      });
    }

    // Nếu có time slots không khả dụng, trả về lỗi
    if (unavailableSlots.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Một số khung giờ đã được đặt",
          unavailableSlots,
        },
        { status: 400 }
      );
    }

    // Tiến hành lưu booking
    const result = await bookingsCollection.insertOne(bookingData);

    return NextResponse.json({
      success: true,
      data: {
        ...bookingData,
        _id: result.insertedId.toString(),
      },
      message: "Đặt phòng thành công",
    });
  } catch (error: Error | unknown) {
    console.error("Booking error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Có lỗi xảy ra khi đặt phòng";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Kiểm tra kết nối MongoDB
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "Không thể kết nối đến database" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jozo");
    const bookingsCollection = db.collection("bookings");

    // Lấy tất cả bookings, sắp xếp theo thời gian tạo mới nhất
    const bookings = await bookingsCollection
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error: Error | unknown) {
    console.error("Error fetching bookings:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi khi lấy dữ liệu đặt phòng";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
