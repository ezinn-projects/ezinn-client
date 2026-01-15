/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Proxy tới backend /membership/me để lấy loyalty & streak.
 * Dùng token từ header Authorization hoặc cookie access_token.
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

    const res = await fetch(`${backendUrl.replace(/\/$/, "")}/membership/me`, {
      method: "GET",
      headers: {
        Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server khi lấy loyalty/streak",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

