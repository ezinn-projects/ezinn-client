export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          Giới Thiệu Về Ezinn Homestay
        </h1>
        <p className="text-lg text-gray-300 mt-2">
          Không gian riêng tư, tiện nghi và giá cả hợp lý
        </p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Ezinn Homestay là gì?
        </h2>
        <p className="text-gray-400 leading-relaxed">
          <strong>Ezinn Homestay</strong> tự hào là lựa chọn hàng đầu cho những
          ai tìm kiếm{" "}
          <span className="text-white font-semibold">
            không gian riêng tư, tiện nghi và giá cả hợp lý
          </span>
          . Chúng tôi cung cấp dịch vụ{" "}
          <strong>cho thuê homestay ngắn hạn</strong> với đầy đủ tiện nghi cao
          cấp, phù hợp cho:
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Các cặp đôi muốn tận hưởng những khoảnh khắc lãng mạn.</li>
          <li>Những ai cần một nơi thư giãn và riêng tư.</li>
          <li>
            Tổ chức sinh nhật, buổi gặp mặt thân mật hoặc các dịp đặc biệt.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Vì Sao Chọn Ezinn Homestay?
        </h2>
        <div className="text-gray-400 leading-relaxed space-y-4">
          <p>
            <strong>1. Không Gian Riêng Tư Hoàn Hảo:</strong> Mỗi phòng được
            thiết kế kín đáo, cách âm tốt, đảm bảo sự yên tĩnh tuyệt đối.
          </p>
          <p>
            <strong>2. Tiện Nghi Hiện Đại:</strong> Smart TV với Netflix, giường
            đôi thoải mái, máy lạnh, tủ lạnh mini, và hệ thống tự check-in.
          </p>
          <p>
            <strong>3. Giá Cả Cạnh Tranh:</strong> Cam kết mức giá rẻ nhất trong
            phân khúc homestay cao cấp.
          </p>
          <p>
            <strong>4. Vị Trí Thuận Lợi:</strong> Tọa lạc tại các vị trí trung
            tâm, giúp bạn dễ dàng di chuyển.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Khách Hàng Nói Gì?
        </h2>
        <blockquote className="border-l-4 border-gray-600 pl-4 text-gray-300 italic">
          &quot;Phòng rất sạch sẽ, không gian riêng tư đúng như mong đợi. Hệ
          thống check-in hiện đại giúp tôi tiết kiệm thời gian. Tôi chắc chắn sẽ
          quay lại.&quot; <br />
          <span className="block text-gray-400 mt-2 font-semibold">
            — Minh Trí, Khách Hàng
          </span>
        </blockquote>
        <blockquote className="border-l-4 border-gray-600 pl-4 text-gray-300 italic mt-4">
          &quot;Ezinn Homestay là nơi lý tưởng cho những dịp đặc biệt. Tôi đã tổ
          chức sinh nhật tại đây và rất hài lòng với không gian cũng như dịch
          vụ.&quot; <br />
          <span className="block text-gray-400 mt-2 font-semibold">
            — Thùy Trang, Khách Hàng
          </span>
        </blockquote>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Đặt Phòng Tại Ezinn Homestay Ngay Hôm Nay!
        </h2>
        <p className="text-gray-400">
          Ezinn Homestay luôn sẵn sàng chào đón bạn. Hãy đặt phòng ngay hôm nay
          để tận hưởng không gian{" "}
          <span className="text-white">chill & free</span>, dịch vụ cao cấp với
          giá thành phải chăng.
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <strong>Hotline:</strong>{" "}
            <a href="tel:1900XXX" className="text-accent">
              1900-XXX-XXX
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@ezinnhomestay.vn" className="text-accent">
              support@ezinnhomestay.vn
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://www.ezinnhomestay.vn"
              target="_blank"
              className="text-accent"
            >
              www.ezinnhomestay.vn
            </a>
          </li>
        </ul>
        <div className="flex space-x-4 mt-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="text-accent hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.tiktok.com/@ezinnhomestay"
            target="_blank"
            className="text-accent hover:underline"
          >
            TikTok
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            className="text-accent hover:underline"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
