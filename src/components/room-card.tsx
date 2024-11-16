"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Room {
  id: number;
  name: string;
  images: string[];
  originalPrice: string;
  discountedPrice: string;
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % room.images.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hovered, room.images.length]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <motion.div
      className="product border border-black p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        key={room.images[currentImageIndex]}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={room.images[currentImageIndex]}
          alt={room.name}
          width={250}
          height={150}
          className="w-full h-auto rounded-lg"
        />
      </motion.div>
      <h2 className="text-xl font-bold mt-4 text-black">{room.name}</h2>
      <p className="text-gray-600 line-through">Giá cũ: {room.originalPrice}</p>
      <p className="text-black font-semibold">
        Giá khuyến mãi: {room.discountedPrice}
      </p>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
        Xem chi tiết
      </button>
    </motion.div>
  );
}
