import TestimonialCarousel from "@/components/carousel";
import { Price } from "@/types/price";
import { RoomType } from "@/types/room";
import RoomCard from "@/components/room-card/room-card";
// import Link from "next/link";

export const dynamic = "force-dynamic";

async function getRooms(): Promise<RoomType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/room-types`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();
  if (data.success) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
}

async function getPrices(): Promise<Price[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/price`, {
    // Cache trong 5 phút để tránh gọi API nhiều lần
    next: { revalidate: 300 },
  });
  const data = await response.json();
  return data.data;
}

export default async function Home() {
  const rooms = await getRooms();
  const prices = await getPrices();

  // console.log("rooms", rooms);
  // console.log("prices", prices);

  // Hàm helper để lấy giá thấp nhất cho từng loại phòng
  const getMinPriceForRoomType = (roomType: string, prices: Price[]) => {
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
  };

  console.log("prices", prices);

  //   [
  //     {
  //         "_id": "67d6c4965453eb5ee9aa97d2",
  //         "day_type": "weekday",
  //         "time_slots": [
  //             {
  //                 "start": "10:00",
  //                 "end": "12:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 40000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 60000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 80000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "13:00",
  //                 "end": "18:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 60000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 80000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 100000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "19:00",
  //                 "end": "23:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 90000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 120000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 150000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "00:00",
  //                 "end": "02:00",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 90000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 120000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 150000
  //                     }
  //                 ]
  //             }
  //         ],
  //         "effective_date": "2025-03-16T00:00:00.000Z",
  //         "end_date": null,
  //         "note": "ngày thường"
  //     },
  //     {
  //         "_id": "67d6c4da5453eb5ee9aa97d4",
  //         "day_type": "weekend",
  //         "time_slots": [
  //             {
  //                 "start": "10:00",
  //                 "end": "12:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 55000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 75000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 95000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "13:00",
  //                 "end": "18:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 75000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 95000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 125000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "19:00",
  //                 "end": "23:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 95000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 125000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 165000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "00:00",
  //                 "end": "02:00",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 95000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 125000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 165000
  //                     }
  //                 ]
  //             }
  //         ],
  //         "effective_date": "2025-03-16T00:00:00.000Z",
  //         "end_date": null,
  //         "note": "cuối tuần"
  //     },
  //     {
  //         "_id": "67d6c50c5453eb5ee9aa97d6",
  //         "day_type": "holiday",
  //         "time_slots": [
  //             {
  //                 "start": "10:00",
  //                 "end": "12:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 55000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 75000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 95000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "13:00",
  //                 "end": "18:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 75000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 95000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 125000
  //                     }
  //                 ]
  //             },
  //             {
  //                 "start": "19:00",
  //                 "end": "23:59",
  //                 "prices": [
  //                     {
  //                         "room_type": "small",
  //                         "price": 95000
  //                     },
  //                     {
  //                         "room_type": "medium",
  //                         "price": 125000
  //                     },
  //                     {
  //                         "room_type": "large",
  //                         "price": 165000
  //                     }
  //                 ]
  //             }
  //         ],
  //         "effective_date": "2025-03-16T00:00:00.000Z",
  //         "end_date": null,
  //         "note": "ngày lễ"
  //     }
  // ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section với Slider */}
      <TestimonialCarousel />

      {/* Promotion Section */}

      {/* Room Types Section */}
      <section className="mb-16 bg-red-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-lightpink">
          Jozo có 3 loại box
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {rooms
            .sort((a, b) => {
              // Sắp xếp theo loại phòng (small, medium, large)
              const typeOrder = { small: 1, medium: 2, large: 3 };
              const orderA = typeOrder[a.type as keyof typeof typeOrder] || 0;
              const orderB = typeOrder[b.type as keyof typeof typeOrder] || 0;
              return orderA - orderB;
            })
            .map((room) => {
              const minPrice = getMinPriceForRoomType(room.type, prices);
              return (
                <RoomCard key={room._id} room={room} minPrice={minPrice} />
              );
            })}
        </div>
      </section>
    </div>
  );
}
