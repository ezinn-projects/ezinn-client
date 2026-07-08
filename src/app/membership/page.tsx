import Typography from "@/components/ui/typography";
import {
  ArrowLeft,
  Cake,
  ChevronUp,
  Gift,
  PartyPopper,
  Star,
  Utensils,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chương trình thành viên Jozo | Giảm ngay 10%",
  description:
    "Đăng ký thành viên Jozo từ 10/7/2026 — giảm ngay 10%, ưu đãi sinh nhật, tích điểm, thăng hạng và quà khi đủ số lần ghé.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "Chương trình thành viên Jozo | Giảm ngay 10%",
    description:
      "Đăng ký thành viên Jozo từ 10/7/2026 — giảm ngay 10%, ưu đãi sinh nhật, tích điểm và quà hấp dẫn.",
    url: "/membership",
    images: ["/images/member-poster-final.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chương trình thành viên Jozo | Giảm ngay 10%",
    description:
      "Đăng ký thành viên Jozo từ 10/7/2026 — giảm ngay 10% và nhận ưu đãi hấp dẫn.",
    images: ["/images/member-poster-final.png"],
  },
};

const benefits = [
  {
    icon: Cake,
    title: "Ưu đãi sinh nhật",
    description: "Quà và ưu đãi đặc biệt dành riêng cho ngày sinh nhật của bạn.",
  },
  {
    icon: Star,
    title: "Tích điểm thành viên",
    description: "Mỗi lần sử dụng dịch vụ đều được cộng điểm vào tài khoản.",
  },
  {
    icon: ChevronUp,
    title: "Thăng hạng nhận ưu đãi",
    description: "Càng tích điểm càng lên hạng — mở khóa thêm nhiều quyền lợi.",
  },
  {
    icon: Gift,
    title: "Đủ 3 / 5 / 10 lần nhận quà",
    description: "Ghé đủ số lần để nhận quà hấp dẫn theo mốc 3, 5 và 10 lần.",
  },
  {
    icon: Utensils,
    title: "Tặng snack, nước & phút miễn phí",
    description: "Nhận snack, nước uống và miễn phí đến 20 phút theo chương trình.",
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-brand-hover mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero */}
          <div className="relative bg-gradient-to-br from-[#0f1118] via-[#1a0a0c] to-[#0b0c12] px-6 py-10 md:px-10 md:py-14 text-white overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,40,40,0.35),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.08),transparent_35%)]" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  <PartyPopper className="h-3.5 w-3.5" />
                  Bắt đầu từ 10/7/2026
                </span>
                <Typography
                  as="h1"
                  variant="bold"
                  className="text-3xl md:text-4xl leading-tight"
                >
                  Đăng ký thành viên Jozo
                </Typography>
                <div className="inline-flex items-center rounded-xl border-2 border-white/30 bg-primary px-4 py-2 shadow-[0_0_24px_rgba(220,38,38,0.45)]">
                  <span className="text-xl md:text-2xl font-extrabold tracking-wide">
                    GIẢM NGAY 10%
                  </span>
                </div>
                <Typography as="p" variant="default" className="text-white/80 text-base md:text-lg">
                  Thành viên nhận ngay ưu đãi hấp dẫn — play, sing, chill cùng Jozo.
                </Typography>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative aspect-[1086/1448] w-full overflow-hidden rounded-xl border border-white/15 shadow-2xl">
                  <Image
                    src="/images/member-poster-final.png"
                    alt="Poster chương trình thành viên Jozo"
                    fill
                    sizes="(min-width: 768px) 384px, 90vw"
                    className="object-contain bg-black"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            <div className="bg-accent/60 border-l-4 border-primary p-4 rounded">
              <Typography as="p" variant="semibold" className="text-primary text-lg">
                Từ ngày <strong>10/7/2026</strong>, đăng ký thành viên Jozo để
                nhận giảm ngay 10% và hàng loạt ưu đãi dành riêng cho hội viên.
              </Typography>
            </div>

            <section>
              <Typography
                as="h2"
                variant="semibold"
                className="text-2xl text-foreground mb-6"
              >
                Quyền lợi thành viên
              </Typography>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-red-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Typography
                      as="h3"
                      variant="semibold"
                      className="text-base text-foreground mb-1"
                    >
                      {title}
                    </Typography>
                    <Typography as="p" variant="default" className="text-primary/70 text-sm">
                      {description}
                    </Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography
                as="h2"
                variant="semibold"
                className="text-2xl text-foreground mb-4"
              >
                Cách tham gia
              </Typography>
              <ol className="list-decimal list-inside space-y-2 text-primary/80">
                <li>
                  Đăng ký tài khoản thành viên trên website Jozo (miễn phí).
                </li>
                <li>
                  Đăng nhập và sử dụng dịch vụ tại Jozo để nhận ưu đãi thành
                  viên.
                </li>
                <li>
                  Tích điểm, thăng hạng và đổi quà theo các mốc trong chương
                  trình.
                </li>
              </ol>
            </section>

            <section>
              <Typography
                as="h2"
                variant="semibold"
                className="text-2xl text-foreground mb-4"
              >
                Lưu ý
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Chương trình chính thức áp dụng từ ngày 10/7/2026.</li>
                <li>
                  Ưu đãi giảm 10% và các quyền lợi khác theo quy định tại quầy /
                  trên hệ thống thành viên.
                </li>
                <li>Không quy đổi ưu đãi thành tiền mặt.</li>
                <li>
                  Chi tiết điều kiện có thể thay đổi; vui lòng liên hệ hotline
                  hoặc nhân viên lễ tân khi đến cửa hàng.
                </li>
              </ul>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap pt-2">
              <Link
                href="/register"
                className="bg-primary hover:bg-brand-hover text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors text-center shadow-lg shadow-primary/25"
              >
                Đăng ký ngay!
              </Link>
              <a
                href="tel:0359660934"
                className="bg-white border-2 border-primary text-primary hover:bg-accent font-semibold py-3 px-8 rounded-lg transition-colors text-center"
              >
                Liên hệ: 035 966 0934
              </a>
            </div>

            <div className="pt-4 border-t border-primary/12 text-center">
              <Typography as="p" variant="default" className="text-primary/70">
                <strong>Hotline:</strong> 035 966 0934
                <br />
                <strong>Địa chỉ:</strong> 30 Phan Trung, P. Tam Hiệp, Đồng Nai
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
