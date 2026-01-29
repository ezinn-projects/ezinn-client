import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển dụng Part-time - Jozo Music Box Biên Hòa",
  description: "Jozo đang tìm nhân viên part-time: Lễ tân, phục vụ, giữ xe. Lương 22k/giờ, môi trường trẻ trung, năng động tại Biên Hòa.",
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
    description: "Lương 22k/giờ - Môi trường trẻ trung - Không yêu cầu kinh nghiệm",
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
