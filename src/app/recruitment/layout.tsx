import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng Part-time - Jozo Music Box Biên Hòa",
  description:
    "Jozo Music Box Biên Hòa tuyển nhân viên bán thời gian: lễ tân, phục vụ, giữ xe. Lương 24.000đ/giờ.",
  keywords: [
    "tuyển dụng part-time Biên Hòa",
    "tuyển nhân viên karaoke",
    "việc làm part-time sinh viên",
    "tuyển lễ tân part-time",
    "tuyển phục vụ karaoke",
    "jozo tuyển dụng",
  ],
  openGraph: {
    title: "Tuyển dụng Part-time - Jozo Music Box",
    description: "Lương 24.000đ/giờ · Đào tạo tại chỗ · Biên Hòa",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
