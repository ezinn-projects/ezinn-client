export default function PoliciesPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-200">
      <h1 className="text-4xl font-bold dark:text-white text-black mb-6">
        Chính Sách Ezinn Homestay
      </h1>

      {/* Chính Sách Đặt Phòng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Đặt Phòng
        </h2>
        <p className="text-gray-400">
          Ezinn Homestay cung cấp dịch vụ đặt phòng linh hoạt với các tùy chọn
          theo giờ, qua đêm, hoặc cả ngày.
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Đặt phòng qua website hoặc mạng xã hội.</li>
          <li>Xác nhận đặt phòng qua email hoặc tin nhắn.</li>
          <li>
            <strong>Thời gian thuê linh hoạt:</strong>
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li>
                <strong>Theo giờ (Hourly):</strong> Tối thiểu 2 giờ, tối đa 6
                giờ.
              </li>
              <li>
                <strong>Qua đêm:</strong> Từ 22:00 đến 8:00 sáng hôm sau, tiết
                kiệm 20%.
              </li>
              <li>
                <strong>Cả ngày:</strong> Lưu trú 12 giờ trở lên, giảm giá khi ở
                từ 3 ngày.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      {/* Chính Sách Hủy Phòng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Hủy Phòng
        </h2>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Hủy trước 24 giờ: hoàn tiền 100%.</li>
          <li>Hủy trong 12-24 giờ: hoàn tiền 50%.</li>
          <li>Hủy dưới 12 giờ: không hoàn tiền.</li>
        </ul>
      </section>

      {/* Chính Sách Giá */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Giá
        </h2>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>
            <strong>Giá theo giờ:</strong> từ 200,000 VND/giờ.
          </li>
          <li>
            <strong>Giá qua đêm:</strong> từ 22:00 đến 8:00, rẻ hơn 20%.
          </li>
          <li>
            <strong>Giá theo ngày:</strong> giảm 15% khi ở từ 3 ngày trở lên.
          </li>
        </ul>
      </section>

      {/* Trách Nhiệm Khách Hàng */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Trách Nhiệm Của Khách Hàng
        </h2>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Khách hàng có trách nhiệm trả phòng đúng thời gian quy định.</li>
          <li>Thông báo cho Ezinn nếu muốn gia hạn thời gian lưu trú.</li>
          <li>
            Trong trường hợp không trả phòng đúng giờ và không thông báo:
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li>Ezinn sẽ liên hệ khách hàng để nhắc nhở.</li>
              <li>
                Nếu khách không phản hồi sau **30 phút**, Ezinn có quyền vào
                phòng để kiểm tra nhằm đảm bảo lịch trình cho khách tiếp theo.
              </li>
              <li>Phụ thu thêm giờ sẽ được tính theo giá thuê hiện hành.</li>
            </ul>
          </li>
        </ul>
        <p className="text-gray-400 mt-4">
          Quy định này nhằm đảm bảo quyền lợi cho tất cả khách hàng và tránh ảnh
          hưởng đến lịch trình đặt phòng.
        </p>
      </section>

      {/* Chính Sách Bảo Mật */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold dark:text-white mb-4 text-black">
          Chính Sách Bảo Mật
        </h2>
        <p className="text-gray-400">
          Ezinn Homestay cam kết bảo mật thông tin khách hàng. Chúng tôi chỉ thu
          thập thông tin cần thiết để đảm bảo trải nghiệm dịch vụ tốt nhất.
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
          <li>Thông tin thu thập: họ tên, số điện thoại, email.</li>
          <li>Không chia sẻ thông tin với bên thứ ba.</li>
          <li>Khách hàng có quyền kiểm tra và chỉnh sửa thông tin cá nhân.</li>
        </ul>
      </section>
    </div>
  );
}
