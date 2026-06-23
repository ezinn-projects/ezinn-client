import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Forward request to backend API
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000";
    const response = await fetch(`${backendUrl}/bookings/${id}/queue-songs`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      // Revalidate cache bằng tags để đảm bảo dữ liệu mới được fetch
      revalidateTag("booking-details", "max");

      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: response.status });
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 },
    );
  }
}
