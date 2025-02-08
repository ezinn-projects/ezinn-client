/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import { registerSchema } from "@/schemas/register.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = registerSchema.parse({
      ...body,
      date_of_birth: new Date(body.date_of_birth),
    });

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

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12);

    // Validate and clean email
    const cleanEmail = validatedData.email?.trim() || null;
    console.log("Clean email:", cleanEmail);

    // Check if email exists (only if email is provided and not null)
    if (cleanEmail) {
      const existingEmail = await collection.findOne({
        email: cleanEmail,
      });
      if (existingEmail) {
        return NextResponse.json(
          { success: false, message: "Email đã tồn tại trong hệ thống" },
          { status: 400 }
        );
      }
    }

    // Check if phone number exists
    const existingPhone = await collection.findOne({
      phone_number: validatedData.phone_number,
    });
    console.log("Phone check:", {
      input: validatedData.phone_number,
      existing: existingPhone,
    });

    if (existingPhone) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại đã tồn tại trong hệ thống" },
        { status: 400 }
      );
    }

    // Remove confirm_password before saving
    const { confirm_password, ...userDataToSave } = {
      ...validatedData,
      email: cleanEmail, // Use cleaned email
      password: hashedPassword,
      role: "user",
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Insert new user
    const result = await collection.insertOne(userDataToSave);

    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công",
      data: {
        _id: result.insertedId,
        email: userDataToSave.email,
        phone_number: userDataToSave.phone_number,
        full_name: userDataToSave.full_name,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Có lỗi xảy ra",
      },
      { status: 500 }
    );
  }
}
