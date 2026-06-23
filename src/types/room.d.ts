export type RoomType = {
  _id: string;
  roomName: string;
  type: "small" | "medium" | "large" | "dorm";
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
