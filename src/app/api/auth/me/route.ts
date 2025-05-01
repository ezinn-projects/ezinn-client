import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Kiểm tra auth cookie
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: "Chưa đăng nhập" },
        { status: 401 }
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

    // Tìm session trong database
    const client = await clientPromise;
    const db = client.db("jozo");
    const sessionsCollection = db.collection("sessions");

    const session = await sessionsCollection.findOne({
      token: authToken,
      expires: { $gt: new Date() }, // Session chưa hết hạn
    });

    if (!session) {
      // Xóa cookie nếu session không tồn tại hoặc đã hết hạn
      (await cookies()).delete("auth_token");
      return NextResponse.json(
        { success: false, message: "Phiên đăng nhập đã hết hạn" },
        { status: 401 }
      );
    }

    // Lấy thông tin người dùng từ ID trong session
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({
      _id: new ObjectId(session.userId),
    });

    if (!user) {
      // Xóa session nếu không tìm thấy user
      await sessionsCollection.deleteOne({ _id: session._id });
      (await cookies()).delete("auth_token");
      return NextResponse.json(
        { success: false, message: "Người dùng không tồn tại" },
        { status: 401 }
      );
    }

    // Loại bỏ thông tin nhạy cảm trước khi trả về
    const userData = { ...user };
    delete userData.password;

    return NextResponse.json({
      success: true,
      message: "Đã đăng nhập",
      data: userData,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi kiểm tra xác thực",
      },
      { status: 500 }
    );
  }
}
