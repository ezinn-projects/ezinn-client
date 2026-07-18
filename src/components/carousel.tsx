"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Banner = {
  image: string;
  alt: string;
  href?: string;
  /** Display width of the image inside aspect-video + object-contain (not the container). */
  sizes: string;
};

const banners: Banner[] = [
  {
    image: "/images/member-poster-final.webp",
    alt: "Đăng ký thành viên Jozo — Giảm ngay 10% từ 10/7/2026",
    href: "/membership",
    // Portrait 3:4 in 16:9 frame ≈ 42% of container width (~450px at max-w-6xl)
    sizes: "(min-width: 1024px) 485px, (min-width: 640px) 40vw, 45vw",
  },
  {
    image: "/images/price-list.png",
    alt: "Bảng giá Jozo — Music Box / Nintendo và Board Game",
    // Landscape ~1.41 ratio in 16:9 frame ≈ 79% of container width
    sizes: "(min-width: 1024px) 915px, (min-width: 640px) 75vw, 85vw",
  },
];

const imageWrapperClass =
  "relative w-full aspect-video overflow-hidden rounded-none sm:rounded-lg bg-primary/10";

function BannerSlide({
  banner,
  priority,
}: {
  banner: Banner;
  priority?: boolean;
}) {
  return (
    <div className={imageWrapperClass}>
      <Image
        src={banner.image}
        alt={banner.alt}
        fill
        sizes={banner.sizes}
        className="object-contain"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}

function BannerLink({
  banner,
  priority,
}: {
  banner: Banner;
  priority?: boolean;
}) {
  const slide = <BannerSlide banner={banner} priority={priority} />;
  if (!banner.href) return slide;
  return (
    <Link href={banner.href} className="block w-full" aria-label={banner.alt}>
      {slide}
    </Link>
  );
}

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentBanner]);

  const goTo = (index: number) => {
    setCurrentBanner(((index % banners.length) + banners.length) % banners.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) goTo(currentBanner + 1);
    else if (distance < -40) goTo(currentBanner - 1);
  };

  return (
    <section className="pb-6 sm:pb-8 md:pb-12 -mx-3 sm:mx-0">
      <div className="w-full max-w-6xl mx-auto">
        <div
          className="relative w-full touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.image}
              className={cn(
                "transition-opacity duration-500 ease-in-out",
                index === currentBanner
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 opacity-0",
              )}
              aria-hidden={index !== currentBanner}
            >
              <BannerLink banner={banner} priority={index === 0} />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Banner ${index + 1}`}
              className={cn(
                "mx-1 h-2 w-2 cursor-pointer rounded-full transition-transform",
                index === currentBanner
                  ? "scale-125 bg-zinc-700"
                  : "bg-gray-300",
              )}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;
