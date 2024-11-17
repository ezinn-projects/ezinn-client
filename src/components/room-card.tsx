import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className="product border border-black p-4 rounded-lg hover:shadow-lg transition-shadow">
      <div>
        <Image
          src={room.images[0]} // Luôn hiển thị hình ảnh đầu tiên
          alt={room.name}
          width={250}
          height={150}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <h2 className="text-xl font-bold mt-4 text-black dark:text-white">
        {room.name}
      </h2>
      <p className="text-gray-600 line-through">Giá cũ: {room.originalPrice}</p>
      <p className="text-black font-semibold dark:text-white">
        Giá khuyến mãi: {room.discountedPrice}
      </p>
      <Link
        href={`/room-detail/${room.id}`} // Sử dụng dynamic URL
        className="mt-4 inline-block px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}
