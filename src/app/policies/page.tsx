export default function PoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-200">
      <h1 className="text-4xl font-bold dark:text-white text-black mb-6">
        Chính Sách JOZO Music Box - Phòng Hát Karaoke Norebang Biên Hòa
      </h1>

      {/* Chính Sách Đặt Phòng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Đặt Phòng tại Jozo
        </h2>
        <p className="text-gray-400">
          JOZO Music Box - Phòng hát karaoke theo phong cách Norebang Hàn Quốc
          đầu tiên tại Biên Hòa, với không gian hiện đại, âm thanh chuẩn studio
          và giá cả phù hợp cho giới trẻ.
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Đặt phòng dễ dàng qua Zalo, Facebook hoặc website.</li>
          <li>Xác nhận đặt phòng nhanh chóng qua tin nhắn.</li>
          <li>
            <strong>Ưu đãi đặc biệt:</strong>
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li>
                <strong>Miễn phí Photobooth:</strong> Chụp ảnh không giới hạn
                trong thời gian thuê phòng.
              </li>
              <li>
                <strong>Phòng hát rộng rãi:</strong> Sức chứa lên đến 10
                người/phòng.
              </li>
              <li>
                <strong>Giá sinh viên:</strong> Giảm 20% khi xuất trình thẻ sinh
                viên.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      {/* Chính Sách Hủy Phòng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Hủy Đặt Phòng Music Box JOZO
        </h2>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Vui lòng liên hệ trực tiếp với JOZO để hủy đặt phòng.</li>
          <li>JOZO sẽ giữ phòng cho quý khách tối đa 15 phút kể từ giờ đặt.</li>
          <li>
            Sau 15 phút, JOZO có quyền nhận khách khác nếu quý khách không đến.
          </li>
        </ul>
      </section>

      {/* Chính Sách Giá */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Bảng Giá Music Box JOZO Biên Hòa
        </h2>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>
            <strong>Giờ thường (8:00 - 17:00):</strong> Chỉ từ 100,000 VND/giờ.
          </li>
          <li>
            <strong>Giờ cao điểm (17:00 - 22:00):</strong> 150,000 VND/giờ.
          </li>
          <li>
            <strong>Combo 3 giờ:</strong> Giảm 20%, tặng nước uống.
          </li>
        </ul>
      </section>

      {/* Quy Định Sử Dụng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Quy Định Sử Dụng Phòng Hát
        </h2>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Giữ gìn thiết bị âm thanh, micro chuyên nghiệp.</li>
          <li>Không hút thuốc trong phòng hát.</li>
          <li>
            Quy định về âm lượng:
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li>Duy trì âm lượng phù hợp.</li>
              <li>Tôn trọng không gian chung.</li>
              <li>Tuân thủ hướng dẫn của nhân viên.</li>
            </ul>
          </li>
        </ul>
        <p className="text-gray-400 mt-4">
          JOZO cam kết mang đến trải nghiệm karaoke Hàn Quốc chất lượng nhất tại
          Biên Hòa.
        </p>
      </section>

      {/* Chính Sách Bảo Mật */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Bảo Mật Thông Tin
        </h2>
        <p className="text-gray-400">
          JOZO Music Box cam kết bảo mật tuyệt đối thông tin khách hàng theo quy
          định pháp luật.
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Bảo mật thông tin cá nhân: số điện thoại, email.</li>
          <li>Không chia sẻ hình ảnh photobooth khi chưa được phép.</li>
          <li>Bảo vệ quyền riêng tư của khách hàng là ưu tiên hàng đầu.</li>
        </ul>
      </section>
    </div>
  );
}
