import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { recruitmentSchema } from "@/schemas/recruitment.schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = recruitmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu không hợp lệ",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Connect to database
    const client = await clientPromise;
    const db = client.db("jozo");

    // Convert birthDate string to Date for database
    const [day, month, year] = validatedData.birthDate.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day);

    // Add submission timestamp and status
    const applicationData = {
      ...validatedData,
      birthDate, // Store as Date in database
      note: validatedData.note?.trim() || null,
      submittedAt: new Date(),
      status: "pending", // pending, reviewed, contacted, hired, rejected
    };

    // Insert into database
    const result = await db
      .collection("recruitments")
      .insertOne(applicationData);

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to applicant

    return NextResponse.json(
      {
        success: true,
        message: "Đơn ứng tuyển đã được gửi thành công!",
        applicationId: result.insertedId,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi gửi đơn ứng tuyển" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("jozo");

    // Get all applications (for admin use)
    const applications = await db
      .collection("recruitments")
      .find({})
      .sort({ submittedAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ applications });
  } catch {
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy danh sách ứng tuyển" },
      { status: 500 }
    );
  }
}
