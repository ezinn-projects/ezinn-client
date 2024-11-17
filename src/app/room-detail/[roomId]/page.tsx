import { rooms } from "@/mock";
import { notFound } from "next/navigation";
import ImageGallery from "./components/image-gallery";
import RoomInfo from "./components/room-info";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return rooms.map((room) => ({
    roomId: room.id.toString(),
  }));
}

// Hàm `generateMetadata` cho SEO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const { roomId } = await params;

  const room = rooms.find((room) => room.id === parseInt(roomId, 10));

  return {
    title: room ? room.name : "Room not found",
    description: room
      ? room.description
      : "The room you are looking for does not exist.",
  };
}

// Component chính của trang chi tiết phòng
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoomDetailPage = async ({ params }: any) => {
  const { roomId = "" } = await params;

  //   const roomId = parseInt(params.roomId, 10); // Không cần await
  const room = rooms.find((room) => room.id === parseInt(roomId, 10));

  if (!room) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{room.name}</h1>

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
