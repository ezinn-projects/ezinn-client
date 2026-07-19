export type JozoServiceId =
  | "music-box"
  | "netflix"
  | "nintendo-switch"
  | "board-game";

export type JozoService = {
  id: JozoServiceId;
  title: string;
  tagline: string;
  summary: string;
  highlights: string[];
  bookingLabel: string;
  bookingHref: string;
  keywords: string[];
};

export const jozoVenue = {
  name: "JOZO Biên Hòa",
  address: "30 Phan Trung, Tam Hiệp, Biên Hòa, Đồng Nai",
  headline: "Tổ hợp giải trí đa dạng tại Biên Hòa",
  intro:
    "JOZO — viết tắt của Joy Zone — là không gian vui chơi, giải trí đa dạng tại Biên Hòa, nơi bạn có thể hát Music Box, xem Netflix, chơi Nintendo Switch và Board Game cùng bạn bè. Phòng rộng rãi, giá hợp lý, không phụ thu, không tính thuế.",
};

export const jozoServices: JozoService[] = [
  {
    id: "music-box",
    title: "Music Box",
    tagline: "Phòng rộng rãi — box riêng chỉ có nhóm mình",
    summary:
      "Không gian box đang dạng concept, rộng rãi và thoải mái. S-Box 1–5 người, L-Box 6–8 người trang bị sẵn 4 mic. Âm thanh studio, phụ kiện chụp hình miễn phí. Giá rẻ — không phụ thu, không tính thuế.",
    highlights: [
      "Phòng rộng rãi · S-Box 1–5 · L-Box 6–8 người",
      "L-Box trang bị sẵn 4 mic",
      "Giá rẻ — không phụ thu, không tính thuế",
      "Phụ kiện chụp hình miễn phí",
    ],
    bookingLabel: "Đặt box",
    bookingHref: "/#booking",
    keywords: [
      "music box biên hòa",
      "box riêng tư",
      "box style hàn quốc",
      "đặt phòng music box",
      "giá rẻ không phụ thu",
    ],
  },
  {
    id: "netflix",
    title: "Netflix",
    tagline: "Xem phim / series chill cùng nhóm",
    summary:
      "Góc xem Netflix tại JOZO — chọn phim hoặc series yêu thích, ngồi chill cùng bạn bè. Kết hợp snack và nước uống tại quán. Phù hợp nhóm muốn thư giãn, không cần mang thiết bị theo.",
    highlights: [
      "Xem Netflix tại quán",
      "Phù hợp nhóm chill / thư giãn",
      "Kết hợp snack & nước uống",
      "Không cần mang thiết bị theo",
    ],
    bookingLabel: "Ghé JOZO",
    bookingHref: "/#booking",
    keywords: [
      "netflix biên hòa",
      "xem netflix tại quán",
      "xem phim biên hòa",
      "chill xem phim biên hòa",
    ],
  },
  {
    id: "nintendo-switch",
    title: "Nintendo Switch",
    tagline: "Khu Dorm — chơi game chung",
    summary:
      "Khu chơi Nintendo Switch chung, không phải phòng kín. Mang theo bạn bè, chọn game và chơi thoải mái. Phù hợp nhóm 2–4 người, tính giờ theo bảng giá Dorm.",
    highlights: [
      "Khu chung, không phải phòng riêng",
      "Nintendo Switch sẵn tại quán",
      "Phù hợp nhóm 2–4 người",
      "Tính giờ theo bảng giá Dorm",
    ],
    bookingLabel: "Đặt Dorm",
    bookingHref: "/dorm",
    keywords: ["nintendo switch biên hòa", "chơi game tại quán", "dorm jozo"],
  },
  {
    id: "board-game",
    title: "Board Game",
    tagline: "Ngồi chơi tại quán — không cần mang theo",
    summary:
      "Board game có sẵn tại JOZO: Uno, Ma Sói và nhiều tựa khác tùy đợt. Gọi đồ uống, ngồi chơi cùng bạn bè. Không cần đặt trước — ghé quán là chơi được.",
    highlights: [
      "Uno, Ma Sói và nhiều tựa khác",
      "Có sẵn tại quán, không cần mang theo",
      "Không cần đặt trước",
      "Kết hợp snack & nước uống tại chỗ",
    ],
    bookingLabel: "Ghé JOZO",
    bookingHref: "/#booking",
    keywords: ["board game biên hòa", "uno", "ma sói"],
  },
];

export const jozoServicesSeoDescription =
  "JOZO Biên Hòa — tổ hợp giải trí đa dạng: music box, Netflix, Nintendo Switch và board game. Giá rẻ, không phụ thu, không tính thuế. 30 Phan Trung, Tam Hiệp.";

export const jozoServicesFaq = [
  {
    question: "JOZO có nghĩa là gì?",
    answer:
      "JOZO là viết tắt của Joy Zone — không gian vui chơi, giải trí đa dạng dành cho những buổi gặp gỡ và thư giãn cùng bạn bè tại Biên Hòa.",
  },
  {
    question: "JOZO có những dịch vụ gì?",
    answer:
      "JOZO là tổ hợp giải trí đa dạng tại Biên Hòa gồm music box, xem Netflix, khu Nintendo Switch (Dorm) và board game có sẵn tại quán.",
  },
  {
    question: "Music box tại JOZO có gì?",
    answer:
      "Phòng box rộng rãi, đa dạng concept — S-Box 1–5 người, L-Box 6–8 người trang bị sẵn 4 mic. Âm thanh studio, phụ kiện chụp hình miễn phí. Giá rẻ, không phụ thu, không tính thuế.",
  },
  {
    question: "JOZO có xem Netflix không?",
    answer:
      "Có. JOZO có góc xem Netflix để nhóm bạn ngồi chill, chọn phim hoặc series — kết hợp snack và đồ uống tại quán, không cần mang thiết bị theo.",
  },
  {
    question: "Giá tại JOZO có phụ thu hay thuế không?",
    answer:
      "Không. Giá trên bảng giá là giá bạn trả — không phụ thu, không tính thuế thêm.",
  },
  {
    question: "Dorm Nintendo Switch là gì?",
    answer:
      "Dorm là khu chơi Nintendo Switch chung tại JOZO — không phải phòng box riêng. Bạn đi nhóm, chọn game và chơi thoải mái. Giá tính theo giờ trên bảng giá Dorm.",
  },
  {
    question: "Board game có cần đặt trước không?",
    answer:
      "Không cần đặt trước. JOZO có sẵn board game như Uno, Ma Sói tại quán — ghé và chơi tại chỗ, kết hợp đồ uống và snack.",
  },
];

export const jozoServicesKeywords = [
  "jozo biên hòa",
  "tổ hợp giải trí biên hòa",
  "tổ hợp giải trí đa dạng biên hòa",
  ...jozoServices.flatMap((service) => service.keywords),
];

export function buildJozoServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EntertainmentBusiness",
        "@id": "https://jozo.com.vn/gioi-thieu#business",
        name: jozoVenue.name,
        description: jozoServicesSeoDescription,
        url: "https://jozo.com.vn/gioi-thieu",
        address: {
          "@type": "PostalAddress",
          streetAddress: "30 Phan Trung",
          addressLocality: "Tam Hiệp, Biên Hòa",
          addressRegion: "Đồng Nai",
          addressCountry: "VN",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dịch vụ giải trí tại JOZO",
          itemListElement: jozoServices.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://jozo.com.vn/gioi-thieu#faq",
        mainEntity: jozoServicesFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
