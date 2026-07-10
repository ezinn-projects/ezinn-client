import type { Metadata } from "next";
import { Suspense } from "react";
import TestimonialCarousel from "@/components/carousel";
import HomeRoomSection from "@/components/home-room-section";
import PromotionSection from "@/components/promotion-section";
import FloatingContactButtons from "@/components/floating-contact-buttons";
import { promotions } from "@/data/promotions";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "JOZO Music Box Biên Hòa | Box   giá sinh viên",
  description:
    "Đặt box riêng tư tại JOZO Biên Hòa: âm thanh studio, phụ kiện chụp hình miễn phí, giá sinh viên. Đặt online để giữ chỗ.",
  keywords: [
    "jozo",
    "music box",
    "music box biên hòa",
    "box style hàn quốc",
    "music box giá sinh viên",
    "đặt phòng music box",
    "box riêng tư",
    "phụ kiện chụp hình",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JOZO Music Box Biên Hòa | Box   giá sinh viên",
    description:
      "Không gian box   âm thanh studio, phụ kiện chụp hình miễn phí. Đặt online để giữ chỗ tại JOZO Biên Hòa.",
    url: "/",
    images: ["/images/member-poster-final.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOZO Music Box Biên Hòa | Box   giá sinh viên",
    description:
      "Box   âm thanh studio, phụ kiện chụp hình miễn phí. Đặt online để giữ chỗ tại JOZO Biên Hòa.",
    images: ["/images/member-poster-final.webp"],
  },
};

function RoomSectionSkeleton() {
  return (
    <section className="mb-10 sm:mb-16 border border-border bg-gradient-to-b from-card to-muted/60 p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-sm animate-pulse">
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-muted/80 aspect-[4/3]" />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="w-full">
        <TestimonialCarousel />
        <PromotionSection promotions={promotions} />

        <Suspense fallback={<RoomSectionSkeleton />}>
          <HomeRoomSection />
        </Suspense>
      </div>
      <FloatingContactButtons />
    </>
  );
}
