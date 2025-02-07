/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
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
        { success: false, message: "MongoDB connection failed" },
        { status: 500 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("jozo");
    const collection = db.collection("users");

    // Check if email already exists
    const existingUser = await collection.findOne({
      email: validatedData.email,
    });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Insert new user
    const result = await collection.insertOne({
      ...validatedData,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: error.status || 500 }
    );
  }
}
