import Typography from "./ui/typography";

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

  // Default fallback cho promotion khác
  return (
    <Typography as="p" variant="default" className="text-gray-700">
      Nội dung khuyến mãi đang được cập nhật...
    </Typography>
  );
}
