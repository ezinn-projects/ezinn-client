"use client";

import ChevronLeftIcon from "@/assets/icons/chevron-left.icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeartIcon, ShareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

/**
 * Header for room detail page
 * @returns
 */
function Header() {
  const [opacity, setOpacity] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Tính toán độ mờ dựa trên chỉ số scroll
      const scrollTop = window.scrollY;
      const maxScroll = 100; // Chiều cao tối đa để đạt độ mờ 1
      const newOpacity = Math.min(scrollTop / maxScroll, 1);
      setOpacity(newOpacity);
    };

    // Lắng nghe sự kiện scroll
    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300 flex items-center justify-between container py-3"
      )}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      }}
    >
      <Button
        className="bg-white text-black rounded-full w-8 h-8"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>

      <div className="flex items-center gap-x-3">
        <Button className="bg-white text-black rounded-full w-8 h-8">
          <ShareIcon />
        </Button>

        <Button className="bg-white text-black rounded-full w-8 h-8">
          <HeartIcon />
        </Button>
      </div>
    </div>
  );
}

export default Header;
