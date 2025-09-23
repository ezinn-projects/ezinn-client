export type RoomType = "Small" | "Medium" | "Large";
export type Booking = {
  _id?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  actualRoomType: RoomType;
  originalRoomType: RoomType;
  startTime: string; // ISO string với timezone +07:00
  endTime: string; // ISO string với timezone +07:00
  note?: string;
  status?: "booked" | "cancelled" | "completed" | "in use";
  createdAt?: string;
  updatedAt?: string;
};

export type BookingResponse = {
  success: boolean;
  data?: Booking | Booking[];
  message?: string;
};

// Type cho request gửi lên API
export type BookingRequest = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  roomType: "Small" | "Medium" | "Large";
  startTime: string; // ISO string với timezone +07:00
  endTime: string; // ISO string với timezone +07:00
  note?: string;
};
