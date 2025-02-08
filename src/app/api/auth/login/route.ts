import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import { z } from "zod";

const loginSchema = z.object({
  phone_number: z.string().min(10).max(10),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = loginSchema.parse(body);

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
    const collection = db.collection("users");

    // Find user by phone number
    const user = await collection.findOne({
      phone_number: validatedData.phone_number,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại hoặc passcode không đúng" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại hoặc passcode không đúng" },
        { status: 401 }
      );
    }

    // Check if user is active
    if (user.status !== "active") {
      return NextResponse.json(
        { success: false, message: "Tài khoản đã bị khóa" },
        { status: 403 }
      );
    }

    // Return only necessary user data
    const userData = {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      status: user.status,
    };

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
      data: userData,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Có lỗi xảy ra",
      },
      { status: 500 }
    );
  }
}
