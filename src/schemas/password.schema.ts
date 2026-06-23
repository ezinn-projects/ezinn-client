import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự");
