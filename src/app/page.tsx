import RoomCard from "@/components/room-card";

const rooms = [
  {
    id: 1,
    name: "Phòng Deluxe",
    images: [
      "https://via.placeholder.com/250",
      "https://via.placeholder.com/251",
      "https://via.placeholder.com/252",
    ],
    originalPrice: "500,000 đ/giờ",
    discountedPrice: "450,000 đ/giờ",
  },
  {
    id: 2,
    name: "Phòng Studio",
    images: [
      "https://via.placeholder.com/260",
      "https://via.placeholder.com/261",
      "https://via.placeholder.com/262",
    ],
    originalPrice: "600,000 đ/giờ",
    discountedPrice: "550,000 đ/giờ",
  },
  {
    id: 3,
    name: "Phòng Suite",
    images: [
      "https://via.placeholder.com/270",
      "https://via.placeholder.com/271",
      "https://via.placeholder.com/272",
    ],
    originalPrice: "800,000 đ/giờ",
    discountedPrice: "750,000 đ/giờ",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
          Ezinn Homestay - Không gian riêng tư cho bạn
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Tận hưởng sự riêng tư và thư giãn đáng giá tại Ezinn Homestay
        </p>
      </header>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
