import Typography from "@/components/ui/typography";
import {
  getMembershipConfig,
  sortTierThresholds,
} from "@/lib/membership-config";
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
  title: "Thành viên Jozo | Giảm 10% khi đăng ký",
  description:
    "Từ 10/7/2026, đăng ký thành viên Jozo được giảm 10%. Có tích điểm, ưu đãi sinh nhật và quà khi ghé đủ số lần.",
  alternates: { canonical: "/membership" },
  openGraph: {
    title: "Thành viên Jozo | Giảm 10% khi đăng ký",
    description:
      "Từ 10/7/2026 đăng ký thành viên Jozo được giảm 10%, tích điểm và nhận quà khi ghé quán.",
    url: "/membership",
    images: ["/images/member-poster-final.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thành viên Jozo | Giảm 10% khi đăng ký",
    description:
      "Đăng ký thành viên từ 10/7/2026 — giảm 10% và có thêm ưu đãi khi ghé Jozo.",
    images: ["/images/member-poster-final.webp"],
  },
};

const formatPoints = (n: number) => n.toLocaleString("vi-VN");
const formatVnd = (n: number) => n.toLocaleString("vi-VN");

export default async function MembershipPage() {
  const config = await getMembershipConfig();
  const tiers = sortTierThresholds(config?.tierThresholds);
  const streakRewards = [...(config?.streak?.rewards || [])].sort(
    (a, b) => a.count - b.count,
  );
  const windowDays = config?.streak?.windowDays ?? 0;
  const pointPerCurrency = config?.pointPerCurrency ?? 0;
  const currencyUnit = config?.currencyUnit ?? 0;
  const birthdayMultiplier = config?.bonusRules?.birthdayMultiplier ?? 1;

  const streakMilestones =
    streakRewards.length > 0
      ? streakRewards.map((r) => r.count).join(", ")
      : "3, 5, 10";

  const benefits = [
    {
      icon: Cake,
      title: "Sinh nhật có quà",
      description:
        birthdayMultiplier > 1
          ? `Ngày sinh nhật điểm được nhân ${birthdayMultiplier} lần. Nhớ cập nhật ngày sinh trong tài khoản nhé.`
          : "Tới quán đúng ngày sinh nhật thì có ưu đãi riêng — hỏi lễ tân là được.",
    },
    {
      icon: Star,
      title: "Đi bao nhiêu tích điểm bấy nhiêu",
      description:
        pointPerCurrency > 0 && currencyUnit > 0
          ? `Cứ ${formatVnd(currencyUnit)}đ là được cộng ${formatPoints(pointPerCurrency)} điểm. Đi nhiều thì điểm lên nhanh.`
          : "Mỗi lần đặt phòng hay dùng dịch vụ đều được cộng điểm.",
    },
    {
      icon: ChevronUp,
      title: "Lên hạng thì đã hơn",
      description:
        tiers.length > 0
          ? `Có ${tiers.length} hạng. Đi đều, tích điểm đủ là lên — hạng cao hơn thì ưu đãi tốt hơn.`
          : "Tích đủ điểm là lên hạng. Hạng càng cao, ưu đãi càng đáng.",
    },
    {
      icon: Gift,
      title: `Ghé đủ ${streakMilestones} lần có quà`,
      description:
        windowDays > 0
          ? `Trong ${windowDays} ngày, ghé đủ mốc là nhận điểm thưởng và quà. Không cần làm gì thêm.`
          : "Ghé đủ số lần theo mốc là nhận quà — đơn giản vậy thôi.",
    },
    {
      icon: Utensils,
      title: "Snack, nước, thêm phút",
      description:
        "Tùy đợt có thể được tặng snack, nước hoặc thêm thời gian — chi tiết hỏi lễ tân khi tới.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="py-6 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-brand-hover mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Về trang chủ
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-[#0f1118] via-[#1a0a0c] to-[#0b0c12] px-6 py-10 md:px-10 md:py-14 text-white overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,40,40,0.35),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.08),transparent_35%)]" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  <PartyPopper className="h-3.5 w-3.5" />
                  Áp dụng từ 10/7/2026
                </span>
                <Typography
                  as="h1"
                  variant="bold"
                  className="text-3xl md:text-4xl leading-tight"
                >
                  Làm thành viên Jozo
                </Typography>
                <div className="inline-flex items-center rounded-xl border-2 border-white/30 bg-primary px-4 py-2 shadow-[0_0_24px_rgba(220,38,38,0.45)]">
                  <span className="text-xl md:text-2xl font-extrabold tracking-wide">
                    GIẢM NGAY 10%
                  </span>
                </div>
                <Typography
                  as="p"
                  variant="default"
                  className="text-white/80 text-base md:text-lg"
                >
                  Đăng ký miễn phí. Lần sau ghé quán là được giảm 10%, cộng thêm
                  điểm và quà nếu đi đều.
                </Typography>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative aspect-[1086/1448] w-full overflow-hidden rounded-xl border border-white/15 shadow-2xl">
                  <Image
                    src="/images/member-poster-final.webp"
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
              <Typography
                as="p"
                variant="semibold"
                className="text-primary text-lg"
              >
                Từ <strong>10/7/2026</strong>, cứ đăng ký xong là được giảm 10%
                khi dùng dịch vụ tại Jozo. Không có phí, không ràng buộc gì thêm.
              </Typography>
            </div>

            <section>
              <Typography
                as="h2"
                variant="semibold"
                className="text-2xl text-foreground mb-6"
              >
                Thành viên được gì?
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
                    <Typography
                      as="p"
                      variant="default"
                      className="text-primary/70 text-sm"
                    >
                      {description}
                    </Typography>
                  </div>
                ))}
              </div>
            </section>

            {tiers.length > 0 && (
              <section>
                <Typography
                  as="h2"
                  variant="semibold"
                  className="text-2xl text-foreground mb-4"
                >
                  Các hạng
                </Typography>
                {pointPerCurrency > 0 && currencyUnit > 0 && (
                  <Typography
                    as="p"
                    variant="default"
                    className="text-primary/70 text-sm mb-4"
                  >
                    Chi tiêu {formatVnd(currencyUnit)}đ thì cộng{" "}
                    {formatPoints(pointPerCurrency)} điểm.
                  </Typography>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {tiers.map(([name, points], index) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-white px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-primary/50">
                          Mốc {index + 1}
                        </p>
                        <p className="font-semibold text-foreground capitalize truncate">
                          {name}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-primary">
                        từ {formatPoints(points)} điểm
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {streakRewards.length > 0 && (
              <section>
                <Typography
                  as="h2"
                  variant="semibold"
                  className="text-2xl text-foreground mb-4"
                >
                  Quà khi ghé đều
                </Typography>
                {windowDays > 0 && (
                  <Typography
                    as="p"
                    variant="default"
                    className="text-primary/70 text-sm mb-4"
                  >
                    Đếm trong {windowDays} ngày. Đủ mốc nào nhận mốc đó.
                  </Typography>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {streakRewards.map((reward) => (
                    <div
                      key={reward.count}
                      className="rounded-xl border border-red-100 bg-white p-4"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {reward.count} lần
                      </p>
                      <p className="text-sm text-primary/70 mt-1">
                        +{formatPoints(reward.bonusPoints)} điểm
                        {reward.itemCount
                          ? `, kèm ${reward.itemCount} phần quà`
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <Typography
                as="h2"
                variant="semibold"
                className="text-2xl text-foreground mb-4"
              >
                Làm sao để tham gia?
              </Typography>
              <ol className="list-decimal list-inside space-y-2 text-primary/80">
                <li>Đăng ký tài khoản trên web Jozo — miễn phí.</li>
                <li>Lần sau đặt phòng hoặc ghé quán, nhớ đăng nhập.</li>
                <li>Đi đều thì điểm lên, hạng lên, có quà theo mốc.</li>
              </ol>
            </section>

            <section>
              <Typography
                as="h2"
                variant="semibold"
                className="text-2xl text-foreground mb-4"
              >
                Vài lưu ý nhỏ
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-primary/80">
                <li>Chương trình chạy chính thức từ 10/7/2026.</li>
                <li>
                  Giảm 10% và các ưu đãi khác theo quy định tại quán / trên hệ
                  thống.
                </li>
                <li>Không đổi ưu đãi ra tiền mặt.</li>
                <li>
                  Có gì thắc mắc thì gọi hotline hoặc hỏi lễ tân khi tới — tụi
                  mình hỗ trợ liền.
                </li>
              </ul>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap pt-2">
              <Link
                href="/register"
                className="bg-primary hover:bg-brand-hover text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-colors text-center shadow-lg shadow-primary/25"
              >
                Đăng ký miễn phí
              </Link>
              <a
                href="tel:0359660934"
                className="bg-white border-2 border-primary text-primary hover:bg-accent font-semibold py-3 px-8 rounded-lg transition-colors text-center"
              >
                Gọi 035 966 0934
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
