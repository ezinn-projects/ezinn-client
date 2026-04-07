import { z } from "zod";

const MIN_AGE = 18;
const MAX_AGE = 25;

export const recruitmentSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Vui lòng nhập họ và tên đầy đủ (tối thiểu 2 ký tự)."),
    birthDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Ngày sinh theo định dạng dd/mm/yyyy.")
      .refine((dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age >= MIN_AGE;
      }, `Ứng viên cần đủ ${MIN_AGE} tuổi trở lên.`)
      .refine((dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age <= MAX_AGE;
      }, `Vị trí này chỉ xét ứng viên trong độ tuổi ${MIN_AGE}–${MAX_AGE}.`),
    gender: z.string().min(1, "Vui lòng chọn giới tính."),
    phone: z
      .string()
      .regex(
        /^(0)[0-9]{9}$/,
        "Số điện thoại 10 chữ số, bắt đầu bằng 0 (ví dụ: 0912345678).",
      ),
    email: z
      .union([
        z.string().email("Email không hợp lệ."),
        z.string().length(0),
        z.null(),
      ])
      .optional(),
    socialMedia: z
      .string()
      .min(
        1,
        "Vui lòng cung cấp liên kết hoặc thông tin liên hệ qua mạng xã hội (Facebook, Zalo...).",
      ),
    currentStatus: z.string().min(1, "Vui lòng cho biết tình trạng hiện tại."),
    otherStatus: z.string().optional(),
    position: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một vị trí."),
    workShifts: z
      .array(z.string())
      .min(1, "Vui lòng chọn ít nhất một ca làm việc."),
    note: z
      .string()
      .max(2000, "Ghi chú tối đa 2000 ký tự.")
      .optional(),
  })
  .refine(
    (data) => {
      if (
        data.currentStatus === "other" &&
        (!data.otherStatus || data.otherStatus.trim() === "")
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Vui lòng mô tả ngắn gọn tình trạng của bạn.",
      path: ["otherStatus"],
    },
  );

export type RecruitmentFormData = z.infer<typeof recruitmentSchema>;
