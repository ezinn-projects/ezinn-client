import { z } from "zod";
import { passwordSchema } from "./password.schema";
import {
  isMemberBirthDateValid,
  MAX_MEMBER_AGE,
  MIN_MEMBER_AGE,
} from "@/lib/date-utils";

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z.union([
      z.string().min(1, "Email không được để trống"),
      z.string().email("Email không hợp lệ").trim(),
    ]),
    phone_number: z
      .string()
      .regex(
        /^(0)[0-9]{9}$/,
        "Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)",
      ),
    password: passwordSchema,
    confirm_password: z.string(),
    date_of_birth: z
      .date()
      .refine((date) => isMemberBirthDateValid(date), "Ngày sinh không hợp lệ")
      .refine(
        (date) => isMemberBirthDateValid(date),
        `Tuổi thành viên phải từ ${MIN_MEMBER_AGE} đến ${MAX_MEMBER_AGE} tuổi`,
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
