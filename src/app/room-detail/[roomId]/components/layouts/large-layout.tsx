import { Room } from "@/mock";
import ImageGallery from "../image-gallery";
import RoomInfo from "../room-info";

function LargeLayout({ room }: { room: Room }) {
  return (
    <div className="hidden md:block container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{room.name}</h1>

      {/* Image Grid - table & desktop */}
      <div className="relative hidden md:block">
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
}

export default LargeLayout;
