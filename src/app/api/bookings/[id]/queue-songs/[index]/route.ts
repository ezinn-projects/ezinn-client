import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  try {
    const { id, index } = await params;

    // Forward request to backend API
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000";
    const response = await fetch(
      `${backendUrl}/bookings/${id}/queue-songs/${index}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      // Revalidate cache bằng tags để đảm bảo dữ liệu mới được fetch
      revalidateTag("booking-details");

      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: response.status });
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
