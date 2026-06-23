import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu - Jozo Music Box",
  description:
    "Đặt lại mật khẩu tài khoản Jozo Music Box qua liên kết xác thực từ email.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
