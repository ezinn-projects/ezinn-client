import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";

export async function POST() {
  try {
    // Lấy auth token từ cookie
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (authToken) {
      // Xóa session từ database nếu tồn tại
      const isConnected = await checkMongoConnection();

      if (isConnected) {
        const client = await clientPromise;
        const db = client.db("jozo");
        const sessionsCollection = db.collection("sessions");

        // Xóa session dựa trên token
        await sessionsCollection.deleteOne({ token: authToken });
      }

      // Xóa cookie auth_token
      (await cookies()).delete("auth_token");
    }

    return NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi đăng xuất",
      },
      { status: 500 }
    );
  }
}
