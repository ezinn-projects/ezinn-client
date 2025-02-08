import BackgroundCross from "@/components/background-cross";
import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
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
    <html lang="en">
      <link rel="icon" href="/images/ezinn-logo.png" />
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
        <main className="flex-grow md:mt-16 mt-24 mb-8">{children}</main>

        {/* Footer */}
        <footer className="bg-black text-white py-6 border-t border-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="mb-4 md:mb-0">
              <Image
                src="/images/ezinn-logo.png"
                alt="Ezinn Homestay"
                width={200}
                height={50}
              />
            </Link>
            <div className="text-center md:text-right text-sm">
              <p>© {new Date().getFullYear()} Ezinn. All rights reserved.</p>
              <p className="text-gray-200">
                Tận hưởng không gian riêng tư và dịch vụ đẳng cấp như ở Ezinn.
                Theo dõi chúng tôi trên mạng xã hội.
              </p>
              <div className="flex space-x-4 mt-2">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  className="hover:underline hover:text-lightpink transition-colors"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.tiktok.com/@ezinnhomestay"
                  target="_blank"
                  className="hover:underline hover:text-lightpink transition-colors"
                >
                  Tiktok
                </Link>
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  className="hover:underline hover:text-lightpink transition-colors"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
