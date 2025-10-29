import { getRoomDataByType } from "@/lib/data-cache";
import BookingForm from "@/components/booking-form";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Price } from "@/types/price";

type RoomType = "Small" | "Medium" | "Large";

// Room type mapping from URL params
const ROOM_TYPE_MAPPING: Record<string, RoomType> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

// Room type labels for SEO
const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  Small: "S-Box (1-3 người)",
  Medium: "M-Box (4-5 người)",
  Large: "L-Box (6-8 người)",
};

interface BookingPageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { type } = await params;
  const roomType = ROOM_TYPE_MAPPING[type];

  if (!roomType) {
    return {
      title: "Không tìm thấy loại phòng",
    };
  }

  const roomLabel = ROOM_TYPE_LABELS[roomType];

  return {
    title: `Đặt ${roomLabel} - Jozo`,
    description: `Đặt ${roomLabel} tại Jozo. Chọn thời gian phù hợp và đặt box ngay hôm nay!`,
    keywords: `đặt ${roomLabel.toLowerCase()}, jozo, ${roomLabel.toLowerCase()}`,
  };
}

async function getPrices(): Promise<Price[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/price`, {
    // Cache trong 5 phút để tránh gọi API nhiều lần
    next: { revalidate: 300 },
  });
  const data = await response.json();
  return data.data;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { type } = await params;

  const prices = await getPrices();

  // Validate room type
  const roomType = ROOM_TYPE_MAPPING[type];

  if (!roomType) {
    notFound();
  }

  // Fetch room data and prices from server
  const roomData = await getRoomDataByType(roomType);

  if (!roomData) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <BookingForm roomType={roomType} prices={prices} />
    </div>
  );
}
