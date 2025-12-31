import Typography from "./ui/typography";

type PromotionContentProps = {
  promotionId: string;
};

export default function PromotionContent({ promotionId }: PromotionContentProps) {
  // Render content dựa vào promotion ID
  if (promotionId === "1") {
    return (
      <div className="space-y-6">
        <Typography as="h1" variant="bold" className="text-3xl text-lightpink mb-4">
          🎤 Chương trình khuyến mãi đặc biệt
        </Typography>

        <Typography as="h2" variant="bold" className="text-2xl text-lightpink mt-8 mb-4">
          Hát đủ 2 giờ - Miễn phí 1 giờ!
        </Typography>

        <Typography as="p" variant="default" className="text-gray-700 mb-4 leading-relaxed">
          Bạn là fan cuồng karaoke? Đây là cơ hội vàng để hát thả ga mà không lo hết tiền!
        </Typography>

        <div className="mt-8">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
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
              ✅ Áp dụng <strong>Thứ 2 - Thứ 6</strong> (không áp dụng cuối tuần)
            </li>
            <li className="text-gray-700">
              ✅ <strong>Miễn phí 1 giờ</strong> hát
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
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
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            📞 Liên hệ:
          </Typography>
          <Typography as="p" variant="default" className="text-gray-700 mb-4 leading-relaxed">
            <strong>Hotline:</strong> 035 966 0934
            <br />
            <strong>Địa chỉ:</strong> 78 Phan Trung, Tam Hiệp, Đồng Nai
          </Typography>
        </div>

        <div className="mt-8">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            ⚠️ Lưu ý:
          </Typography>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li className="text-gray-700">
              Không áp dụng đồng thời với các chương trình khuyến mãi khác
            </li>
            <li className="text-gray-700">Giờ tặng không được quy đổi thành tiền mặt</li>
          </ul>
        </div>
      </div>
    );
  }

  if (promotionId === "2") {
    return (
      <div className="space-y-6">
        <Typography as="h1" variant="bold" className="text-3xl text-lightpink mb-4">
          🎆 Đêm giao thừa rút lì xì may mắn
        </Typography>

        <Typography as="p" variant="default" className="text-gray-700 leading-relaxed">
          Thắp lửa countdown cùng Jozo đêm 31/12 giao 1/1/2026! Đặt box hát xuyên
          đêm, mỗi nhóm khách sẽ được rút lì xì may mắn trị giá lên tới{" "}
          <strong>50.000đ</strong> ngay khi chuyển giao năm mới.
        </Typography>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            ⏰ Khung giờ áp dụng
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Check-in từ <strong>20:00 31/12</strong> đến <strong>01:30 01/01/2026</strong>.</li>
            <li>Áp dụng cho mọi loại box, hát tối thiểu <strong>90 phút</strong>.</li>
            <li>Đặt trước hoặc đến trực tiếp đều được tham gia rút lì xì.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            🎁 Cách nhận lì xì
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Tablet hiển thị <strong>4 bao lì xì</strong> để khách tự chọn.</li>
            <li>Giá trị ngẫu nhiên từ <strong>5.000đ</strong> đến <strong>100.000đ</strong>.</li>
            <li>Áp dụng trừ trực tiếp vào bill trong đêm (không quy đổi tiền mặt).</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            ⚠️ Lưu ý
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Số lượng phong bì có hạn, ưu tiên theo thứ tự check-in.</li>
            <li>Không quy đổi lì xì thành tiền mặt; mỗi nhóm chỉ rút một lần.</li>
            <li>Vui lòng giữ hóa đơn để được hỗ trợ khi cần.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            📞 Liên hệ đặt box
          </Typography>
          <Typography as="p" variant="default" className="text-gray-700 leading-relaxed">
            Hotline: <strong>035 966 0934</strong>
            <br />
            Địa chỉ: <strong>78 Phan Trung, Tam Hiệp, Đồng Nai</strong>
          </Typography>
        </div>
      </div>
    );
  }

  if (promotionId === "3") {
    return (
      <div className="space-y-6">
        <Typography as="h1" variant="bold" className="text-3xl text-lightpink mb-4">
          🛎️ Book box trước: Giảm 10% (T2–T6) & 5% (T7, CN)
        </Typography>

        <Typography as="p" variant="default" className="text-gray-700 leading-relaxed">
          Chỉ cần đặt box trước trên <strong>mọi nền tảng của Jozo</strong> (web, app, hotline
          hoặc trực tiếp), bạn sẽ được giảm <strong>10%</strong> từ <strong>thứ 2 đến thứ 6</strong>{" "}
          cho tất cả khung giờ. Riêng <strong>thứ 7 và Chủ nhật</strong>, ưu đãi giảm <strong>5%</strong>{" "}
          áp dụng toàn bộ thời gian trong ngày.
        </Typography>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            ✅ Điều kiện & cách áp dụng
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Đặt trước qua web/app Jozo, hotline, Facebook hoặc TikTok.</li>
            <li>Áp dụng mọi loại box, mọi khung giờ trong tuần.</li>
            <li>Thứ 2–6: giảm 10%; Thứ 7, CN: giảm 5%.</li>
            <li>Không cần mã; lễ tân trừ trực tiếp trên hóa đơn.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            📅 Lưu ý
          </Typography>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Ưu đãi giảm 10%/5% bắt đầu áp dụng từ ngày 02/01/2026.</li>
            <li>Không áp dụng đồng thời với chương trình tặng giờ hoặc lì xì.</li>
            <li>Vui lòng giữ thông tin đặt chỗ (mã/điện thoại) để xác nhận ưu đãi.</li>
            <li>Áp dụng cho đơn phát sinh trong thời gian khuyến mãi, không quy đổi tiền mặt.</li>
          </ul>
        </div>

        <div className="mt-6">
          <Typography as="h3" variant="semibold" className="text-xl text-gray-800 mb-3">
            📞 Hỗ trợ đặt box
          </Typography>
          <Typography as="p" variant="default" className="text-gray-700 leading-relaxed">
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

