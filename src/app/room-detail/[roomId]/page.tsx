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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = (await params).roomId;
  const room = rooms.find((room) => room.id === parseInt(roomId, 10));

  if (!room) {
    return {
      title: "Room not found - Ezinn Homestay",
      description:
        "The room you are looking for does not exist. Please try again.",
    };
  }

  return {
    title: room.name,
    description: room.description,
    openGraph: {
      title: room.name,
      description: room.description,
      images: [room.images[0]], // Hình ảnh chính làm preview
    },
    twitter: {
      card: "summary_large_image",
      title: room.name,
      description: room.description,
      images: [room.images[0]],
    },
  };
}

// Component chính của trang chi tiết phòng
const RoomDetailPage = async ({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) => {
  const roomId = (await params).roomId;
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
