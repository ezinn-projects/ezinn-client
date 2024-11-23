import Link from "next/link";
import ImagesList from "./images-list";
import Typography from "../ui/typography";
import Image from "next/image";

interface Room {
  id: number;
  name: string;
  images: string[];
  originalPrice: string;
  discountedPrice: string;
}

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="">
      <Link
        href={`/room-detail/${room.id}`} // Sử dụng dynamic URL
      >
        <ImagesList images={room.images} />

        <div className="relative w-full h-[300px] hidden md:block">
          <Image
            src={room.images[0]}
            alt={`Room subimage ${1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg object-cover"
            //   onLoad={() => setIsLoaded(true)}
          />
        </div>

        <Typography as="h4" variant="semibold" className="mt-2">
          {room.name}
        </Typography>
        <Typography
          as="p"
          variant="default"
          className="line-through text-gray-600 text-sm"
        >
          Giá cũ: {room.originalPrice}
        </Typography>
        <Typography as="p" variant="bold">
          Giá khuyến mãi: {room.discountedPrice}
        </Typography>
      </Link>
    </div>
  );
}
