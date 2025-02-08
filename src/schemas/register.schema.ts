import { z } from "zod";

const MAX_AGE = 100;
const MIN_AGE = 12;

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z
      .union([
        z.string().email("Email không hợp lệ").trim(),
        z.string().length(0), // Cho phép chuỗi rỗng
        z.null(),
      ])
      .optional(),
    phone_number: z
      .string()
      .regex(
        /^(0)[0-9]{9}$/,
        "Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)"
      ),
    password: z.string().min(6, "Passcode phải có ít nhất 6 ký tự"),
    confirm_password: z.string(),
    date_of_birth: z
      .date()
      .refine((date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age <= MAX_AGE;
      }, "Ngày sinh không hợp lệ")
      .refine((date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= MIN_AGE;
      }, `Bạn phải đủ ${MIN_AGE} tuổi để đăng ký`),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passcode xác nhận không khớp",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
