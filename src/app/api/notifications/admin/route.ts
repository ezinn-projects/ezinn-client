import { NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";

// API route để xử lý thông báo đến admin
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.type || !body.booking_id) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    // Kiểm tra kết nối MongoDB
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "Không thể kết nối đến database" },
        { status: 500 }
      );
    }

    // Kết nối database
    const client = await clientPromise;
    const db = client.db("jozo");

    // Lưu thông báo vào collection admin_notifications
    const notification = {
      ...body,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    await db.collection("admin_notifications").insertOne(notification);

    // Trong tương lai, có thể thêm chức năng gửi email/SMS đến admin ở đây

    return NextResponse.json({
      success: true,
      message: "Thông báo đã được gửi đến admin",
    });
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra khi gửi thông báo" },
      { status: 500 }
    );
  }
}

// API route để lấy danh sách thông báo
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

    // Kết nối database
    const client = await clientPromise;
    const db = client.db("jozo");

    // Lấy tất cả thông báo, sắp xếp theo thời gian tạo mới nhất
    const notifications = await db
      .collection("admin_notifications")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching admin notifications:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra khi lấy thông báo" },
      { status: 500 }
    );
  }
}

// API route để đánh dấu thông báo đã đọc
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.notification_id) {
      return NextResponse.json(
        { success: false, message: "Thiếu ID thông báo" },
        { status: 400 }
      );
    }

    // Kiểm tra kết nối MongoDB
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "Không thể kết nối đến database" },
        { status: 500 }
      );
    }

    // Kết nối database
    const client = await clientPromise;
    const db = client.db("jozo");

    // Cập nhật trạng thái đã đọc
    const { modifiedCount } = await db
      .collection("admin_notifications")
      .updateOne(
        { _id: new (await import("mongodb")).ObjectId(body.notification_id) },
        { $set: { is_read: true, updated_at: new Date().toISOString() } }
      );

    if (modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy thông báo" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Đã đánh dấu thông báo là đã đọc",
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra khi cập nhật thông báo" },
      { status: 500 }
    );
  }
}
