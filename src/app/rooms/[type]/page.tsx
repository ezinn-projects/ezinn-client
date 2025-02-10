// import { roomTypes, rooms } from "@/data/rooms";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getRoomsByType(type: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${type}`
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ type: string }>;
}

const mappedRoomLabel: Record<string, string> = {
  small: "nhỏ",
  medium: "vừa",
  large: "lớn",
};

type Room = {
  _id: string;
  roomName: string;
  roomType: "small" | "medium" | "large";
  maxCapacity: number;
  status: "available" | "occupied";
  description: string;
  images: string[];
  createdAt: string;
  updatedAt?: string;
  prices: {
    timeSlot: string;
    price: number;
  }[];
};

// create generate metadata function
export async function generateMetadata({ params }: PageProps) {
  const { type } = await params;

  return {
    title: `Phòng ${mappedRoomLabel[type]} - Jozo Music Box`,
  };
}

// Mock time slots
const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export default async function RoomTypePage({ params }: PageProps) {
  const { type } = await params;
  const data = await getRoomsByType(type);

  if (!data?.success) return notFound();
  const rooms: Room[] = data.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-8 rounded-lg">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">Phòng {type}</h1>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Bảng giá:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold">Giờ thường (09:00 - 17:00)</p>
                <p className="text-2xl font-bold text-lightpink">
                  200.000đ/giờ
                </p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <p className="font-semibold">Giờ cao điểm (17:00 - 22:00)</p>
                <p className="text-2xl font-bold text-lightpink">
                  300.000đ/giờ
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-left min-w-[200px]">Tên phòng</th>
                {TIME_SLOTS.map((time) => (
                  <th
                    key={time}
                    className="py-4 px-4 text-center min-w-[100px]"
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} className="border-b border-white/10">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-semibold">{room.roomName}</h3>
                      <p className="text-sm text-zinc-600">
                        {room.maxCapacity} người
                      </p>
                    </div>
                  </td>
                  {TIME_SLOTS.map((time) => {
                    const price = parseInt(time) >= 17 ? 300000 : 200000;
                    return (
                      <td
                        key={`${room._id}-${time}`}
                        className="py-4 px-4 text-center"
                      >
                        <Link
                          href={`/room-detail/${room._id}?time=${time}`}
                          className="block w-full py-2 px-4 rounded-lg bg-lightpink hover:bg-pink-600 text-white transition-colors"
                        >
                          {price.toLocaleString("vi-VN")}đ
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
