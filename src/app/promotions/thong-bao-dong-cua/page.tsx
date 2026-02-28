import Typography from "@/components/ui/typography";
import { CLOSURE_MESSAGE, MAINTENANCE_FROM } from "@/config/closure";
import { AlertTriangle, ArrowLeft, CalendarOff } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thông báo đóng cửa tạm thời | Jozo",
  description:
    "Từ ngày 28/02/2026 Jozo tạm ngưng đóng cửa để sửa chữa. Không nhận đặt phòng và không áp dụng chương trình khuyến mãi.",
  alternates: { canonical: "/promotions/thong-bao-dong-cua" },
  openGraph: {
    title: "Thông báo đóng cửa tạm thời | Jozo",
    description: CLOSURE_MESSAGE,
    url: "/promotions/thong-bao-dong-cua",
    type: "article",
  },
};

export default function TemporaryClosurePage() {
  const fromDate = new Date(MAINTENANCE_FROM).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-lightpink hover:text-pink-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-amber-500 text-amber-950 px-6 py-8 md:px-10 md:py-10">
            <div className="flex items-start gap-4">
              <AlertTriangle
                className="w-12 h-12 flex-shrink-0 mt-1"
                aria-hidden
              />
              <div>
                <Typography
                  as="h1"
                  variant="bold"
                  className="text-2xl md:text-3xl mb-2"
                >
                  Thông báo đóng cửa tạm thời
                </Typography>
                <Typography
                  as="p"
                  variant="default"
                  className="text-amber-900/90 text-lg"
                >
                  Jozo tạm ngưng hoạt động để sửa chữa, nâng cấp
                </Typography>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <Typography
                as="p"
                variant="semibold"
                className="text-amber-900 text-lg"
              >
                {CLOSURE_MESSAGE}
              </Typography>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <CalendarOff className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Không nhận đặt phòng</strong> — Mọi đặt box tạm thời
                  bị tạm ngưng từ ngày {fromDate}.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span>
                  <strong>Không áp dụng khuyến mãi</strong> — Các chương trình
                  ưu đãi sẽ tạm ngừng trong thời gian này.
                </span>
              </li>
            </ul>

            <Typography as="p" variant="default" className="text-gray-600">
              Jozo xin lỗi quý khách vì sự bất tiện này. Khi mở cửa trở lại,
              thông tin sẽ được cập nhật trên website và fanpage. Cảm ơn quý
              khách đã ủng hộ!
            </Typography>

            <div className="pt-4 border-t border-gray-200">
              <Typography
                as="p"
                variant="default"
                className="text-gray-500 text-sm"
              >
                Có thắc mắc vui lòng liên hệ:{" "}
                <a
                  href="tel:0359660934"
                  className="text-lightpink font-medium hover:underline"
                >
                  035 966 0934
                </a>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
