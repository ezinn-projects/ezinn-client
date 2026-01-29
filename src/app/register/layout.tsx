import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký thành viên - Jozo Music Box",
  description: "Đăng ký thành viên Jozo để nhận ưu đãi và quản lý lịch sử đặt box dễ dàng hơn.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
