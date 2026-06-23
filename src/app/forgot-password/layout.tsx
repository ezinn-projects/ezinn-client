import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu - Jozo Music Box",
  description:
    "Yêu cầu gửi email đặt lại mật khẩu tài khoản Jozo Music Box.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
