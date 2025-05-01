export type Booking = {
  _id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  room_type: "small" | "medium" | "large";
  room_id?: string;
  booking_date: string;
  time_slots: string[];
  status: "pending" | "confirmed" | "cancelled" | "completed";
  total_price: number;
  created_at: string;
  updated_at?: string;
};

export type BookingResponse = {
  success: boolean;
  data?: Booking | Booking[];
  message?: string;
};
