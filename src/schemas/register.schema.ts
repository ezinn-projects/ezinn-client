import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone_number: z
      .string()
      .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirm_password: z.string(),
    date_of_birth: z.date({
      required_error: "Vui lòng chọn ngày sinh",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
