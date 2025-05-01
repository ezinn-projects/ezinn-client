export enum RoomScheduleStatus {
  Available = "available",
  Booked = "booked",
  InUse = "in use",
  Maintenance = "maintenance",
  Locked = "locked",
  Cancelled = "cancelled",
  Finished = "finished",
}

export interface RoomSchedule {
  _id: string;
  roomId: string;
  startTime: Date | string;
  endTime: Date | string;
  status: RoomScheduleStatus | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  updatedBy: string;
  note?: string;
}
