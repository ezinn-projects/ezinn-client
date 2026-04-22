"use client";

import Link from "next/link";
import Typography from "../ui/typography";
import { RoomType } from "@/types/room";
import { Calendar, Users } from "lucide-react";
import RoomImageCarousel from "./images-list";

/** Nhãn loại hiển thị nổi bật (badge + overlay ảnh) */
const TYPE_BADGE: Record<string, string> = {
  small: "S-Box",
  medium: "S-Box",
  large: "L-Box",
  dorm: "Dorm",
};

const BADGE_CLASS: Record<string, string> = {
  small:
    "bg-red-50 text-primary ring-1 ring-red-200/90 font-semibold tracking-tight",
  medium:
    "bg-primary/8 text-primary ring-1 ring-primary/20 font-semibold tracking-tight",
  large:
    "bg-primary/12 text-primary ring-1 ring-primary/25 font-semibold tracking-tight",
  dorm: "bg-primary/10 text-primary ring-1 ring-primary/25 font-semibold tracking-tight",
};

// Mapping số người / mô tả khu (dòng phụ dưới badge)
const CAPACITY_MAPPING: Record<string, string> = {
  small: "1-3 người · box",
  medium: "1-5 người · box",
  large: "6-8 người · box",
  dorm: "Nintendo Switch · dorm (Khu chung)",
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

  const typeBadge = TYPE_BADGE[room.type] || "Box";
  const badgeClass = BADGE_CLASS[room.type] ?? BADGE_CLASS.small;
  const capacityText = CAPACITY_MAPPING[room.type] || "Phòng riêng · xem mô tả";

  // Sử dụng minPrice từ props
  const displayPrice = minPrice || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image Section */}
      <RoomImageCarousel
        images={room.images || []}
        roomName={room.roomName || "Room"}
        roomType={typeBadge}
        fallbackImageKey={room.type}
      />

      {/* Content Section */}
      <div className="p-5">
        <Link href={bookingUrl} className="block">
          <div className="mb-2">
            <span
              className={`inline-block text-xs px-2.5 py-1 rounded-md ${badgeClass}`}
            >
              {typeBadge}
            </span>
          </div>
          <Typography as="h4" variant="semibold" className="mb-2 text-primary">
            {room.roomName}
          </Typography>

          <div className="flex items-start gap-2 mb-3">
            <Users className="w-4 h-4 mt-0.5 shrink-0 text-primary/50" />
            <span className="text-xs text-primary/70 leading-snug">
              {capacityText}
            </span>
          </div>

          <div className="mb-4">
            {displayPrice > 0 ? (
              <Typography
                as="p"
                variant="bold"
                className="text-primary text-lg"
              >
                Chỉ từ: {displayPrice.toLocaleString("vi-VN")}đ/giờ
              </Typography>
            ) : (
              <div className="text-center py-4">
                <Typography as="p" variant="bold" className="text-primary">
                  Liên hệ để biết giá
                </Typography>
              </div>
            )}
          </div>
        </Link>

        {/* Nút đặt box */}
        <Link
          href={bookingUrl}
          className="w-full bg-primary hover:bg-brand-hover text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors animate-buttonheartbeat flex items-center justify-center"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Đặt ngay
        </Link>
      </div>
    </div>
  );
}
