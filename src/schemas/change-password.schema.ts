import { z } from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z
      .string({ required_error: "Vui lòng nhập mật khẩu hiện tại" })
      .min(6, "Mật khẩu hiện tại phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu hiện tại quá dài"),
    password: z
      .string({ required_error: "Vui lòng nhập mật khẩu mới" })
      .min(6, "Mật khẩu mới phải đúng 6 ký tự")
      .max(6, "Mật khẩu mới phải đúng 6 ký tự"),
    confirm_password: z
      .string({ required_error: "Vui lòng nhập lại mật khẩu mới" })
      .min(6, "Mật khẩu xác nhận phải đúng 6 ký tự")
      .max(6, "Mật khẩu xác nhận phải đúng 6 ký tự"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;


