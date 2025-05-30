import TestimonialCarousel from "@/components/carousel";
import { Price } from "@/types/price";
import { RoomType } from "@/types/room";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/price`);
  const data = await response.json();
  return data.data;
}

export default async function Home() {
  const rooms = await getRooms();
  const prices = await getPrices();

  // console.log("rooms", rooms);
  // console.log("prices", prices);

  // Hàm helper để lấy giá thấp nhất cho từng loại phòng
  const getMinPriceForRoomType = (roomType: string) => {
    let minPrice = Infinity;

    prices.forEach((price) => {
      console.log("price", price);
      price.time_slots?.forEach((slot) => {
        const roomPrice = slot.prices.find(
          (p: { room_type: string; price: number }) => p.room_type === roomType
        );
        if (roomPrice && roomPrice.price < minPrice) {
          minPrice = roomPrice.price;
        }
      });
    });

    return minPrice !== Infinity ? minPrice : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section với Slider */}
      <TestimonialCarousel />

      {/* Promotion Section */}

      {/* Room Types Section */}
      <section className="mb-16 bg-red-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-lightpink">
          Jozo có 3 loại phòng
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {rooms
            .sort((a, b) => {
              // Sắp xếp theo loại phòng (small, medium, large)
              const typeOrder = { small: 1, medium: 2, large: 3 };
              const orderA = typeOrder[a.type as keyof typeof typeOrder] || 0;
              const orderB = typeOrder[b.type as keyof typeof typeOrder] || 0;
              return orderA - orderB;
            })
            .map((type) => {
              // Đặt tên theo loại phòng
              let roomSizeName = "Standard";
              if (type.type === "small") {
                roomSizeName = "Mini Squad";
              } else if (type.type === "medium") {
                roomSizeName = "Party Zone";
              } else if (type.type === "large") {
                roomSizeName = "Mega Squad";
              }

              // Xác định số người
              let capacityText = "1-3 homies";
              if (type.type === "medium") {
                capacityText = "4-5 homies";
              } else if (type.type === "large") {
                capacityText = "6-8 homies";
              }

              // Lấy giá thấp nhất cho loại phòng này từ dữ liệu prices
              const minPrice = getMinPriceForRoomType(type.type);

              return (
                <div
                  key={type._id}
                  className="block group hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="aspect-video relative">
                    <div className="absolute top-0 right-0 bg-lightpink text-white px-3 py-1 z-10 rounded-bl-lg font-bold">
                      {roomSizeName}
                    </div>
                    <Image
                      src={
                        type.images && type.images.length > 0
                          ? type.images[0]
                          : `/images/room-${type.type}.jpg`
                      }
                      alt={type.roomName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <h2 className="text-2xl font-bold text-lightpink mb-2">
                      {type.roomName}
                    </h2>
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {capacityText}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                      <p className="text-blue-600 font-bold text-lg whitespace-nowrap">
                        Chỉ từ{" "}
                        {minPrice > 0
                          ? minPrice.toLocaleString("vi-VN")
                          : "---"}{" "}
                        đ/giờ
                      </p>
                      <Link
                        href={`/booking?roomType=${type.type}`}
                        className="bg-lightpink text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition animate-buttonheartbeat whitespace-nowrap font-bold"
                      >
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section className="mb-16 bg-red-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-lightpink">
          Ưu đãi đặc biệt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-center text-lightpink">
              Khai trương giảm giá
            </h3>
            <p className="text-gray-600">
              Giảm 50% cho tất cả các phòng từ ngày 19/04 đến 25/04
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md"></div>
        </div>
      </section>
    </div>
  );
}
