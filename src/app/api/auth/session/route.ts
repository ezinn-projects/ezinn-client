import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { hasToken: false, message: "Không tìm thấy token" },
      { status: 401 }
    );
  }

  return NextResponse.json({ hasToken: true });
}

