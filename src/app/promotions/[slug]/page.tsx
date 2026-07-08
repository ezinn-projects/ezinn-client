import { notFound } from "next/navigation";
import { promotions } from "@/data/promotions";
import Typography from "@/components/ui/typography";
import PromotionContent from "@/components/promotion-content";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PromotionPageProps {
  params: Promise<{ slug: string }>;
}

// Force static generation (SSG) - không dùng SSR
export const dynamic = "force-static";
export const dynamicParams = false; // 404 nếu slug không có trong generateStaticParams
export const revalidate = false; // Không revalidate, pure static

// Static Generation: Generate all promotion pages at build time
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    slug: promotion.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PromotionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const promotion = promotions.find((p) => p.slug === slug);

  if (!promotion) {
    return {
      title: "Không tìm thấy khuyến mãi",
    };
  }

  return {
    title: `${promotion.title} | Jozo Music Box`,
    description: promotion.shortDescription,
    alternates: {
      canonical: `/promotions/${promotion.slug}`,
    },
    openGraph: {
      title: promotion.title,
      description: promotion.shortDescription,
      url: `/promotions/${promotion.slug}`,
      images: [promotion.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: promotion.title,
      description: promotion.shortDescription,
      images: [promotion.image],
    },
  };
}

export default async function PromotionDetailPage({
  params,
}: PromotionPageProps) {
  const { slug } = await params;
  const promotion = promotions.find((p) => p.slug === slug);

  if (!promotion) {
    notFound();
  }

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="py-6 sm:py-8">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-brand-hover mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </Link>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero image */}
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={promotion.image}
              alt={promotion.title}
              fill
              sizes="(min-width: 1280px) 1216px, (min-width: 768px) calc(100vw - 2rem), 100vw"
              loading="eager"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <Typography
                as="h1"
                variant="bold"
                className="text-3xl md:text-4xl mb-2"
              >
                {promotion.title}
              </Typography>
              <div className="flex items-center text-sm md:text-base">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(promotion.postedAt)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Short description */}
            <div className="bg-accent/60 border-l-4 border-primary p-4 mb-8 rounded">
              <Typography
                as="p"
                variant="semibold"
                className="text-primary text-lg"
              >
                {promotion.shortDescription}
              </Typography>
            </div>

            {/* Full description - JSX Component */}
            <div className="prose prose-lg max-w-none">
              <PromotionContent promotionId={promotion.id} />
            </div>

            {/* CTA button */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              {promotion.id === "7" ? (
                <>
                  <Link
                    href="/register"
                    className="bg-primary hover:bg-brand-hover text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors text-center"
                  >
                    Đăng ký ngay!
                  </Link>
                  <Link
                    href="/membership"
                    className="bg-white border-2 border-primary text-primary hover:bg-accent font-semibold py-3 px-8 rounded-lg transition-colors text-center"
                  >
                    Xem chương trình thành viên
                  </Link>
                  <a
                    href="tel:0359660934"
                    className="bg-white border-2 border-primary text-primary hover:bg-accent font-semibold py-3 px-8 rounded-lg transition-colors text-center"
                  >
                    Liên hệ: 035 966 0934
                  </a>
                </>
              ) : (
                <>
                  <Link
                    href="/medium"
                    className="bg-primary hover:bg-brand-hover text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors text-center"
                  >
                    Đặt S-Box (1-5 người)
                  </Link>
                  <Link
                    href="/large"
                    className="bg-primary hover:bg-brand-hover text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors text-center"
                  >
                    Đặt box Large (6-8 người)
                  </Link>
                  <a
                    href="tel:0359660934"
                    className="bg-white border-2 border-primary text-primary hover:bg-accent font-semibold py-3 px-8 rounded-lg transition-colors text-center"
                  >
                    Liên hệ: 035 966 0934
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
