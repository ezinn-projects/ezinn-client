import { Promotion } from "@/types/promotion";

export const promotions: Promotion[] = [
  {
    id: "1",
    slug: "tang-1-gio-khi-hat-2-gio",
    title: "Hát đủ 2 giờ - Tặng ngay 1 giờ",
    shortDescription:
      "Đặt phòng từ 2 giờ trở lên và order snack/nước từ 35k để nhận thêm 1 giờ miễn phí!",
    image: "/images/banner-1.jpg",
    postedAt: "2026-01-01T00:00:00+07:00",
  },
  {
    id: "3",
    slug: "book-box-truoc-giam-10-5",
    title: "Book box trước trên Jozo: Giảm 10% (T2-T6) & 5% (T7-CN)",
    shortDescription:
      "Đặt phòng trước trên mọi nền tảng Jozo: giảm 10% từ thứ 2-6 mọi khung giờ, riêng thứ 7 & CN giảm 5%.",
    image: "/images/reserve.png",
    postedAt: "2025-12-20T00:00:00+07:00",
  },
  // Có thể thêm nhiều promotion khác ở đây
];

