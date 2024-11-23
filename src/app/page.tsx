import Nav from "@/components/nav";
import RoomCard from "@/components/room-card/room-card";
import { rooms } from "@/mock";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="md:hidden h-20">
        <Nav />
      </header>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
          Ezinn - Không gian riêng tư cho bạn
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Tận hưởng sự riêng tư và thư giãn đáng giá tại Ezinn
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
