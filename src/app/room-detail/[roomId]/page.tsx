import { rooms } from "@/mock";
import { notFound } from "next/navigation";
import LargeLayout from "./components/layouts/large-layout";
import MobileLayout from "./components/layouts/mobile-layout";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return rooms.map((room) => ({
    roomId: room.id.toString(),
  }));
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
    <div className="">
      <LargeLayout room={room} />

      <MobileLayout room={room} />
    </div>
  );
};

export default RoomDetailPage;
