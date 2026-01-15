/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.API_URL ||
  "http://localhost:4000";

const BACKEND_CHANGE_PASSWORD_URL = `${backendUrl.replace(
  /\/$/,
  ""
)}/users/change-password`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const headerToken =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");

    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("access_token")?.value;

    const token = headerToken || cookieToken;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Thiếu token xác thực" },
        { status: 401 }
      );
    }

    const bearerToken = token.startsWith("Bearer") ? token : `Bearer ${token}`;

    const res = await fetch(BACKEND_CHANGE_PASSWORD_URL, {
      method: "POST",
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Không parse được JSON từ change-password", parseError);
    }

    return NextResponse.json(
      data ?? { success: res.ok, message: res.statusText },
      { status: res.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Không thể đổi mật khẩu",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}


