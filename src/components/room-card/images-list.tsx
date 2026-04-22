"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RoomImageCarouselProps {
  images: string[];
  roomName: string;
  roomType: string;
  /** Slug API (vd: small, dorm) — dùng cho ảnh mặc định /images/room-{slug}.jpg */
  fallbackImageKey?: string;
}

export default function RoomImageCarousel({
  images,
  roomName,
  roomType,
  fallbackImageKey,
}: RoomImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Nếu không có hình ảnh, sử dụng hình mặc định
  const imageSlug = fallbackImageKey ?? roomType;
  const displayImages =
    images && images.length > 0 ? images : [`/images/room-${imageSlug}.jpg`];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      ref={containerRef}
      className="aspect-video relative group cursor-grab active:cursor-grabbing select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setTouchStart(null);
        setTouchEnd(null);
      }}
    >
      {/* Room Type Badge */}
      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 z-20 rounded-bl-lg font-bold">
        {roomType}
      </div>

      {/* Main Image */}
      <Image
        src={displayImages[currentImage]}
        alt={`${roomName} - Hình ${currentImage + 1}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Navigation Arrows - chỉ hiện khi có nhiều hơn 1 hình */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/50 hover:bg-primary/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Hình trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/50 hover:bg-primary/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Hình tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots Indicator - chỉ hiện khi có nhiều hơn 1 hình */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
          {displayImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Xem hình ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {displayImages.length > 1 && (
        <div className="absolute top-2 left-2 bg-primary/55 text-primary-foreground text-xs px-2 py-1 rounded z-10">
          {currentImage + 1}/{displayImages.length}
        </div>
      )}
    </div>
  );
}
