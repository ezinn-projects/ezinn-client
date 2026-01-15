import { Button } from "@/components/ui/button";
import { getDisplayName, pickAvatarUrl } from "@/lib/auth-helpers";
import { getCurrentUser } from "@/lib/auth-server";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import { cookies } from "next/headers";
import { StreakRewards } from "../../components/streak-rewards";
import type { Gift } from "@/types/gift";

type MembershipResult = {
  message?: string;
  user?: Record<string, unknown>;
  config?: {
    tierThresholds?: Record<string, number>;
    pointPerCurrency?: number;
    currencyUnit?: number;
    dailySelfClaimLimitPerPhone?: number;
    streak?: {
      windowDays?: number;
      rewards?: { count: number; bonusPoints: number; giftId?: string }[];
    };
  };
  progress?: {
    currentTier?: string;
    nextTier?: { tier?: string; required?: number };
  };
  streak?: { count?: number; windowDays?: number; isActive?: boolean };
};

const getBackendUrl = () =>
  (
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    process.env.API_URL ||
    "http://localhost:4000"
  ).replace(/\/$/, "");

const parseMembershipResult = (payload: unknown): MembershipResult | null => {
  if (!payload || typeof payload !== "object") return null;
  const data =
    (payload as Record<string, unknown>).result ||
    (payload as Record<string, unknown>).data ||
    payload;
  if (!data || typeof data !== "object") return null;
  return data as MembershipResult;
};

const getAppApiUrl = () =>
  (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export default async function ProfilePage() {
  const member = await getCurrentUser();

  const displayName = getDisplayName(member) || "Thành viên";
  const avatarUrl = pickAvatarUrl(member);

  console.log(member);

  const dateOfBirth = member?.date_of_birth
    ? new Date(member.date_of_birth as string).toLocaleDateString("vi-VN")
    : "—";

  const profileRows = [
    { label: "Tên hiển thị", value: displayName },
    { label: "Username", value: member?.username || "—" },
    { label: "Email", value: member?.email || "—" },
    {
      label: "Số điện thoại",
      value: member?.phone || member?.phone_number || "—",
    },
    { label: "Sinh nhật", value: dateOfBirth },
  ];

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  let membershipResult: MembershipResult | null = null;
  let gifts: Gift[] = [];
  if (token) {
    try {
      const appApiUrl = getAppApiUrl();
      const membershipUrl = appApiUrl
        ? `${appApiUrl}/api/membership/me`
        : "/api/membership/me";

      const res = await fetch(membershipUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const payload = await res.json();
      membershipResult = parseMembershipResult(payload);
    } catch (error) {
      console.error("Lấy membership thất bại", error);
    }

    try {
      const appApiUrl = getAppApiUrl();
      const giftsUrl = appApiUrl ? `${appApiUrl}/api/gifts` : "/api/gifts";
      const res = await fetch(giftsUrl, { cache: "no-store" });
      const data = await res.json();
      if (data?.success && Array.isArray(data.data)) {
        gifts = data.data as Gift[];
      }
    } catch (error) {
      console.error("Lấy danh sách quà thất bại", error);
    }
  }

  const tierThresholds =
    membershipResult?.config?.tierThresholds &&
    Object.entries(membershipResult.config.tierThresholds).sort(
      (a, b) => a[1] - b[1]
    );
  const nextTierName = membershipResult?.progress?.nextTier?.tier;
  const nextTierRequired = membershipResult?.progress?.nextTier?.required;
  const currentTier = membershipResult?.progress?.currentTier;
  const streakRewards = membershipResult?.config?.streak?.rewards || [];
  const maxThreshold =
    tierThresholds && tierThresholds.length > 0
      ? tierThresholds[tierThresholds.length - 1][1]
      : 0;

  const { absolutePercent, absolutePoints } = (() => {
    if (!tierThresholds || !currentTier || !nextTierName) {
      return { absolutePercent: 0, absolutePoints: 0 };
    }
    const currentThreshold =
      tierThresholds.find(([tier]) => tier === currentTier)?.[1] ?? 0;
    const nextThreshold = tierThresholds.find(
      ([tier]) => tier === nextTierName
    )?.[1];
    if (nextThreshold === undefined) {
      return { absolutePercent: 0, absolutePoints: 0 };
    }
    const span = Math.max(0, nextThreshold - currentThreshold);
    const remaining = Math.max(0, nextTierRequired ?? span);
    const achieved = Math.max(0, span - remaining);
    const absolutePoints = currentThreshold + achieved;
    const absolute = maxThreshold
      ? Math.min(100, (absolutePoints / maxThreshold) * 100)
      : 0;

    return { absolutePercent: absolute, absolutePoints };
  })();

  const isAuthed = Boolean(member);
  const circleRadius = 38;
  const circumference = 2 * Math.PI * circleRadius;
  const progressOffset =
    circumference *
    (1 - Math.min(100, Math.max(0, absolutePercent || 0)) / 100);
  const nextThresholdValue = tierThresholds?.find(
    ([tier]) => tier === nextTierName
  )?.[1];
  const displayTarget = nextThresholdValue ?? maxThreshold;
  const streakWindowDays =
    membershipResult?.config?.streak?.windowDays ||
    membershipResult?.streak?.windowDays ||
    20;
  const streakCount = Math.max(0, membershipResult?.streak?.count ?? 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 text-white rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-16 w-16 rounded-full object-cover border border-white/60 shadow-md"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-white/20 text-white flex items-center justify-center text-2xl font-semibold shadow-inner">
              {(displayName[0] || "U").toUpperCase()}
            </div>
          )}
          <div className="flex-1 text-left sm:text-left">
            <div className="text-sm text-white/80">Xin chào</div>
            <div className="text-2xl font-semibold leading-tight">
              {displayName}
            </div>
          </div>
        </div>
      </div>

      {membershipResult && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-red-100/40 bg-gradient-to-br from-[#0f1118] via-[#161822] to-[#0b0c12] p-5 sm:p-6 text-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,66,66,0.2),transparent_35%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between">
              <div className="flex-1 space-y-2">
                <div className="text-xs uppercase tracking-wide text-gray-300">
                  Cấp thành viên
                </div>
                <div className="text-3xl font-extrabold leading-tight">
                  {currentTier || "Chưa có hạng"}
                </div>
                <div className="text-sm text-gray-200">
                  {membershipResult?.message ||
                    "Tích điểm và thăng hạng để mở khóa ưu đãi riêng."}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-amber-300 shadow" />
                  {nextTierName && nextTierRequired !== undefined
                    ? `Còn ${nextTierRequired.toLocaleString(
                        "vi-VN"
                      )} điểm để lên ${nextTierName}`
                    : "Chưa có lộ trình nâng hạng"}
                </div>
              </div>

              <div className="relative w-full lg:max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#b9131f] via-[#d5192c] to-[#f7422c] p-5 shadow-[0_12px_45px_rgba(220,38,38,0.35)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.12),transparent_30%)]" />
                <div className="relative flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                        {currentTier || "Hội viên"}
                      </p>
                      <p className="text-3xl font-extrabold">
                        {(absolutePoints || 0).toLocaleString("vi-VN")}
                      </p>
                      <p className="text-xs text-white/80">
                        / {(displayTarget || 0).toLocaleString("vi-VN")} điểm
                      </p>
                    </div>
                    <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
                      {nextTierName || "Tier tiếp theo"}
                    </div>
                  </div>

                  <div className="relative mt-1">
                    <div className="h-3 w-full rounded-full bg-white/15 shadow-inner" />
                    {tierThresholds &&
                      tierThresholds.length > 0 &&
                      maxThreshold > 0 &&
                      tierThresholds.map(([tier, value]) => {
                        const pct = Math.min(
                          100,
                          Math.max(0, (value / maxThreshold) * 100)
                        );
                        return (
                          <div
                            key={`bar-${tier}`}
                            className="absolute inset-y-0 -translate-x-1/2 text-center"
                            style={{ left: `${pct}%` }}
                          >
                            <div className="relative h-full w-0">
                              <span className="absolute top-1/2 -translate-y-1/2 block h-2.5 w-2.5 rounded-full border border-white/80 bg-white shadow" />
                            </div>
                            <div className="absolute top-full mt-1 w-max -translate-x-1/2 text-[11px] font-semibold text-white/80 whitespace-nowrap">
                              {value.toLocaleString("vi-VN")} điểm
                            </div>
                          </div>
                        );
                      })}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white to-amber-200 shadow-[0_0_18px_rgba(255,255,255,0.45)]"
                      style={{
                        width: `${Math.max(
                          8,
                          Math.min(100, absolutePercent || 0)
                        )}%`,
                      }}
                      title={`${absolutePercent.toLocaleString(
                        "vi-VN"
                      )}% · ${absolutePoints.toLocaleString(
                        "vi-VN"
                      )}/${displayTarget.toLocaleString("vi-VN")} điểm`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <StreakRewards
              windowDays={streakWindowDays}
              currentCount={streakCount}
              rewards={streakRewards}
              gifts={gifts}
            />
          </div>
        </div>
      )}

      <div className="bg-white/90 text-black rounded-2xl p-5 shadow space-y-3">
        <h2 className="text-lg font-semibold">Thông tin chi tiết</h2>
        {!isAuthed && (
          <div className="text-sm text-red-600">
            Chưa có thông tin đăng nhập. Vui lòng{" "}
            <Link href="/login" className="underline text-pink-600">
              đăng nhập
            </Link>
            .
          </div>
        )}
        {isAuthed && (
          <div className="divide-y divide-gray-200">
            {profileRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 text-sm"
              >
                <span className="text-gray-600">{row.label}</span>
                <span className="font-semibold text-gray-900">
                  {row.value || "—"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button
          asChild
          variant="outline"
          className="bg-white text-black hover:bg-gray-100"
        >
          <Link href="/">Về trang chủ</Link>
        </Button>
        {isAuthed && (
          <Button asChild className="bg-lightpink text-white hover:bg-pink-600">
            <Link href="/profile/change-password">Đổi mật khẩu</Link>
          </Button>
        )}
        <LogoutButton className="bg-red-500 hover:bg-red-600 text-white" />
      </div>
    </div>
  );
}
