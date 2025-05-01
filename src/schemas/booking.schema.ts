import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .regex(
      /^(0)[0-9]{9}$/,
      "Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)"
    ),
  email: z
    .union([
      z.string().email("Email không hợp lệ").trim(),
      z.string().length(0), // Cho phép chuỗi rỗng
    ])
    .optional(),
  note: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
