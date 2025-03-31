import TestimonialCarousel from "@/components/carousel";
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

export default async function Home() {
  const rooms = await getRooms();

  console.log("rooms", rooms);

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
          {rooms.map((type) => (
            <Link
              key={type._id}
              href={`/rooms/${type.roomType}`}
              className="block group hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <div className="aspect-video relative">
                <Image
                  src={type.images[0] || `/default-${type.roomType}-room.jpg`}
                  alt={type.roomName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-2xl font-bold text-lightpink">
                  {type.roomName}
                </h2>
                <p className="text-gray-600 font-semibold">
                  {type.description}
                </p>
                <p className="mt-2 text-gray-700 min-h-[3rem]">
                  {`Diện tích: ${type.maxCapacity}m²`}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <p className="text-blue-600 font-semibold whitespace-nowrap">
                    Chỉ từ{" "}
                    {/* {Math.min(
                      ...type?.prices?.map((slot) => slot.price)
                    ).toLocaleString("vi-VN")} */}
                    đ/giờ
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
