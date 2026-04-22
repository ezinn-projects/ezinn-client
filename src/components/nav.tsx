"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DesktopMenu from "./desktop-nav";
import MobileMenu from "./mobile-nav";

export default function Nav() {
  const [showHeader, setShowHeader] = useState(true); // Trạng thái hiển thị header
  const [isClient, setIsClient] = useState(false); // Kiểm tra client-side
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Tham chiếu timeout để kiểm tra dừng cuộn

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Luôn hiện header khi ở đỉnh
      if (currentScrollY === 0) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }

      // Đặt timeout để hiện header sau khi dừng cuộn
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        if (currentScrollY !== 0) {
          setShowHeader(true);
        }
      }, 300); // Hiện header sau 300ms
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [isClient]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`mx-auto px-4 bg-white border-b border-red-100/80 text-primary shadow-sm transition-all duration-500 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container h-24 mx-auto flex justify-between items-center max-w-7xl px-4">
          <div className="flex-1">
            <Link href="/" className="inline-block">
              {/* Desktop Logo */}
              <Image
                src="/images/jozo-logo.png"
                alt="JOZO Music Box"
                width={120}
                height={30}
                className="hidden md:block"
              />
              {/* Mobile Logo */}
              <Image
                src="/images/jozo-logo.png"
                alt="JOZO Music Box"
                width={80}
                height={20}
                className="block md:hidden"
              />
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <DesktopMenu />
          </div>

          <div className="flex-1 flex justify-end">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </div>
  );
}
