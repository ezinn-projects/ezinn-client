import Link from "next/link";
import Typography from "./ui/typography";
import PromotionCard from "./promotion-card";
import { Promotion } from "@/types/promotion";
import { isUnderMaintenance } from "@/config/closure";
import { AlertTriangle } from "lucide-react";

type PromotionSectionProps = {
  promotions: Promotion[];
};

// Section hiển thị khuyến mãi với box riêng, ít icon
export default function PromotionSection({ promotions }: PromotionSectionProps) {
  if (!promotions.length) return null;

  const underMaintenance = isUnderMaintenance();

  return (
    <section className="mb-16">
      <div className="bg-white/80 backdrop-blur border border-pink-100 rounded-2xl shadow-sm p-6 sm:p-8">
        {underMaintenance && (
          <>
            <div className="mb-4 py-2.5 px-4 text-center text-sm font-medium text-amber-800 bg-amber-100 border border-amber-300 rounded-lg">
              Từ 28/02/2026 Jozo tạm đóng cửa sửa chữa — các chương trình khuyến mãi tạm thời không áp dụng.
            </div>
            <Link
              href="/promotions/thong-bao-dong-cua"
              className="mb-6 flex items-center gap-4 p-4 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-900 hover:bg-amber-200 hover:border-amber-500 transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-900" />
              </div>
              <div className="min-w-0 flex-1">
                <Typography as="span" variant="semibold" className="block text-lg group-hover:underline">
                  Thông báo đóng cửa tạm thời
                </Typography>
                <Typography as="span" variant="default" className="text-sm text-amber-800">
                  Xem chi tiết: không nhận đặt phòng, không áp dụng khuyến mãi từ 28/02/2026
                </Typography>
              </div>
              <span className="flex-shrink-0 text-amber-700 font-medium group-hover:underline">Xem ngay →</span>
            </Link>
          </>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <Typography as="h2" variant="bold" className="text-3xl text-lightpink mb-2">
              Khuyến mãi hot
            </Typography>
            <Typography as="p" variant="default" className="text-gray-600">
              Đừng bỏ lỡ các chương trình ưu đãi hấp dẫn
            </Typography>
          </div>
          <div className="px-3 py-1 text-sm font-semibold text-lightpink bg-pink-50 border border-pink-100 rounded-full">
            Ưu đãi
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

