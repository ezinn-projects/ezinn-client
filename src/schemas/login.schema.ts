import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Vui lòng nhập số điện thoại, email hoặc username" })
    .min(1, "Vui lòng nhập số điện thoại, email hoặc username")
    .max(100, "Thông tin đăng nhập quá dài"),
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;

