export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-8 rounded-lg">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-zinc-900">
          JOZO Music Box - Phòng Hát Karaoke Norebang Biên Hòa
        </h1>
        <p className="text-lg text-white mt-2">
          Trải nghiệm Karaoke phong cách Hàn Quốc đầu tiên tại Biên Hòa
        </p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          JOZO Music Box là gì?
        </h2>
        <p className="text-zinc-800 leading-relaxed">
          <strong className="text-white">JOZO Music Box</strong> tự hào là{" "}
          <span className="text-zinc-900 font-semibold">
            phòng hát karaoke Norebang phong cách Hàn Quốc đầu tiên tại Biên Hòa
          </span>
          . Chúng tôi mang đến trải nghiệm giải trí hoàn toàn mới với:
        </p>
        <ul className="list-disc list-inside text-zinc-800 mt-4 space-y-2">
          <li>Âm thanh chuẩn studio chuyên nghiệp</li>
          <li>Photobooth miễn phí không giới hạn</li>
          <li>Phụ kiện chụp hình xịn xò</li>
          <li>Giá cả phù hợp cho học sinh, sinh viên</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Tại sao chọn JOZO Music Box?
        </h2>
        <div className="text-zinc-800 leading-relaxed space-y-4">
          <p>
            <strong className="text-white">1. Âm Thanh Đỉnh Cao:</strong> Hệ
            thống âm thanh chuẩn studio, micro chuyên nghiệp, danh sách nhạc đa
            dạng cập nhật liên tục.
          </p>
          <p>
            <strong className="text-white">2. Photobooth Miễn Phí:</strong> Chụp
            ảnh không giới hạn, lưu giữ khoảnh khắc vui vẻ cùng bạn bè.
          </p>
          <p>
            <strong className="text-white">3. Giá Sinh Viên:</strong> Giảm 20%
            khi xuất trình thẻ sinh viên, nhiều ưu đãi hấp dẫn.
          </p>
          <p>
            <strong className="text-white">4. Đặt Phòng Dễ Dàng:</strong> Đặt
            phòng nhanh chóng qua website, Zalo hoặc Facebook.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Khách Hàng Nói Gì?
        </h2>
        <blockquote className="border-l-4 border-white pl-4 text-zinc-800 italic">
          &ldquo;Âm thanh chuẩn studio, photobooth miễn phí, giá sinh viên nữa!
          Quá tuyệt vời cho những buổi gặp mặt bạn bè.&rdquo; <br />
          <span className="block text-white mt-2 font-semibold">
            — Minh Anh, Sinh viên
          </span>
        </blockquote>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Đặt Phòng Ngay!
        </h2>
        <p className="text-zinc-800">
          JOZO Music Box - Nơi những kỷ niệm được lưu giữ bằng âm nhạc và hình
          ảnh.
        </p>
        <ul className="mt-4 space-y-2 text-zinc-800">
          <li>
            <strong className="text-white">Hotline:</strong>{" "}
            <a href="tel:0123456789" className="hover:text-white">
              0123.456.789
            </a>
          </li>
          <li>
            <strong className="text-white">Địa chỉ:</strong> 123 Đường ABC,
            Phường XYZ, TP. Biên Hòa
          </li>
        </ul>
        <div className="flex space-x-4 mt-4">
          <a href="#" target="_blank" className="text-white hover:text-white">
            Facebook
          </a>
          <a href="#" target="_blank" className="text-white hover:text-white">
            TikTok
          </a>
          <a href="#" target="_blank" className="text-white hover:text-white">
            Instagram
          </a>
        </div>
      </section>
    </section>
  );
}
