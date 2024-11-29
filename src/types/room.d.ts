export type Room = {
  _id: string;
  roomName: string;
  maxCapacity: number;
  price: number;
  status: "available" | "occupied";
};
