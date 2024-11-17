import React from "react";
// import ImageGallery from "./components/ImageGallery";
import RoomInfo from "./components/room-info";
import { rooms } from "@/app/page"; // Import mock data
import { notFound } from "next/navigation";
import ImageGallery from "./components/image-gallery";
interface RoomDetailPageProps {
  params: { roomId: string };
}

const RoomDetailPage = ({ params }: RoomDetailPageProps) => {
  const roomId = parseInt(params.roomId, 10);
  const room = rooms.find((room) => room.id === roomId);

  if (!room) {
    return notFound(); // Trả về 404 nếu không tìm thấy phòng
  }

  return (
    <div>
      {/* Room Header */}
      <h1 className="text-4xl font-bold mb-2">{room.name}</h1>
      <p className="text-gray-600">Một không gian lý tưởng cho bạn</p>

      {/* Image Grid */}
      <div className="relative">
        <ImageGallery images={room.images} />

        {/* Nút Xem Tất Cả Hình */}
        <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">
          Xem tất cả hình
        </button>
      </div>

      {/* Room Info */}
      <RoomInfo
        name={room.name}
        description={room.description}
        originalPrice={room.originalPrice}
        discountedPrice={room.discountedPrice}
        amenities={room.amenities}
      />
    </div>
  );
};

export default RoomDetailPage;
