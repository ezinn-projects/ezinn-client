"use client";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import type { IMemberProfile, IMembershipConfig } from "@/types/membership";
import {
  extractMember,
  extractMembershipConfig,
  getDisplayName,
} from "@/lib/auth-helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const safeJsonParse = async (response: Response) => {
  try {
    return await response.json();
  } catch (error) {
    console.error("Failed to parse JSON response", error);
    return null;
  }
};

const hasAccessTokenCookie = async () => {
  try {
    const res = await fetch("/api/auth/session", { cache: "no-store" });
    const data = await safeJsonParse(res);
    return res.ok && (data as { hasToken?: boolean })?.hasToken === true;
  } catch (error) {
    console.error("Check access_token cookie failed", error);
    return false;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState<unknown>(null);
  const [meResponse, setMeResponse] = useState<unknown>(null);
  const [membershipResponse, setMembershipResponse] = useState<unknown>(null);
  const [member, setMember] = useState<IMemberProfile | null>(null);
  const [, setMembershipConfig] = useState<IMembershipConfig | null>(null);

  const rawDisplay = useMemo(
    () => JSON.stringify(rawResponse, null, 2) ?? "",
    [rawResponse]
  );
  const meDisplay = useMemo(
    () => JSON.stringify(meResponse, null, 2) ?? "",
    [meResponse]
  );
  const membershipDisplay = useMemo(
    () => JSON.stringify(membershipResponse, null, 2) ?? "",
    [membershipResponse]
  );
  const memberName = useMemo(() => getDisplayName(member), [member]);

  useEffect(() => {
    let cancelled = false;
    const checkMe = async () => {
      try {
        const hasToken = await hasAccessTokenCookie();
        if (!hasToken || cancelled) {
          return;
        }
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await safeJsonParse(res);
        if (!cancelled && res.ok) {
          const profile = extractMember(data);
          if (profile) {
            setMember(profile);
            router.replace("/");
            setTimeout(() => router.refresh(), 0);
          }
        }
      } catch (err) {
        console.error("Pre-check /api/auth/me failed", err);
      }
    };
    checkMe();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const onSubmit = async (values: LoginFormData) => {
    setLoading(true);
    setRawResponse(null);
    setMeResponse(null);
    setMembershipResponse(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const result = await safeJsonParse(response);
      setRawResponse(result);

      if (!response.ok || result?.success === false || !result) {
        throw new Error(result?.message || "Đăng nhập thất bại");
      }

      try {
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        const meData = await safeJsonParse(meRes);
        console.log("DEBUG /api/auth/me response", {
          status: meRes.status,
          ok: meRes.ok,
          body: meData,
        });
        setMeResponse(meData);
        const meMember = extractMember(meData);
        const finalMember = meMember ?? extractMember(result);
        setMember(finalMember);
      } catch {
        const fallbackMember = extractMember(result);
        setMember(fallbackMember);
      }

      try {
        const membershipRes = await fetch("/api/membership/me", {
          cache: "no-store",
        });
        const membershipData = await safeJsonParse(membershipRes);
        console.log("DEBUG /api/membership/me response", {
          status: membershipRes.status,
          ok: membershipRes.ok,
          body: membershipData,
        });
        setMembershipResponse(membershipData);
        const membershipMember = extractMember(membershipData);
        if (membershipMember) {
          setMember((prev) => ({
            ...(prev ?? {}),
            ...(membershipMember as IMemberProfile),
          }));
        }
      } catch (err) {
        console.error("Fetch /api/membership/me failed", err);
      }

      const memberProfile = extractMember(result) ?? member;
      const config = extractMembershipConfig(result);

      setMembershipConfig(config);

      const friendlyName = getDisplayName(memberProfile);

      toast({
        title: "Đăng nhập thành công",
        description: memberProfile
          ? `Chào ${friendlyName || "bạn"}!`
          : "Lấy thông tin thành viên thành công.",
      });
      router.replace("/");
      // Refresh sau điều hướng để lấy server props với cookie mới
      setTimeout(() => router.refresh(), 0);
    } catch (error) {
      setMember(null);
      setMembershipConfig(null);
      setRawResponse(null);
      setMeResponse(null);
      toast({
        title: "Đăng nhập thất bại",
        description:
          error instanceof Error ? error.message : "Không thể đăng nhập.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-4">
      <section className="bg-black rounded-2xl shadow-lg p-6 border border-white/10">
        <h1 className="text-2xl font-bold text-lightpink mb-2">
          Đăng nhập thành viên
        </h1>
        {member && (
          <p className="text-sm text-gray-200 mb-4">
            Đã lưu: {memberName || member.username || "Thành viên"}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Số điện thoại / Email / Username"
            required
            placeholder="vd: 0912345678 hoặc user@email.com"
            {...register("username")}
            error={errors.username?.message}
          />

          <Input
            label="Passcode"
            required
            type="password"
            showPasswordToggle
            maxLength={6}
            placeholder="******"
            {...register("password")}
            error={errors.password?.message}
            helpText="Passcode chỉ bao gồm 6 chữ số"
          />

          <Button
            type="submit"
            className="w-full animate-buttonheartbeat bg-lightpink text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </section>
    </div>
  );
}
