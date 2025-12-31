"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface RoomImageGalleryProps {
  images: string[];
  roomLabel: string;
}

export default function RoomImageGallery({
  images,
  roomLabel,
}: RoomImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageError = (src: string) => {
    setImageErrors((prev) => new Set(prev).add(src));
  };

  const validImages = images.filter((img) => !imageErrors.has(img));

  // Nếu không có ảnh nào, hiển thị placeholder
  if (validImages.length === 0) {
    return (
      <div className="mb-6">
        <div className="bg-gradient-to-br from-lightpink/20 to-pink-100 rounded-lg p-8 text-center shadow-md aspect-video flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-lightpink mb-2">
            {roomLabel}
          </h3>
          <p className="text-sm text-gray-600">
            Hình ảnh box sẽ được cập nhật sớm
          </p>
        </div>
      </div>
    );
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImage(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  // Framer Motion variants
  const imageVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -50 },
  };

  const dotVariants = {
    active: { scale: 1.3, backgroundColor: "#ec4899" },
    inactive: { scale: 1, backgroundColor: "#ffffff80" },
  };

  // Static render cho server-side
  if (!isClient) {
    return (
      <div className="mb-6">
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100">
          <div className="absolute top-3 right-3 bg-lightpink text-white px-4 py-2 z-20 rounded-lg font-bold text-sm shadow-md">
            {roomLabel}
          </div>
          <Image
            src={validImages[0]}
            alt={`${roomLabel} - Hình 1`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority
            onError={() => handleImageError(validImages[0])}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        {/* Carousel Container */}
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 group">
          {/* Room Label Badge */}
          <div className="absolute top-3 right-3 bg-lightpink text-white px-4 py-2 z-30 rounded-lg font-bold text-sm shadow-md">
            {roomLabel}
          </div>

          {/* Expand Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(validImages[currentImage]);
            }}
            className="absolute top-3 left-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-30"
            aria-label="Xem ảnh phóng to"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="absolute inset-0"
            >
              <Image
                src={validImages[currentImage]}
                alt={`${roomLabel} - Hình ${currentImage + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                priority={currentImage === 0}
                onError={() => handleImageError(validImages[currentImage])}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - chỉ hiện khi có nhiều hơn 1 hình */}
          {validImages.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Hình trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Hình tiếp theo"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}

          {/* Image Counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-lg z-30 font-medium">
              {currentImage + 1}/{validImages.length}
            </div>
          )}

          {/* Dots Indicator với Framer Motion */}
          {validImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
              {validImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToImage(index)}
                  className="w-2.5 h-2.5 rounded-full cursor-pointer"
                  variants={dotVariants}
                  animate={index === currentImage ? "active" : "inactive"}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  aria-label={`Xem hình ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal xem ảnh phóng to với animation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={roomLabel}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
