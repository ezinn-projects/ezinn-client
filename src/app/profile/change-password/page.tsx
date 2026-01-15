import Link from "next/link";

import ChangePasswordForm from "@/components/change-password-form";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-server";
import { getDisplayName } from "@/lib/auth-helpers";

export default async function ChangePasswordPage() {
  const member = await getCurrentUser();
  const isAuthed = Boolean(member);
  const displayName = getDisplayName(member) || "bạn";

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Đổi mật khẩu</h1>
          <p className="text-sm text-gray-200">
            {isAuthed
              ? `Xin chào ${displayName}, hãy cập nhật mật khẩu mới của bạn.`
              : "Bạn cần đăng nhập để đổi mật khẩu."}
          </p>
        </div>
        <Button asChild variant="outline" className="text-black bg-white">
          <Link href="/profile">Quay lại hồ sơ</Link>
        </Button>
      </div>

      {!isAuthed ? (
        <div className="bg-white/90 text-black rounded-2xl p-5 shadow space-y-3">
          <p className="text-sm">
            Bạn chưa đăng nhập. Vui lòng{" "}
            <Link href="/login" className="text-pink-600 underline">
              đăng nhập
            </Link>{" "}
            để tiếp tục.
          </p>
        </div>
      ) : (
        <div className="bg-white/90 text-black rounded-2xl p-5 shadow space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Cập nhật mật khẩu</h2>
            <p className="text-sm text-gray-600">
              Nhập mật khẩu hiện tại và thiết lập mật khẩu mới.
            </p>
          </div>
          <ChangePasswordForm />
        </div>
      )}
    </div>
  );
}


