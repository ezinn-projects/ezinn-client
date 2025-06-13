export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-xl p-8 border border-pink-200">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-lightpink to-purple-700 bg-clip-text text-transparent">
            JOZO Music Box
          </h1>
          <p className="text-lg text-gray-700 mt-3 font-medium">
            ✨ Norebang Hàn Quốc tại Biên Hòa ✨
          </p>
        </header>

        <section className="mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-bold text-lightpink mb-4 flex items-center">
            <span className="mr-2">🎵</span> JOZO Music Box là gì?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-lightpink">JOZO Music Box</span> là{" "}
            <span className="bg-yellow-100 px-1 rounded font-medium">
              phòng hát Norebang xịn xò nhất Biên Hòa
            </span>{" "}
            với vibe Hàn Quốc chuẩn không cần chỉnh! Bọn mình mang đến:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Âm thanh chuẩn studio siêu đỉnh 🎧",
              "Photobooth free không giới hạn 📸",
              "Props chụp hình cưng xỉu 🤳",
              "Giá hạt dẻ cho hội học sinh, sinh viên 💰",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center bg-pink-50 p-3 rounded-xl"
              >
                <span className="text-lightpink mr-2">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-bold text-lightpink mb-4 flex items-center">
            <span className="mr-2">💯</span> Tại sao chọn JOZO?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🎤",
                title: "Âm Thanh Đỉnh Cao",
                desc: "Mic xịn, loa xịn, nhạc cập nhật liên tục từ US-UK đến K-Pop!",
              },
              {
                icon: "📸",
                title: "Photobooth Free",
                desc: "Thoải mái pose dáng, chụp bao nhiêu cũng được!",
              },
              {
                icon: "📱",
                title: "Đặt Phòng Dễ Ẹc",
                desc: "Book phòng chỉ với vài click qua web, Zalo hoặc Facebook!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-lightpink">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-bold text-lightpink mb-4 flex items-center">
            <span className="mr-2">💬</span> Squad nói gì về JOZO?
          </h2>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl border-l-4 border-lightpink">
            <p className="text-gray-700 italic text-lg">
              &ldquo;Âm thanh xịn, photobooth free, giá sinh viên nữa! Quá cháy
              cho những buổi tụ tập cùng hội bạn thân. Đi một lần là ghiền luôn!
              💕&rdquo;
            </p>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 bg-lightpink rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="ml-3 font-semibold text-lightpink">
                Minh Anh, Sinh viên
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-bold text-lightpink mb-4 flex items-center">
            <span className="mr-2">🔥</span> Book phòng ngay!
          </h2>
          <p className="text-gray-700 mb-4">
            JOZO Music Box - Nơi lưu giữ những khoảnh khắc xịn xò cùng hội bạn
            thân!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center bg-pink-50 p-3 rounded-xl">
              <span className="text-2xl mr-3">📞</span>
              <div>
                <p className="font-bold text-lightpink">Hotline</p>
                <a
                  href="tel:0123456789"
                  className="text-gray-700 hover:text-lightpink transition"
                >
                  0366051204
                </a>
              </div>
            </div>
            <div className="flex items-center bg-pink-50 p-3 rounded-xl">
              <span className="text-2xl mr-3">📍</span>
              <div>
                <p className="font-bold text-lightpink">Địa chỉ</p>
                <p className="text-gray-700">
                  78 Phan Trung, Tân Mai, Biên Hòa, Đồng Nai
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: "Facebook", icon: "fb", color: "bg-blue-500" },
              { name: "TikTok", icon: "tt", color: "bg-black" },
              {
                name: "Instagram",
                icon: "ig",
                color:
                  "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
              },
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className={`${social.color} text-white px-5 py-2 rounded-full font-medium flex items-center hover:opacity-90 transition`}
              >
                {social.name}
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
