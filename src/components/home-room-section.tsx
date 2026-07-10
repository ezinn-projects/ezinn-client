import RoomCard from "@/components/room-card/room-card";
import { getPrices, getRoomTypes } from "@/lib/data-cache";
import { Price } from "@/types/price";
import { RoomType } from "@/types/room";

function roomGridLayoutClass(count: number): string {
  if (count <= 0) return "";
  if (count === 1) {
    return "grid gap-6 grid-cols-1 max-w-md mx-auto w-full";
  }
  if (count === 2) {
    return "grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto w-full";
  }
  if (count === 4) {
    return "grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto w-full";
  }
  return "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full";
}

function getMinPriceForRoomType(roomType: string, prices: Price[]) {
  let minPrice = Infinity;

  prices.forEach((priceRule) => {
    priceRule.time_slots.forEach((timeSlot) => {
      timeSlot.prices.forEach((roomPrice) => {
        if (roomPrice.room_type === roomType) {
          minPrice = Math.min(minPrice, roomPrice.price);
        }
      });
    });
  });

  return minPrice === Infinity ? 0 : minPrice;
}

export default async function HomeRoomSection() {
  const [rooms, prices] = await Promise.all([getRoomTypes(), getPrices()]);

  const displayRooms = rooms
    .filter((room) => room.type !== "small")
    .sort((a, b) => {
      const typeOrder: Record<string, number> = {
        medium: 1,
        large: 2,
        dorm: 3,
      };
      return (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99);
    });

  if (displayRooms.length === 0) return null;

  return (
    <section
      id="booking"
      className="mb-10 sm:mb-16 border border-border bg-gradient-to-b from-card to-muted/60 p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-sm"
    >
      <div className="max-w-6xl mx-auto">
        <div className={roomGridLayoutClass(displayRooms.length)}>
          {displayRooms.map((room: RoomType, index) => {
            const minPrice = getMinPriceForRoomType(room.type, prices);
            return (
              <div
                key={room._id}
                className="min-w-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <RoomCard room={room} minPrice={minPrice} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
