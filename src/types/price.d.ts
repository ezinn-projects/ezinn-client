export type PriceResponse = {
  message: string;
  result: Price[];
};

export type Price = {
  _id: string;
  day_type: "weekday" | "weekend" | "holiday";
  time_slots: TimeSlot[];
  effective_date: string;
  end_date: string | null;
  note: string;
};

export type TimeSlot = {
  start: string;
  end: string;
  prices: RoomPrice[];
};

export type RoomPrice = {
  room_type: "small" | "medium" | "large" | "dorm";
  price: number;
};
