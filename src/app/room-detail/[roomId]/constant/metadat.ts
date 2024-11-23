// Hàm `generateMetadata` cho SEO

import { Room } from "@/mock";

export async function generateMetadata({
  rooms,
  params,
}: {
  rooms: Room[];
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
