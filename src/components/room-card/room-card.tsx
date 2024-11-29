import { Room } from "@/types/room";
import Link from "next/link";
import Typography from "../ui/typography";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="">
      <Link href={`/room-detail/${room._id}`}>
        {/* <ImagesList images={room.images} /> */}

        {/* <div className="relative w-full h-[300px] hidden md:block">
          <Image
            src={room.images[0]}
            alt={`Room subimage ${1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg object-cover"
            //   onLoad={() => setIsLoaded(true)}
          />
        </div> */}

        <Typography as="h4" variant="semibold" className="mt-2">
          {room.roomName}
        </Typography>
        <Typography
          as="p"
          variant="default"
          className="line-through text-gray-600 text-sm"
        >
          Giá cũ: {room.price}
        </Typography>
        <Typography as="p" variant="bold">
          Giá khuyến mãi: {room.price}
        </Typography>
      </Link>
    </div>
  );
}
