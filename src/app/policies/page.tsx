export default function PoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-lightpink mb-8">
        Chính Sách JOZO Music Box - Phòng Hát Norebang Biên Hòa
      </h1>

      {/* Chính Sách Đặt Phòng */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-lightpink mb-4 border-b pb-2">
          Chính Sách Đặt Phòng tại Jozo
        </h2>
        <p className="text-gray-700 mb-4">
          JOZO Music Box - Phòng hát theo phong cách Norebang Hàn Quốc đầu tiên
          tại Biên Hòa, với không gian chill, âm thanh chuẩn studio và giá cả
          siêu hợp lý cho hội bạn thân.
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-3">
          <li className="flex items-start">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Book phòng dễ ẹc qua Zalo, Facebook hoặc website chỉ với vài
              click.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-lightpink mr-2">•</span>
            <span>Xác nhận đặt phòng nhanh như chớp qua tin nhắn.</span>
          </li>
          <li className="flex flex-col">
            <div className="flex items-start">
              <span className="text-lightpink mr-2">•</span>
              <span className="font-bold">Ưu đãi xịn sò:</span>
            </div>
            <ul className="ml-6 mt-2 space-y-2">
              <li className="flex items-start">
                <span className="text-lightpink mr-2">◦</span>
                <span>
                  <span className="font-medium">Photobooth free 100%:</span>{" "}
                  Thoải mái pose hình, chụp không giới hạn trong suốt thời gian
                  thuê phòng.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-lightpink mr-2">◦</span>
                <span>
                  <span className="font-medium">Phòng hát siêu rộng:</span> Đủ
                  chỗ cho cả squad 10 người/phòng.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-lightpink mr-2">◦</span>
                <span>
                  <span className="font-medium">
                    Giá ưu đãi cho học sinh, sinh viên:
                  </span>{" "}
                  Giảm ngay 20% khi show thẻ sinh viên - quẩy hết mình không lo
                  về giá!
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-lightpink mr-2">◦</span>
                <span>
                  <span className="font-medium">Sinh nhật free nước:</span> Đặt
                  phòng vào ngày sinh nhật và nhận ngay nước miễn phí.
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      {/* Chính Sách Hủy Phòng */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-lightpink mb-4 border-b pb-2">
          Chính Sách Hủy Đặt Phòng Music Box JOZO
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-3">
          <li className="flex items-start">
            <span className="text-lightpink mr-2">•</span>
            <span>Inbox trực tiếp cho JOZO để hủy đặt phòng nhé!</span>
          </li>
          <li className="flex items-start">
            <span className="text-lightpink mr-2">•</span>
            <span>
              JOZO sẽ giữ phòng cho bạn tối đa 15 phút kể từ giờ đặt (đừng để
              hội bạn đợi lâu nha).
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Sau 15 phút, JOZO có quyền nhận khách khác nếu bạn không đến
              (sorry nha, nhưng phải công bằng với mọi người).
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Hủy trước 2 giờ: không mất phí. Hủy trễ hơn: có thể áp dụng phí
              nhỏ (tùy trường hợp).
            </span>
          </li>
        </ul>
      </section>

      {/* Chính Sách Giá */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-lightpink mb-4 border-b pb-2">
          Bảng Giá Music Box JOZO Biên Hòa
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-red-50 p-4 rounded-lg border border-lightpink">
            <h3 className="font-bold text-lightpink mb-2">
              Giờ relax (8:00 - 17:00)
            </h3>
            <p className="text-gray-700">
              Chỉ từ 100,000 VND/giờ - giá siêu hời cho team đi sớm.
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-lightpink">
            <h3 className="font-bold text-lightpink mb-2">
              Giờ high time (17:00 - 22:00)
            </h3>
            <p className="text-gray-700">
              150,000 VND/giờ - giá chuẩn cho những buổi tối đáng nhớ.
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-lightpink">
            <h3 className="font-bold text-lightpink mb-2">Combo 3 giờ</h3>
            <p className="text-gray-700">
              Giảm 20%, tặng kèm nước uống - càng hát lâu càng lời!
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-lightpink">
            <h3 className="font-bold text-lightpink mb-2">Gói Squad</h3>
            <p className="text-gray-700">
              Đặt phòng cho nhóm 8+ người được giảm thêm 10% tổng hóa đơn.
            </p>
          </div>
          <div className="md:col-span-2 bg-red-50 p-4 rounded-lg border border-lightpink">
            <h3 className="font-bold text-lightpink mb-2">Happy Hour</h3>
            <p className="text-gray-700">
              Giảm 15% khi đặt phòng vào khung giờ 13:00-15:00 các ngày trong
              tuần.
            </p>
          </div>
        </div>
      </section>

      {/* Quy Định Sử Dụng */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-lightpink mb-4 border-b pb-2">
          Quy Định Sử Dụng Phòng Hát
        </h2>
        <ul className="text-gray-700 mt-4 space-y-4">
          <li className="flex items-start">
            <div className="bg-lightpink text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
              1
            </div>
            <span>
              Giữ gìn thiết bị âm thanh, micro xịn sò của chúng mình nhé!
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-lightpink text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
              2
            </div>
            <span>
              Không hút thuốc trong phòng hát (hút thuốc có hại cho giọng hát
              của bạn đó).
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-lightpink text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">Quy định về âm lượng:</p>
              <ul className="ml-2 mt-2 space-y-2">
                <li className="flex items-center">
                  <span className="text-lightpink mr-2">◦</span>
                  <span>
                    Cứ thoải mái cháy hết mình, nhưng đừng phá tan loa nhé!
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-lightpink mr-2">◦</span>
                  <span>Respect không gian chung của các phòng khác.</span>
                </li>
                <li className="flex items-center">
                  <span className="text-lightpink mr-2">◦</span>
                  <span>
                    Staff của JOZO siêu thân thiện, nghe lời họ một chút nha!
                  </span>
                </li>
              </ul>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-lightpink text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
              4
            </div>
            <span>
              Được mang đồ ăn nhẹ từ bên ngoài, nhưng giữ phòng sạch sẽ giúp
              mình nhé!
            </span>
          </li>
          <li className="flex items-start">
            <div className="bg-lightpink text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
              5
            </div>
            <span>
              Không mang chất cấm vào phòng - JOZO là nơi vui chơi lành mạnh!
            </span>
          </li>
        </ul>
        <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-lightpink">
          <p className="text-gray-700">
            JOZO cam kết mang đến trải nghiệm âm nhạc Hàn Quốc đỉnh cao nhất tại
            Biên Hòa. Hát, nhảy và quẩy hết mình!
          </p>
        </div>
      </section>

      {/* Chính Sách Bảo Mật */}
      <section className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-lightpink mb-4 border-b pb-2">
          Chính Sách Bảo Mật Thông Tin
        </h2>
        <div className="flex items-center mb-4">
          <div className="bg-lightpink p-2 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-gray-700">
            JOZO Music Box cam kết bảo mật 100% thông tin của bạn theo quy định
            pháp luật. Chill thôi, thông tin của bạn an toàn với chúng mình!
          </p>
        </div>
        <ul className="text-gray-700 mt-6 space-y-3">
          <li className="flex items-start bg-gray-50 p-3 rounded-lg">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Bảo mật thông tin cá nhân: số điện thoại, email - không ai biết
              được đâu!
            </span>
          </li>
          <li className="flex items-start bg-gray-50 p-3 rounded-lg">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Không chia sẻ hình ảnh photobooth khi chưa được phép - trừ khi bạn
              muốn flex trên page của JOZO.
            </span>
          </li>
          <li className="flex items-start bg-gray-50 p-3 rounded-lg">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Bảo vệ quyền riêng tư của khách hàng là ưu tiên số 1 của chúng
              mình.
            </span>
          </li>
          <li className="flex items-start bg-gray-50 p-3 rounded-lg">
            <span className="text-lightpink mr-2">•</span>
            <span>
              Dữ liệu đặt phòng chỉ được sử dụng để nâng cao trải nghiệm của bạn
              tại JOZO.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
