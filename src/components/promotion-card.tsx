"use client";

import Link from "next/link";
import Image from "next/image";
import Typography from "./ui/typography";
import { Promotion } from "@/types/promotion";

export default function PromotionCard({
  promotion,
}: {
  promotion: Promotion;
}) {
  // Format ngày đăng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Link href={`/promotions/${promotion.slug}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group border border-pink-50 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={promotion.image}
            alt={promotion.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Badge khuyến mãi (giữ tối giản, không icon) */}
          <div className="absolute top-4 right-4 bg-white/90 text-lightpink px-3 py-1 rounded-full text-xs font-semibold shadow">
            Khuyến mãi
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <Typography
            as="h3"
            variant="semibold"
            className="mb-2 text-lightpink line-clamp-2 group-hover:text-pink-600 transition-colors"
          >
            {promotion.title}
          </Typography>

          <Typography
            as="p"
            variant="default"
            className="text-gray-600 mb-4 line-clamp-2 text-sm"
          >
            {promotion.shortDescription}
          </Typography>

          {/* Ngày đăng (không dùng icon) */}
          <div className="text-sm text-gray-500 mt-auto">Ngày đăng: {formatDate(promotion.postedAt)}</div>
        </div>
      </div>
    </Link>
  );
}

