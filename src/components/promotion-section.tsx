import Link from "next/link";
import Typography from "./ui/typography";
import PromotionCard from "./promotion-card";
import { Promotion } from "@/types/promotion";

type PromotionSectionProps = {
  promotions: Promotion[];
};

// Section hiển thị khuyến mãi với box riêng, ít icon
export default function PromotionSection({
  promotions,
}: PromotionSectionProps) {
  if (!promotions.length) return null;

  const featuredHot = promotions.find(
    (p) => p.slug === "jozo-comeback-tang-2-gio",
  );

  return (
    <section className="mb-16">
      <div className="bg-white/80 backdrop-blur border border-border rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <Typography
              as="h2"
              variant="bold"
              className="text-3xl !text-primary mb-2"
            >
              Khuyến mãi hot
            </Typography>
          </div>
          <div className="px-3 py-1 text-sm font-semibold text-primary bg-accent border border-border rounded-full">
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
