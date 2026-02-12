import Image from "next/image";
import Typography from "./ui/typography";
import tetScheduleImage from "@/assets/images/Tet.jpg";

type PromotionContentProps = {
  promotionId: string;
};

export default function PromotionContent({
  promotionId,
}: PromotionContentProps) {
  // Render content dựa vào promotion ID
  if (promotionId === "1") {
    return (
      <div className="space-y-6">
        <Typography
          as="h1"
          variant="bold"
          className="text-3xl text-lightpink mb-4"
        >
          🎤 Chương trình khuyến mãi đặc biệt
        </Typography>

        <Typography
          as="h2"
          variant="bold"
          className="text-2xl text-lightpink mt-8 mb-4"
        >
          Hát đủ 2 giờ - Miễn phí 1 giờ!
        </Typography>

        <Typography
          as="p"
          variant="default"
          className="text-gray-700 mb-4 leading-relaxed"
        >
          Bạn là fan cuồng karaoke? Đây là cơ hội vàng để hát thả ga mà không lo
          hết tiền!
        </Typography>

        <div className="mt-8">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            📋 Điều kiện áp dụng:
          </Typography>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li className="text-gray-700">
              ✅ Sử dụng box từ <strong>2 giờ trở lên</strong>
            </li>
            <li className="text-gray-700">
              ✅ Order snack hoặc nước uống từ <strong>35.000đ trở lên</strong>
            </li>
            <li className="text-gray-700">
              ✅ Thời gian áp dụng: <strong>10:00 - 19:00</strong>
            </li>
            <li className="text-gray-700">
              ✅ Áp dụng <strong>Thứ 2 - Thứ 6</strong> (không áp dụng cuối
              tuần)
            </li>
            <li className="text-gray-700">
              ✅ <strong>Miễn phí 1 giờ</strong> hát
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            🎁 Ưu đãi:
          </Typography>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li className="text-gray-700">Thời gian hát tăng gấp 1.5 lần</li>
            <li className="text-gray-700">Áp dụng cho tất cả các loại box</li>
            <li className="text-gray-700">
              Không giới hạn số lần sử dụng trong thời gian khuyến mãi
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            📞 Liên hệ:
          </Typography>
          <Typography
            as="p"
            variant="default"
            className="text-gray-700 mb-4 leading-relaxed"
          >
            <strong>Hotline:</strong> 035 966 0934
            <br />
            <strong>Địa chỉ:</strong> 78 Phan Trung, Tam Hiệp, Đồng Nai
          </Typography>
        </div>

        <div className="mt-8">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            ⚠️ Lưu ý:
          </Typography>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li className="text-gray-700">
              Không áp dụng đồng thời với các chương trình khuyến mãi khác
            </li>
            <li className="text-gray-700">
              Giờ tặng không được quy đổi thành tiền mặt
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (promotionId === "3") {
    return (
      <div className="space-y-6">
        <Typography
          as="h1"
          variant="bold"
          className="text-3xl text-lightpink mb-4"
        >
          🛎️ Book box trước: Giảm 10% (T2–T6) & 5% (T7, CN)
        </Typography>

        <Typography
          as="p"
          variant="default"
          className="text-gray-700 leading-relaxed"
        >
          Chỉ cần đặt box trước trên <strong>mọi nền tảng của Jozo</strong>{" "}
          (web, app, hotline hoặc trực tiếp), bạn sẽ được giảm{" "}
          <strong>10%</strong> từ <strong>thứ 2 đến thứ 6</strong> cho tất cả
          khung giờ. Riêng <strong>thứ 7 và Chủ nhật</strong>, ưu đãi giảm{" "}
          <strong>5%</strong> áp dụng toàn bộ thời gian trong ngày.
        </Typography>

        <div className="mt-6">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            ✅ Điều kiện & cách áp dụng
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Book box trước tối thiểu 1 tiếng</li>
            <li>Đặt trước qua web/app Jozo, hotline, Facebook hoặc TikTok.</li>
            <li>Áp dụng mọi loại box, mọi khung giờ trong tuần.</li>
            <li>Thứ 2–6: giảm 10%; Thứ 7, CN: giảm 5%.</li>
            <li>Không cần mã; lễ tân trừ trực tiếp trên hóa đơn.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            📅 Lưu ý
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Ưu đãi giảm 10%/5% bắt đầu áp dụng từ ngày 02/01/2026.</li>
            <li>Không áp dụng đồng thời với các chương trình tặng giờ khác.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            📞 Hỗ trợ đặt box
          </Typography>
          <Typography
            as="p"
            variant="default"
            className="text-gray-700 leading-relaxed"
          >
            Hotline: <strong>035 966 0934</strong>
            <br />
            Địa chỉ: <strong>78 Phan Trung, Tam Hiệp, Đồng Nai</strong>
          </Typography>
        </div>
      </div>
    );
  }

  if (promotionId === "4") {
    return (
      <div className="space-y-6">
        <Typography
          as="h1"
          variant="bold"
          className="text-3xl text-lightpink mb-4"
        >
          🧧 Thông báo Lịch hoạt động Tết 2026
        </Typography>

        <div className="relative w-full rounded-xl overflow-hidden border-2 border-amber-200 shadow-lg my-8">
          <Image
            src={tetScheduleImage}
            alt="Lịch hoạt động Tết Jozo 2026"
            className="object-contain w-full"
            priority
          />
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg my-6">
          <Typography
            as="p"
            variant="semibold"
            className="text-amber-900 text-lg"
          >
            ⚠️ Quan trọng: <strong>Mùng 1 Tết (17/02/2026)</strong> Jozo không hoạt động. Quý khách vui lòng sắp xếp đặt phòng trước hoặc sau ngày này.
          </Typography>
        </div>

        <Typography
          as="p"
          variant="default"
          className="text-gray-700 leading-relaxed"
        >
          Jozo Music Box kính chúc quý khách một mùa Tết an lành, hạnh phúc. Trong dịp Tết Nguyên Đán 2026, Jozo <strong>không phụ thu, không tăng giá</strong> và dành tặng <strong>giảm 5% khi đặt phòng trước</strong>. Dưới đây là lịch hoạt động chi tiết:
        </Typography>

        <div className="mt-6">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            📅 Lịch hoạt động Tết
          </Typography>
          <ul className="space-y-3 text-gray-700">
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold">9/2 – 15/2/2026 (22–28 Âm lịch):</span>
              <span>Hoạt động 10:00 – 0:30</span>
            </li>
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold">16/2/2026 (29/12 Âm lịch):</span>
              <span>Hoạt động 10:00 – 21:00</span>
            </li>
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold text-red-600">17/2/2026 (Mùng 1 Tết):</span>
              <span className="font-semibold text-red-600">NGHỈ – Jozo không hoạt động</span>
            </li>
            <li className="flex flex-wrap gap-2">
              <span className="font-semibold">18/2 – 22/2/2026 (Từ Mùng 2 Tết):</span>
              <span>Hoạt động 10:00 – 0:30</span>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            🎁 Ưu đãi Tết
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Không phụ thu / không tăng giá dịp Tết</li>
            <li>Giảm 5% khi đặt phòng trước</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography
            as="h3"
            variant="semibold"
            className="text-xl text-gray-800 mb-3"
          >
            📞 Liên hệ
          </Typography>
          <Typography
            as="p"
            variant="default"
            className="text-gray-700 leading-relaxed"
          >
            <strong>Hotline:</strong> 0359 660 934
            <br />
            <strong>Tiktok:</strong> Jozo Music Box
            <br />
            <strong>Website:</strong> jozo.com.vn
            <br />
            <strong>Địa chỉ:</strong> 78 Phan Trung, Tam Hiệp, Đồng Nai
          </Typography>
        </div>
      </div>
    );
  }

  // Default fallback cho promotion khác
  return (
    <Typography as="p" variant="default" className="text-gray-700">
      Nội dung khuyến mãi đang được cập nhật...
    </Typography>
  );
}
