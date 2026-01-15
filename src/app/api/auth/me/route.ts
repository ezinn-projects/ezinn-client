/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Proxy tới backend /users/me bằng token (Bearer).
 * Ưu tiên header Authorization; fallback query token.
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const headerToken =
      request.headers.get("authorization") ||
      request.headers.get("Authorization") ||
      url.searchParams.get("token");

    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("access_token")?.value;

    const token = headerToken || cookieToken;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Thiếu token (Authorization)" },
        { status: 401 }
      );
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      process.env.API_URL ||
      "http://localhost:4000";

    const res = await fetch(`${backendUrl}/users/get-user`, {
      method: "GET",
      headers: {
        Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server khi lấy user",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

