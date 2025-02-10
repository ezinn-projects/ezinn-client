import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

interface RouteParams {
  params: Promise<{ type: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { type } = await params;
    const client = await clientPromise;
    const db = client.db("jozo");

    console.log("params.type", type);

    // Lấy danh sách phòng theo roomType
    const rooms = await db
      .collection("rooms")
      .find({ roomType: type })
      .toArray();

    if (!rooms.length) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy phòng thuộc loại này" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.error("Error fetching room details:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi lấy thông tin phòng",
      },
      { status: 500 }
    );
  }
}
