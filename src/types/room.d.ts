export type Room = {
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
