import { NextResponse } from "next/server";
import { getGiftById } from "@/lib/gifts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const gift = await getGiftById(id);

    if (!gift) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy quà tặng" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: gift });
  } catch (error) {
    console.error("Failed to fetch gift", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
