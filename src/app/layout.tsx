import NavWithUser from "@/components/nav-with-user";
import BoardGameNeonBackground from "@/components/ui/board-game-neon-background";
import TwoColumnFooter from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
import { jozoServicesSeoDescription } from "@/data/services";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import Nav from "@/components/nav";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jozo.com.vn"),
  title: "JOZO Biên Hòa | Music Box, Nintendo Switch & Board Game",
  icons: {
    icon: "/images/jozo-logo-sm.png",
    apple: "/images/jozo-logo-sm.png",
    shortcut: "/images/jozo-logo-sm.png",
  },
  keywords: [
    "JOZO",
    "music box biên hòa",
    "nintendo switch biên hòa",
    "board game biên hòa",
    "box riêng tư",
    "phụ kiện chụp hình",
    "giải trí biên hòa",
    "giá sinh viên",
  ],
  description: jozoServicesSeoDescription,
  openGraph: {
    title: "JOZO Biên Hòa | Music Box, Nintendo Switch & Board Game",
    description: jozoServicesSeoDescription,
    images: ["/images/jozo-thumbnail.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground antialiased`}
      >
        <BoardGameNeonBackground
          className="fixed inset-0 z-0"
          tileSize={320}
          patternOpacity={0.18}
          animated
        />

        {/* Header */}
        <header className="relative z-[9999]">
          <Suspense fallback={<Nav currentUser={null} />}>
            <NavWithUser />
          </Suspense>
        </header>

        {/* Main */}
        <main className="relative z-10 mx-auto w-full max-w-7xl flex-grow px-3 sm:px-5 md:px-8 lg:px-10 mt-24 sm:mt-28 md:mt-32 mb-6 sm:mb-8">
          {children}
        </main>

        {/* Footer */}
        <div className="relative z-10">
          <TwoColumnFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
