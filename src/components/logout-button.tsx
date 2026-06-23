"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      className={className}
      onClick={async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });
        } catch (err) {
          console.error("Logout failed", err);
        } finally {
          router.replace("/");
          // Refresh sau điều hướng để lấy Nav với trạng thái khách
          setTimeout(() => router.refresh(), 0);
        }
      }}
    >
      {children ?? "Đăng xuất"}
    </Button>
  );
}

