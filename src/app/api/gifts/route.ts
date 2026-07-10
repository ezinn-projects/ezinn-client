import { NextResponse } from "next/server";
import { getActiveGifts, getGiftById, getGiftsByIds } from "@/lib/gifts";

export async function GET(request: Request) {
  try {
    const idsParam = new URL(request.url).searchParams.get("ids");
    const gifts = idsParam
      ? await getGiftsByIds(
          idsParam
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean),
        )
      : await getActiveGifts();

    return NextResponse.json({ success: true, data: gifts });
  } catch (error) {
    console.error("Failed to fetch gifts", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
