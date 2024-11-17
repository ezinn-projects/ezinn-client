import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json(
      { error: "Missing roomId parameter" },
      { status: 400 }
    );
  }

  // Giả lập dữ liệu cho room
  const roomData = {
    id: roomId,
    name: "Deluxe Room",
    description: "A comfortable room with modern amenities.",
    price: 500000,
    discountedPrice: 450000,
    amenities: ["WiFi", "Air Conditioning", "TV"],
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
  };

  return NextResponse.json(roomData);
}
