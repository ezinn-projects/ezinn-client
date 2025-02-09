"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const banners = [
  {
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg",
    alt: "Banner 1",
  },
  {
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg",
    alt: "Banner 2",
  },
  {
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg",
    alt: "Banner 3",
  },
  {
    image:
      "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
    alt: "Banner 4",
  },
];

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { image, alt } = banners[currentBanner];

  const variants = {
    initial: { opacity: 0, y: "100%", scale: 0.1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: "100%", scale: 0.1 },
  };
  const dotVariants = {
    active: { scale: 1.2, backgroundColor: "#3f3f46" },
    inactive: { scale: 1, backgroundColor: "#D1D5DB" },
  };

  return (
    <section className="py-12 md:py-24">
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
            <Image
              src={image}
              alt={alt}
              className="w-full h-auto rounded-lg"
              width={1200}
              height={400}
              priority
            />
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
