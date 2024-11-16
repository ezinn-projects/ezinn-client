"use client";

import Image from "next/image";
import DesktopMenu from "./desktop-nav";
import TabletMenu from "./tablet-nav";
import MobileMenu from "./mobile-nav";
import { useState, useEffect, useRef } from "react";

export default function Nav() {
  const [showHeader, setShowHeader] = useState(false); // Trạng thái hiển thị header
  const [scrollY, setScrollY] = useState(0); // Theo dõi vị trí cuộn
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Tham chiếu timeout để kiểm tra dừng cuộn

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

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
    <nav
      className={`container mx-auto flex justify-between items-center px-4 fixed top-0 left-0 right-0 bg-black text-white z-50 transition-transform duration-500 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } ${scrollY > 0 ? "backdrop-blur-md bg-opacity-40" : "bg-opacity-100"}`}
    >
      <div className="text-2xl font-bold">
        {/* Desktop Logo */}
        <Image
          src="/images/ezinn-logo.png"
          alt="Ezinn Homestay"
          width={120}
          height={30}
          className="hidden md:block"
        />
        {/* Mobile Logo */}
        <Image
          src="/images/ezinn-logo.png"
          alt="Ezinn Homestay"
          width={80}
          height={20}
          className="block md:hidden"
        />
      </div>
      <DesktopMenu />
      <TabletMenu />
      <MobileMenu />
    </nav>
  );
}
