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
  metadataBase: new URL("https://jozo.com.vn"),
  title: "JOZO Music Box - Music Box Biên Hòa",
  icons: {
    icon: "/images/jozo-logo.png",
    apple: "/images/jozo-logo.png",
    shortcut: "/images/jozo-logo.png",
  },
  keywords: [
    "JOZO Music Box",
    "Music Box Biên Hòa",
    "Norebang Hàn Quốc",
    "box giải trí giá rẻ",
    "music box sinh viên",
    "box riêng đẹp",
    "studio âm thanh",
    "giải trí Biên Hòa",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <link rel="icon" href="/images/jozo-logo.png" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}
      >
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
