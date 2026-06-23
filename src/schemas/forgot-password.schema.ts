import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ")
    .trim(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
