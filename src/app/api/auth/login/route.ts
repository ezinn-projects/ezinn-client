// import { NextResponse } from "next/server";
import { getTokenFromResponse } from "@/lib/auth-helpers";
import { NextResponse } from "next/server";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.API_URL ||
  "http://localhost:4000";

const BACKEND_LOGIN_URL = `${backendUrl.replace(/\/$/, "")}/users/login`;

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const res = await fetch(BACKEND_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    const token = getTokenFromResponse(data);

    const response = NextResponse.json(data, { status: res.status });

    // Set cookie when login success and token exists
    if (res.ok && token) {
      response.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    } else {
      response.cookies.set("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const backendUrl =
//       process.env.NEXT_PUBLIC_BACKEND_API_URL ||
//       process.env.API_URL ||
//       "http://localhost:4000";

//     const res = await fetch(`${backendUrl}/users/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Không thể đăng nhập. Vui lòng thử lại.",
//         error: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

