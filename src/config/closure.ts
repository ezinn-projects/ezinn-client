/**
 * Cấu hình thông báo đóng cửa tạm thời (sửa chữa, bảo trì).
 * Từ ngày MAINTENANCE_FROM: không nhận đặt phòng, không áp dụng khuyến mãi.
 * Đổi/ xóa khi Jozo mở cửa trở lại.
 */
export const MAINTENANCE_FROM = "2026-02-28"; // YYYY-MM-DD

export const CLOSURE_MESSAGE =
  "Từ ngày 28/02/2026 Jozo tạm ngưng đóng cửa để sửa chữa. Không nhận đặt phòng và không áp dụng các chương trình khuyến mãi. Xin lỗi quý khách vì sự bất tiện này.";

export function isUnderMaintenance(now: Date = new Date()): boolean {
  const from = new Date(MAINTENANCE_FROM);
  from.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return today >= from;
}
