import "server-only";

import { cookies } from "next/headers";
import type { IMemberProfile } from "@/types/membership";
import { extractMember } from "./auth-helpers";

const getBackendUrl = () =>
  (process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.API_URL || "http://localhost:4000").replace(
    /\/$/,
    ""
  );

export async function getCurrentUser(): Promise<IMemberProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const membershipRes = await fetch(`${getBackendUrl()}/membership/me`, {
      method: "GET",
      headers: authHeaders,
      cache: "no-store",
    });

    if (membershipRes.ok) {
      const membershipData = await membershipRes.json();
      const member = extractMember(membershipData);
      if (member) return member;
    }

    const res = await fetch(`${getBackendUrl()}/users/get-user`, {
      method: "GET",
      headers: authHeaders,
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return extractMember(data);
  } catch (err) {
    console.error("getCurrentUser failed", err);
    return null;
  }
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
