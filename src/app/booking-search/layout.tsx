import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tra cứu đặt box - Jozo Music Box",
  description: "Tra cứu thông tin đặt box tại Jozo Music Box bằng số điện thoại",
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookingSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
