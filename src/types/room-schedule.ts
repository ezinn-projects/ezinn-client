export enum RoomScheduleStatus {
  Booked = "booked",
  InUse = "in use",
  Locked = "locked",
  Cancelled = "cancelled",
  Finished = "finished",
}

export interface RoomSchedule {
  _id: string;
  roomId: string;
  startTime: Date;
  endTime: Date;
  status: RoomScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
