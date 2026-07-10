import type { Metadata } from "next";
import TestimonialCarousel from "@/components/carousel";
import RoomCard from "@/components/room-card/room-card";
import PromotionSection from "@/components/promotion-section";
import FloatingContactButtons from "@/components/floating-contact-buttons";
import { Price } from "@/types/price";
import { RoomType } from "@/types/room";
import { promotions } from "@/data/promotions";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "JOZO Music Box Biên Hòa | Box   giá sinh viên",
  description:
    "Đặt box riêng tư tại JOZO Biên Hòa: âm thanh studio, phụ kiện chụp hình miễn phí, giá sinh viên. Đặt online để giữ chỗ.",
  keywords: [
    "jozo",
    "music box",
    "music box biên hòa",
    "box style hàn quốc",
    "music box giá sinh viên",
    "đặt phòng music box",
    "box riêng tư",
    "phụ kiện chụp hình",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JOZO Music Box Biên Hòa | Box   giá sinh viên",
    description:
      "Không gian box   âm thanh studio, phụ kiện chụp hình miễn phí. Đặt online để giữ chỗ tại JOZO Biên Hòa.",
    url: "/",
    images: ["/images/jozo-thumbnail.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOZO Music Box Biên Hòa | Box   giá sinh viên",
    description:
      "Box   âm thanh studio, phụ kiện chụp hình miễn phí. Đặt online để giữ chỗ tại JOZO Biên Hòa.",
    images: ["/images/jozo-thumbnail.jpg"],
  },
};

async function getRooms(): Promise<RoomType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/room-types`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
}

async function getPrices(): Promise<Price[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/price`, {
    // Cache trong 5 phút để tránh gọi API nhiều lần
    next: { revalidate: 300 },
  });
  const data = await response.json();
  return data.data;
}

function roomGridLayoutClass(count: number): string {
  if (count <= 0) return "";
  if (count === 1) {
    return "grid gap-6 grid-cols-1 max-w-md mx-auto w-full";
  }
  if (count === 2) {
    return "grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto w-full";
  }
  if (count === 4) {
    return "grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto w-full";
  }
  return "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full";
}

export default async function Home() {
  const rooms = await getRooms();
  const prices = await getPrices();

  const displayRooms = rooms
    .filter((room) => room.type !== "small")
    .sort((a, b) => {
      const typeOrder: Record<string, number> = {
        medium: 1,
        large: 2,
        dorm: 3,
      };
      const orderA = typeOrder[a.type] ?? 99;
      const orderB = typeOrder[b.type] ?? 99;
      return orderA - orderB;
    });

  // Hàm helper để lấy giá thấp nhất cho từng loại box
  const getMinPriceForRoomType = (roomType: string, prices: Price[]) => {
    let minPrice = Infinity;

    prices.forEach((priceRule) => {
      priceRule.time_slots.forEach((timeSlot) => {
        timeSlot.prices.forEach((roomPrice) => {
          if (roomPrice.room_type === roomType) {
            minPrice = Math.min(minPrice, roomPrice.price);
          }
        });
      });
    });

    return minPrice === Infinity ? 0 : minPrice;
  };

  return (
    <>
      <div className="w-full">
        {/* Hero Section với Slider */}
        <TestimonialCarousel />

        {/* Promotion Section */}
        <PromotionSection promotions={promotions} />

        {/* Room Types Section */}
        <section
          id="booking"
          className="mb-10 sm:mb-16 border border-border bg-gradient-to-b from-card to-muted/60 p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-sm"
        >
          <div className="max-w-6xl mx-auto">
            {displayRooms.length > 0 && (
              <div className={roomGridLayoutClass(displayRooms.length)}>
                {displayRooms.map((room, index) => {
                  const minPrice = getMinPriceForRoomType(room.type, prices);
                  return (
                    <div
                      key={room._id}
                      className="min-w-0"
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <RoomCard room={room} minPrice={minPrice} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
      <FloatingContactButtons />
    </>
  );
}
