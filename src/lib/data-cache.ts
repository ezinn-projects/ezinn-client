import clientPromise from "@/lib/mongodb";
import {
  serializeMongoDocument,
  serializeMongoDocuments,
} from "@/lib/serialize-utils";
import { Booking } from "@/types/booking";
import { ObjectId } from "mongodb";
import { cache } from "react";
import { unstable_cache } from "next/cache";

/**
 * Cached function để lấy booking details
 * Sử dụng unstable_cache với tags để có thể revalidate
 */
export const getBookingDetails = unstable_cache(
  async (id: string): Promise<Booking | null> => {
    try {
      const client = await clientPromise;
      const db = client.db("jozo");

      // Tìm booking theo _id
      const booking = await db.collection("room_schedules").findOne({
        _id: new ObjectId(id),
      });

      if (!booking) {
        console.log("Booking not found for ID:", id);
        return null;
      }

      // Serialize MongoDB document để có thể truyền sang Client Component
      return serializeMongoDocument(booking) as Booking;
    } catch (error) {
      console.error("Error fetching booking details:", error);
      return null;
    }
  },
  ["booking-details"],
  {
    tags: ["booking-details"],
    revalidate: 60, // Cache trong 60 giây
  }
);

/**
 * Cached function để lấy danh sách phòng với giá
 */
export const getRoomsWithPrices = cache(async () => {
  try {
    const client = await clientPromise;
    const db = client.db("jozo");

    // Lấy danh sách phòng
    const rooms = await db.collection("rooms").find({}).toArray();

    // Lấy bảng giá (mặc định lấy giá ngày thường)
    const prices = await db
      .collection("prices")
      .findOne({ day_type: "weekday" });

    if (!prices) {
      throw new Error("Price data not found");
    }

    // Thêm thông tin giá vào từng phòng
    const roomsWithPrices = rooms.map((room) => {
      const roomPrices = prices.time_slots.map(
        (slot: {
          start: string;
          end: string;
          prices: Array<{ room_type: string; price: number }>;
        }) => {
          const priceInfo = slot.prices.find((p) => p.room_type === room.type);
          return {
            timeSlot: `${slot.start}-${slot.end}`,
            price: priceInfo ? priceInfo.price : 0,
          };
        }
      );

      return {
        ...room,
        prices: roomPrices,
      };
    });

    // Serialize MongoDB documents để có thể truyền sang Client Component
    return serializeMongoDocuments(roomsWithPrices);
  } catch (error) {
    console.error("Error fetching rooms with prices:", error);
    throw error;
  }
});

/**
 * Cached function để lấy room data theo type cho SSR
 */
export const getRoomDataByType = unstable_cache(
  async (roomType: string) => {
    try {
      const client = await clientPromise;
      const db = client.db("jozo");

      // Lấy danh sách phòng theo type (field trong DB là "type", không phải "roomType")
      const rooms = await db
        .collection("rooms")
        .find({ type: roomType.toLowerCase() })
        .toArray();

      if (!rooms.length) {
        return {
          rooms: [],
          prices: [
            {
              _id: "mock-price",
              day_type: "weekday",
              time_slots: [
                {
                  start: "10:00",
                  end: "12:00",
                  prices: [
                    { room_type: "small", price: 50000 },
                    { room_type: "medium", price: 70000 },
                    { room_type: "large", price: 90000 },
                  ],
                },
                {
                  start: "12:00",
                  end: "18:00",
                  prices: [
                    { room_type: "small", price: 60000 },
                    { room_type: "medium", price: 80000 },
                    { room_type: "large", price: 100000 },
                  ],
                },
                {
                  start: "18:00",
                  end: "22:00",
                  prices: [
                    { room_type: "small", price: 70000 },
                    { room_type: "medium", price: 90000 },
                    { room_type: "large", price: 110000 },
                  ],
                },
              ],
            },
            {
              _id: "mock-price-weekend",
              day_type: "weekend",
              time_slots: [
                {
                  start: "10:00",
                  end: "12:00",
                  prices: [
                    { room_type: "small", price: 60000 },
                    { room_type: "medium", price: 80000 },
                    { room_type: "large", price: 100000 },
                  ],
                },
                {
                  start: "12:00",
                  end: "18:00",
                  prices: [
                    { room_type: "small", price: 70000 },
                    { room_type: "medium", price: 90000 },
                    { room_type: "large", price: 110000 },
                  ],
                },
                {
                  start: "18:00",
                  end: "22:00",
                  prices: [
                    { room_type: "small", price: 80000 },
                    { room_type: "medium", price: 100000 },
                    { room_type: "large", price: 120000 },
                  ],
                },
              ],
            },
          ],
        };
      }

      // Lấy bảng giá
      const prices = await db.collection("prices").find({}).toArray();
      console.log("Found prices:", prices.length);

      // Serialize MongoDB documents để có thể truyền sang Client Component
      return {
        rooms: serializeMongoDocuments(rooms),
        prices: serializeMongoDocuments(prices),
      };
    } catch (error) {
      console.error("Error fetching room data by type:", error);
      // Fallback trong trường hợp lỗi
      console.log("Using error fallback mock data");
      return {
        rooms: [],
        prices: [
          {
            _id: "error-fallback-price",
            day_type: "weekday",
            time_slots: [
              {
                start: "10:00",
                end: "22:00",
                prices: [
                  { room_type: "small", price: 50000 },
                  { room_type: "medium", price: 70000 },
                  { room_type: "large", price: 90000 },
                ],
              },
            ],
          },
        ],
      };
    }
  },
  ["room-data-by-type"],
  {
    tags: ["room-data"],
    revalidate: 60, // Cache trong 60 giây
  }
);
