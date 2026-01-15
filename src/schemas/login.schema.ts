import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Vui lòng nhập số điện thoại, email hoặc username" })
    .min(1, "Vui lòng nhập số điện thoại, email hoặc username")
    .max(100, "Thông tin đăng nhập quá dài"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu phải từ 6 ký tự")
    .max(8, "Mật khẩu tối đa 8 ký tự"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

