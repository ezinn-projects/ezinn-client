import { z } from "zod";

const MIN_AGE = 18;
const MAX_AGE = 25;

export const recruitmentSchema = z
  .object({
    fullName: z.string().min(2, "Bạn ơi, tên bạn là gì vậy?"),
    birthDate: z
      .string()
      .regex(
        /^\d{2}\/\d{2}\/\d{4}$/,
        "Ngày sinh phải theo định dạng dd/mm/yyyy"
      )
      .refine((dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age >= MIN_AGE;
      }, `Bạn phải đủ ${MIN_AGE} tuổi để ứng tuyển`)
      .refine((dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        return age <= MAX_AGE;
      }, `Chúng tôi chỉ nhận ứng viên từ ${MIN_AGE}-${MAX_AGE} tuổi`),
    gender: z.string().min(1, "Bạn quên chọn giới tính nè"),
    phone: z
      .string()
      .regex(
        /^(0)[0-9]{9}$/,
        "Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)"
      ),
    email: z
      .union([
        z.string().email("Email không hợp lệ"),
        z.string().length(0), // Cho phép chuỗi rỗng
        z.null(),
      ])
      .optional(),
    socialMedia: z
      .string()
      .min(
        1,
        "Hãy để lại link Facebook hoặc Zalo của bạn nè, Linkedin cũng được nhé"
      ),
    currentStatus: z.string().min(1, "Bạn đang làm gì nè?"),
    otherStatus: z.string().optional(),
    position: z.array(z.string()).min(1, "Bạn hãy chọn ít nhất một vị trí nhé"),
    workShifts: z
      .array(z.string())
      .min(1, "Bạn hãy chọn ít nhất một ca làm việc nhé"),
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
      message: "Vui lòng điền thông tin khác",
      path: ["otherStatus"],
    }
  );

export type RecruitmentFormData = z.infer<typeof recruitmentSchema>;
