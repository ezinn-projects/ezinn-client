"use client";

import Link from "next/link";
import Typography from "../ui/typography";
import { RoomType } from "@/types/room";
import { Calendar, Users } from "lucide-react";
import RoomImageCarousel from "./images-list";

// Mapping tên box
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
  // Chuyển đổi room type từ format cũ sang mới để tạo href
  const bookingUrl = `/${room.type}`;

  const roomSizeName = ROOM_NAME_MAPPING[room.type] || "Standard";
  const capacityText = CAPACITY_MAPPING[room.type] || "1-3 người";

  // Sử dụng minPrice từ props
  const displayPrice = minPrice || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image Section */}
      <RoomImageCarousel
        images={room.images || []}
        roomName={room.roomName || "Room"}
        roomType={roomSizeName}
      />

      {/* Content Section */}
      <div className="p-5">
        <Link href={bookingUrl} className="block">
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

          <div className="mb-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded">
              Ưu đãi đặt trước: -10% (T2-T6) / -5% (T7-CN)
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
              <div className="text-center py-4">
                <Typography as="p" variant="bold" className="text-lightpink">
                  Liên hệ để biết giá
                </Typography>
              </div>
            )}
          </div>
        </Link>

        {/* Nút đặt box */}
        <Link
          href={bookingUrl}
          className="w-full bg-lightpink hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-colors animate-buttonheartbeat flex items-center justify-center"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Đặt ngay
        </Link>
      </div>
    </div>
  );
}
