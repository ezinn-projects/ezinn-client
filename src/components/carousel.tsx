"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Banner = {
  image: string;
  alt: string;
  href?: string;
};

const banners: Banner[] = [
  {
    image: "/images/member-poster-final.png",
    alt: "Đăng ký thành viên Jozo — Giảm ngay 10% từ 10/7/2026",
    href: "/membership",
  },
  {
    image: "/images/price-list.png",
    alt: "Bảng giá Jozo — Music Box / Nintendo và Board Game",
  },
];

const imageWrapperClass =
  "relative w-full aspect-video overflow-hidden rounded-none sm:rounded-lg bg-primary";

function BannerSlide({ banner, priority }: { banner: Banner; priority?: boolean }) {
  return (
    <div className={imageWrapperClass}>
      <div className="absolute inset-0">
        <Image
          src={banner.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 4rem), 100vw"
          className="object-cover blur-2xl scale-110 opacity-60"
          aria-hidden
          priority={priority}
        />
      </div>
      <div className="relative z-10 h-full w-full">
        <Image
          src={banner.image}
          alt={banner.alt}
          fill
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-contain"
          priority={priority}
        />
      </div>
    </div>
  );
}

function BannerLink({ banner, priority }: { banner: Banner; priority?: boolean }) {
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isClient]);

  const banner = banners[currentBanner];

  const variants = {
    initial: { opacity: 0, y: "100%", scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: "100%", scale: 0.1 },
  };
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: "#3f3f46" },
    inactive: { scale: 1, backgroundColor: "#D1D5DB" },
  };

  if (!isClient) {
    return (
      <section className="pb-6 sm:pb-8 md:pb-12 -mx-3 sm:mx-0">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex w-full items-center justify-center">
            <BannerLink banner={banners[0]} priority />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-6 sm:pb-8 md:pb-12 -mx-3 sm:mx-0">
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBanner}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="flex w-full items-center justify-center"
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          >
            <BannerLink banner={banner} priority />
          </motion.div>
          <div className="mt-8 flex justify-center">
            {banners.map((_, index) => (
              <motion.div
                key={index}
                className="mx-1 h-2 w-2 cursor-pointer rounded-full"
                variants={dotVariants}
                animate={index === currentBanner ? "active" : "inactive"}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BannerCarousel;
