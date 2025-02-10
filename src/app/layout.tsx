import BackgroundCross from "@/components/background-cross";
import Nav from "@/components/nav";
import TwoColumnFooter from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JOZO Music Box - Phòng Hát Karaoke Norebang Biên Hòa",
  icons: {
    icon: "/Screenshot_11-removebg-preview.png",
  },
  keywords: [
    "JOZO Music Box",
    "Karaoke Biên Hòa",
    "Norebang Hàn Quốc",
    "Photobooth miễn phí",
    "Phòng hát giá rẻ",
    "Karaoke sinh viên",
    "Phòng hát đẹp",
    "Studio karaoke",
    "Hát hò Biên Hòa",
    "Giá sinh viên",
    "Phụ kiện chụp hình",
    "Âm thanh chất lượng",
  ],
  description: `JOZO Music Box - Phòng hát karaoke theo phong cách Norebang Hàn Quốc đầu tiên tại Biên Hòa. 
    Trang bị âm thanh chuẩn studio, phụ kiện chụp hình xịn xò và photobooth miễn phí. 
    Không gian riêng tư, hiện đại với giá cả phù hợp cho học sinh, sinh viên. 
    Đặc biệt giảm 20% cho sinh viên có thẻ. 
    Trải nghiệm karaoke chuẩn Hàn với chi phí hợp lý nhất tại Biên Hòa.`,
  openGraph: {
    title: "JOZO Music Box - Karaoke Norebang Biên Hòa",
    description:
      "Phòng hát karaoke phong cách Hàn Quốc - Photobooth miễn phí - Giá sinh viên",
    images: ["/images/jozo-thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/images/Screenshot_11-removebg-preview.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-lightpink text-white`}
      >
        <BackgroundCross
          className="fixed -z-10"
          crossColor="#fb3a5d"
          fade={true}
          crossSize={40}
        />
        {/* Header */}
        <header>
          <Nav />
        </header>

        {/* Main */}
        <main className="flex-grow mt-32 mb-8 container mx-auto">
          {children}
        </main>

        {/* Footer */}
        <TwoColumnFooter />
        <Toaster />
      </body>
    </html>
  );
}
