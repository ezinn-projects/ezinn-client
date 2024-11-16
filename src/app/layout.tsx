import Nav from "@/components/nav";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
<<<<<<< Updated upstream
import { unstable_after as after } from "next/server";
=======
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
>>>>>>> Stashed changes

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
  title: "Ezinn Homestay - Giá tốt, Chill & Free",
  description:
    "Ezinn Homestay - Không gian riêng tư với giá thành rẻ nhất, tận hưởng Netflix, chill n free, và trải nghiệm self check-in dễ dàng. Phù hợp cho các cặp đôi và người muốn tìm sự thư giãn riêng tư. Tận hưởng không gian như chính ngôi nhà của bạn với chi phí hợp lý.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Secondary task
  after(() => {
    console.log("Secondary task");
  });
  return (
    <html lang="en">
      <link rel="icon" href="/images/ezinn-logo.png" className="w-10 h-4" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="bg-black text-white py-4">
          <Nav />
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <footer className="bg-black text-white py-6">
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
              <p>
                Tận hưởng không gian riêng tư và dịch vụ đẳng cấp như ở Ezinn.
                Theo dõi chúng tôi trên mạng xã hội.
              </p>
              <div className="flex space-x-4 mt-2">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  className="hover:underline"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.tiktok.com/@ezinnhomestay"
                  target="_blank"
                  className="hover:underline"
                >
                  Tiktok
                </Link>
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  className="hover:underline"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
