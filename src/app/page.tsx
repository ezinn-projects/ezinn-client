import TestimonialCarousel from "@/components/carousel";
import { Room } from "@/types/room";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getRooms(): Promise<Room[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
    cache: "no-store",
  });

  const data = await response.json();
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
}

export default async function Home() {
  const rooms = await getRooms();

  // Tạo thông tin cho 3 loại phòng
  const roomTypes = [
    {
      id: "small",
      title: "Phòng nhỏ",
      capacity: "Dành cho 1-3 người",
      description: "Dành cho cá nhân hoặc nhóm nhỏ muốn không gian riêng tư",
      image:
        rooms.find((room) => room.maxCapacity <= 3)?.images[0] ||
        "/default-small-room.jpg",
      price: Math.min(
        ...rooms
          .filter((room) => room.maxCapacity <= 3)
          .flatMap((room) => room.prices.map((p) => p.price))
      ),
    },
    {
      id: "medium",
      title: "Phòng vừa",
      capacity: "Dành cho 4-6 người",
      description: "Dành cho nhóm bạn hoặc gia đình muốn không gian thoải mái",
      image:
        rooms.find((room) => room.maxCapacity >= 4 && room.maxCapacity <= 6)
          ?.images[0] || "/default-medium-room.jpg",
      price:
        Math.min(
          ...rooms
            .filter((room) => room.maxCapacity >= 4 && room.maxCapacity <= 6)
            .flatMap((room) => room.prices.map((p) => p.price))
        ) || 80000,
    },
    {
      id: "large",
      title: "Phòng lớn",
      capacity: "Dành cho 7-10 người",
      description: "Dành cho nhóm lớn, họp công ty hoặc tổ chức tiệc",
      image:
        rooms.find((room) => room.maxCapacity >= 7)?.images[0] ||
        "/default-large-room.jpg",
      price:
        Math.min(
          ...rooms
            .filter((room) => room.maxCapacity >= 7)
            .flatMap((room) => room.prices.map((p) => p.price))
        ) || 120000,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section với Slider */}
      <TestimonialCarousel />

      {/* Promotion Section */}

      {/* Room Types Section */}
      <section className="mb-16 bg-red-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-lightpink">
          Các loại phòng
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {roomTypes.map((type) => (
            <Link
              key={type.id}
              href={`/rooms/${type.id}`}
              className="block group hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <div className="aspect-video relative">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-2xl font-bold text-lightpink">
                  {type.title}
                </h2>
                <p className="text-gray-600 font-semibold">{type.capacity}</p>
                <p className="mt-2 text-gray-700 min-h-[3rem]">
                  {type.description}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <p className="text-blue-600 font-semibold whitespace-nowrap">
                    Chỉ từ {type.price.toLocaleString("vi-VN")}đ/giờ
                  </p>
                  <button className="bg-lightpink text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition animate-buttonheartbeat whitespace-nowrap">
                    Đặt phòng ngay
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16 bg-red-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-lightpink">
          Ưu đãi đặc biệt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-lightpink">
              Khai trương giảm giá
            </h3>
            <p className="text-gray-600">
              Giảm 20% cho tất cả các phòng từ 10h-17h
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-lightpink">
              Ưu đãi sinh nhật
            </h3>
            <p className="text-gray-600">
              Tặng 2 giờ hát cho nhóm trên 6 người
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-lightpink">
              Khách hàng thân thiết
            </h3>
            <p className="text-gray-600">Tích điểm đổi quà hấp dẫn</p>
          </div>
        </div>
      </section>
    </div>
  );
}
