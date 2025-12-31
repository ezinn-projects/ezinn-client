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
  title: "JOZO Music Box Biên Hòa | Box hát riêng tư, giá sinh viên",
  description:
    "Đặt box hát riêng tư tại JOZO Biên Hòa: âm thanh studio, photobooth miễn phí, phụ kiện chụp hình, giá sinh viên. Đặt trước online để giữ chỗ và nhận ưu đãi.",
  keywords: [
    "jozo",
    "music box",
    "karaoke biên hòa",
    "box hát hàn quốc",
    "karaoke giá sinh viên",
    "đặt phòng karaoke",
    "box riêng tư",
    "photobooth miễn phí",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JOZO Music Box Biên Hòa | Box hát riêng tư, giá sinh viên",
    description:
      "Không gian box hát riêng tư, âm thanh studio, phụ kiện chụp hình miễn phí. Đặt trước online để giữ chỗ và nhận ưu đãi tại JOZO Biên Hòa.",
    url: "/",
    images: ["/images/jozo-thumbnail.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOZO Music Box Biên Hòa | Box hát riêng tư, giá sinh viên",
    description:
      "Box hát riêng tư, âm thanh xịn, photobooth miễn phí. Đặt trước online để giữ chỗ và nhận ưu đãi tại JOZO Biên Hòa.",
    images: ["/images/jozo-thumbnail.jpg"],
  },
};

async function getRooms(): Promise<RoomType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/room-types`,
    {
      cache: "no-store",
    }
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

export default async function Home() {
  const rooms = await getRooms();
  const prices = await getPrices();

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
      <div className="container mx-auto px-4">
        {/* Hero Section với Slider */}
        <TestimonialCarousel />

        {/* Promotion Section */}
        <PromotionSection promotions={promotions} />

        {/* Room Types Section */}
        <section
          id="booking"
          className="mb-16 bg-gradient-to-br from-pink-50 to-rose-100 p-8 rounded-2xl shadow-lg"
        >
          {/* Room Types Preview */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 mb-8">
            {rooms
              .sort((a, b) => {
                const typeOrder = { small: 1, medium: 2, large: 3 };
                const orderA = typeOrder[a.type as keyof typeof typeOrder] || 0;
                const orderB = typeOrder[b.type as keyof typeof typeOrder] || 0;
                return orderA - orderB;
              })
              .map((room, index) => {
                const minPrice = getMinPriceForRoomType(room.type, prices);
                return (
                  <div
                    key={room._id}
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <RoomCard room={room} minPrice={minPrice} />
                  </div>
                );
              })}
          </div>
        </section>
      </div>
      <FloatingContactButtons />
    </>
  );
}
