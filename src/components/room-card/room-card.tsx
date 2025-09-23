"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Typography from "../ui/typography";
import { RoomType } from "@/types/room";
import { Button } from "../ui/button";
import { Calendar, Users } from "lucide-react";
import Image from "next/image";

// Mapping từ room type cũ sang mới
const ROOM_TYPE_MAPPING: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

// Mapping tên phòng
const ROOM_NAME_MAPPING: Record<string, string> = {
  small: "Mini Squad",
  medium: "Party Zone",
  large: "Mega Squad",
};

// Mapping số người
const CAPACITY_MAPPING: Record<string, string> = {
  small: "1-3 người",
  medium: "4-5 người",
  large: "6-8 người",
};

export default function RoomCard({
  room,
  minPrice,
}: {
  room: RoomType;
  minPrice: number;
}) {
  const router = useRouter();

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Chuyển đổi room type từ format cũ sang mới
    const newRoomType = ROOM_TYPE_MAPPING[room.type] || "Small";

    // Redirect đến trang booking với roomType parameter
    router.push(`/booking?roomType=${newRoomType}`);
  };

  const roomSizeName = ROOM_NAME_MAPPING[room.type] || "Standard";
  const capacityText = CAPACITY_MAPPING[room.type] || "1-3 người";

  // Sử dụng minPrice từ props thay vì từ room.prices
  const displayPrice = minPrice || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image Section */}
      <div className="aspect-video relative">
        <div className="absolute top-0 right-0 bg-lightpink text-white px-3 py-1 z-10 rounded-bl-lg font-bold">
          {roomSizeName}
        </div>
        <Image
          src={
            room.images && room.images.length > 0
              ? room.images[0]
              : `/images/room-${room.type}.jpg`
          }
          alt={room.roomName || "Room Image"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        <Link href={`/room-detail/${room._id}`} className="block">
          <Typography
            as="h4"
            variant="semibold"
            className="mb-2 text-lightpink"
          >
            {room.roomName}
          </Typography>

          <div className="flex items-center mb-3">
            <Users className="w-4 h-4 mr-1 text-gray-500" />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {capacityText}
            </span>
          </div>

          <div className="mb-4">
            {displayPrice > 0 ? (
              <Typography
                as="p"
                variant="bold"
                className="text-lightpink text-lg"
              >
                Chỉ từ: {displayPrice.toLocaleString("vi-VN")}đ/giờ
              </Typography>
            ) : (
              <Typography as="p" variant="bold" className="text-lightpink">
                Liên hệ để biết giá
              </Typography>
            )}
          </div>
        </Link>

        {/* Nút đặt phòng */}
        <Button
          onClick={handleBookNow}
          className="w-full bg-lightpink hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors animate-buttonheartbeat"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Đặt ngay
        </Button>
      </div>
    </div>
  );
}
