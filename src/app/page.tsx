import Nav from "@/components/nav";
import RoomCard from "@/components/room-card/room-card";
import { Room } from "@/types/room";
// import { rooms } from "@/mock";

export const dynamic = "force-dynamic";

async function getRooms(): Promise<Room[]> {
  const response = await fetch("http://localhost:3000/apis/rooms", {
    cache: "no-store", // Không cache dữ liệu
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

  return (
    <div
      className="container mx-auto px-4 py-8"
      suppressHydrationWarning={true}
    >
      {/* Header */}
      <header className="md:hidden h-20">
        <Nav />
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}
