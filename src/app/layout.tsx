import BackgroundCross from "@/components/background-cross";
import Nav from "@/components/nav";
import TwoColumnFooter from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/auth-server";
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
  metadataBase: new URL("https://jozo.com.vn"),
  title: "JOZO Music Box - Music Box Biên Hòa",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
    shortcut: "/images/logo.png",
  },
  keywords: [
    "JOZO Music Box",
    "Karaoke Biên Hòa",
    "Norebang Hàn Quốc",
    "box karaoke giá rẻ",
    "Karaoke sinh viên",
    "box hát đẹp",
    "Studio karaoke",
    "Hát hò Biên Hòa",
    "Giá sinh viên",
    "Phụ kiện chụp hình",
    "Âm thanh chất lượng",
  ],
  description:
    "JOZO Music Box - Không gian chill và giải trí hiện đại tại Biên Hòa. Trang bị âm thanh chuẩn studio, phụ kiện chụp hình xịn xò và photobooth miễn phí. Không gian riêng tư, hiện đại với giá cả phù hợp cho học sinh, sinh viên. Trải nghiệm giải trí tuyệt vời với chi phí hợp lý nhất tại Biên Hòa.",
  openGraph: {
    title: "JOZO Music Box - Music Box Biên Hòa",
    description:
      "Không gian chill và giải trí hiện đại - Phụ kiện miễn phí - Giá sinh viên",
    images: ["/images/jozo-thumbnail.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      nocache: true,
    },
  },
  verification: {
    google: "98YQhoi7X-ortJRFDLt2rR7atA-SHjjNkjak8wXSjHU",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
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
          <Nav currentUser={currentUser} />
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
