import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  customerPhone: z
    .string()
    .regex(
      /^(0)[0-9]{9}$/,
      "Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)"
    ),
  customerEmail: z
    .union([
      z.string().email("Email không hợp lệ").trim(),
      z.string().length(0), // Cho phép chuỗi rỗng
    ])
    .optional(),
  roomType: z.enum(["Small", "Medium", "Large"], {
    errorMap: () => ({ message: "Vui lòng chọn loại phòng hợp lệ" }),
  }),
  startTime: z.string().min(1, "Vui lòng chọn thời gian bắt đầu"),
  endTime: z.string().min(1, "Vui lòng chọn thời gian kết thúc"),
  note: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
