import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng Part-time - Jozo Music Box Biên Hòa",
  description:
    "Jozo Music Box Biên Hòa tuyển nhân viên bán thời gian: lễ tân, phục vụ, giữ xe. Lương 24.000đ/giờ.",
  keywords: [
    "tuyển dụng part-time Biên Hòa",
    "tuyển nhân viên music box",
    "việc làm part-time sinh viên",
    "tuyển lễ tân part-time",
    "tuyển phục vụ music box",
    "jozo tuyển dụng",
  ],
  openGraph: {
    title: "Tuyển dụng Part-time - Jozo Music Box",
    description: "Lương 24.000đ/giờ, tìm đồng đội part time",
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
