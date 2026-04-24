"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GlowLine from "./ui/glow-line";
import DesktopMenu from "./desktop-nav";
import MobileMenu from "./mobile-nav";

export default function Nav() {
  const [showHeader, setShowHeader] = useState(true); // Trạng thái hiển thị header
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Tham chiếu timeout để kiểm tra dừng cuộn

  useEffect(() => {
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
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <nav
        className={`relative mx-auto overflow-hidden border-b border-primary/20 bg-background/45 px-4 text-primary shadow-[0_10px_35px_hsl(var(--primary)/0.12)] backdrop-blur-xl transition-all duration-500 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <GlowLine
          orientation="horizontal"
          position="0"
          color="red"
          className="opacity-85"
        />
        <GlowLine
          orientation="horizontal"
          position="calc(100% - 1px)"
          color="red"
          className="opacity-70"
        />
        <span
          aria-hidden
          className="nav-red-beam pointer-events-none absolute -top-9 left-[-45%] h-20 w-[46%] rounded-full"
        />
        <span
          aria-hidden
          className="nav-red-reflection pointer-events-none absolute -bottom-12 left-[-42%] h-24 w-[42%] rounded-full"
        />
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
