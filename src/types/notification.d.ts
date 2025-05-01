export type AdminNotification = {
  _id?: string;
  type: "new_booking" | "cancelled_booking" | "system_alert";
  booking_id: string;
  customer_name: string;
  customer_phone: string;
  booking_date: string;
  time_slot: string;
  room_type: string;
  total_price: number;
  is_read: boolean;
  created_at: string;
  updated_at?: string;
};

export type AdminNotificationResponse = {
  success: boolean;
  data?: AdminNotification | AdminNotification[];
  message?: string;
};
