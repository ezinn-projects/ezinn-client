"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IMemberProfile } from "@/types/membership";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const getInitials = (name?: string) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
};

const pickDisplayName = (member?: IMemberProfile | null) =>
  member?.full_name ||
  member?.fullName ||
  member?.name ||
  member?.username ||
  member?.email ||
  member?.phone ||
  member?.phone_number;

const pickAvatarUrl = (member?: IMemberProfile | null) => {
  if (!member) return null;
  const candidates = [
    (member as Record<string, unknown>).avatar,
    (member as Record<string, unknown>).avatarUrl,
    (member as Record<string, unknown>).avatar_url,
    (member as Record<string, unknown>).image,
    (member as Record<string, unknown>).photo,
    (member as Record<string, unknown>).picture,
  ];
  const found = candidates.find(
    (item) => typeof item === "string" && item.trim()
  ) as string | undefined;
  return found || null;
};

export default function UserMenu({
  currentUser,
}: {
  currentUser?: IMemberProfile | null;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const displayName = useMemo(
    () => pickDisplayName(currentUser) || "Thành viên",
    [currentUser]
  );

  const avatarUrl = useMemo(() => pickAvatarUrl(currentUser), [currentUser]);

  const isAuthed = Boolean(currentUser);

  if (!isAuthed) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatar"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover"
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-lightpink text-black grid place-items-center text-xs font-bold">
            {getInitials(displayName)}
          </div>
        )}
        <span className="max-w-[120px] truncate">{displayName || "User"}</span>
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-64 rounded-2xl border border-white/10",
            "bg-black/90 backdrop-blur shadow-xl p-4 space-y-2 text-sm text-white z-50"
          )}
        >
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-lightpink text-black grid place-items-center text-sm font-bold">
                {getInitials(displayName)}
              </div>
            )}
            <div>
              <div className="font-semibold">{displayName || "User"}</div>
              <div className="text-xs text-gray-300">
                {currentUser?.username || currentUser?.email || "—"}
              </div>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-200">
            <div className="flex justify-between">
              <span>Email</span>
              <span className="font-semibold">
                {currentUser?.email || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phone</span>
              <span className="font-semibold">
                {currentUser?.phone || currentUser?.phone_number || "—"}
              </span>
            </div>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg bg-white/10 hover:bg-white/20 text-white py-2 text-sm text-center transition"
          >
            Thông tin chi tiết
          </Link>
          <button
            onClick={async () => {
              try {
                await fetch("/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });
              } catch (err) {
                console.error("Logout failed", err);
              } finally {
                setOpen(false);
                router.replace("/");
                setTimeout(() => router.refresh(), 0);
              }
            }}
            className="w-full rounded-lg bg-white/10 hover:bg-white/20 text-white py-2 text-sm transition"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

