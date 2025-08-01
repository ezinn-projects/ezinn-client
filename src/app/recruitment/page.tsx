"use client";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
            TÌM ĐỒNG ĐỘI PART-TIME
          </h1>
          <h2 className="text-xl md:text-2xl text-pink-600 font-semibold">
            Jozo - Nơi kết nối những con người trẻ trung, năng động
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 font-medium">📅 Đăng tuyển: 1/8/2025</p>
          </div>
          <p className="text-gray-600 mt-4 text-lg">
            Cảm ơn bạn đã tìm đến Jozo! 🥰 Chúng mình đang tìm những người bạn
            trẻ, nhiệt huyết để cùng xây dựng môi trường vui vẻ này. Bạn có muốn
            tham gia cùng chúng mình không? 🎵
          </p>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            💼 YÊU CẦU CÔNG VIỆC CHI TIẾT
          </h3>

          <div className="space-y-8">
            {/* Yêu cầu chung */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                📋 YÊU CẦU CHUNG
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">🎯</span>
                  <p className="text-gray-700">
                    <strong>Độ tuổi:</strong> 18-25 tuổi
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">📌</span>
                  <p className="text-gray-700">
                    <strong>Yêu cầu:</strong>
                  </p>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Có tinh thần trách nhiệm, trung thực, chịu khó
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Thái độ nhiệt tình, vui vẻ, giao tiếp tốt
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Nhanh nhẹn, biết phối hợp nhóm
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">Chủ động trong công việc</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Có thể làm theo ca linh hoạt là một lợi thế
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Không yêu cầu kinh nghiệm – sẽ được đào tạo từ đầu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhân viên lễ tân */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                💰 NHÂN VIÊN LỄ TÂN
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    📋 CÔNG VIỆC CHÍNH:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">👋</span>
                      <p className="text-gray-700">
                        Tiếp đón khách, tư vấn chọn phòng và báo giá phù hợp
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🥤</span>
                      <p className="text-gray-700">
                        Phục vụ nước và snack theo yêu cầu khách
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📦</span>
                      <p className="text-gray-700">
                        Đảm bảo quầy nước/snack luôn đầy đủ, bổ sung kịp thời
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📊</span>
                      <p className="text-gray-700">
                        Kiểm kê tồn kho nước/snack mỗi ca, báo lại cho quản lý
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📞</span>
                      <p className="text-gray-700">
                        Trực tin nhắn và điện thoại hotline để nhận đặt phòng
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">💳</span>
                      <p className="text-gray-700">
                        Thanh toán cho khách sau khi sử dụng dịch vụ
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤝</span>
                      <p className="text-gray-700">
                        Hỗ trợ đồng đội khi cần, đặc biệt vào thời điểm đông
                        khách
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhân viên phục vụ */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                🎵 NHÂN VIÊN PHỤC VỤ
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    📋 CÔNG VIỆC CHÍNH:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🎯</span>
                      <p className="text-gray-700">
                        Setup phòng trước khi khách vào
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">👋</span>
                      <p className="text-gray-700">
                        Dẫn khách vào phòng và hướng dẫn sử dụng thiết bị cơ bản
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🧹</span>
                      <p className="text-gray-700">
                        Dọn phòng sau khi khách sử dụng xong
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">✨</span>
                      <p className="text-gray-700">
                        Đảm bảo vệ sinh khu vực chung (hành lang, toilet,…)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🔧</span>
                      <p className="text-gray-700">
                        Hỗ trợ xử lý các vấn đề kỹ thuật trong quá trình khách
                        sử dụng (sẽ được training)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤝</span>
                      <p className="text-gray-700">
                        Hỗ trợ đồng đội khi cần, đặc biệt vào thời điểm đông
                        khách
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhân viên giữ xe */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                🚗 NHÂN VIÊN GIỮ XE
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    📋 CÔNG VIỆC CHÍNH:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🛵</span>
                      <p className="text-gray-700">
                        Dắt xe cho khách khi đến và ra về
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📦</span>
                      <p className="text-gray-700">
                        Sắp xếp xe gọn gàng, canh giữ xe, đảm bảo an toàn khu
                        vực phía trước quán
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">✨</span>
                      <p className="text-gray-700">
                        Đảm bảo vệ sinh, gọn gàng khu vực giữ xe
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤝</span>
                      <p className="text-gray-700">
                        Phối hợp với lễ tân để cập nhật tình trạng phòng trống
                        và phản hồi kịp thời tới khách hàng khi tới quán
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quyền lợi */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                🎁 THU NHẬP:
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">💰</span>
                    <p className="text-gray-700">
                      <strong>Lương cơ bản:</strong> 22,000 VNĐ/giờ
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">🎯</span>
                    <p className="text-gray-700">
                      <strong>Thưởng:</strong> Theo doanh thu và hiệu suất công
                      việc
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closed Form Notice */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Cảm ơn tất cả các bạn đã quan tâm! 💝
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Cảm ơn tất cả các bạn đã quan tâm và gửi thông tin ứng tuyển đến
              Jozo. Hiện tại bên mình tạm thời đóng form do số lượng apply nhiều
              nên sẽ liên hệ lại với các bạn phù hợp trong vòng 1 ngày tới để
              sắp xếp phỏng vấn nhé.
            </p>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 my-6">
              <p className="text-pink-800 font-medium">
                🤝 Chúng mình chỉ có hai người mà một người code, một người
                review info nên không thể handle hết được. Mong các bạn iu thông
                cảm cho chúng mình và chúng mình rất tôn trọng các bạn!💕
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-2xl">📞</span>
                <span className="font-medium">0336051204</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-2xl">📧</span>
                <span className="font-medium">jozostudiollc@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            📞 Liên hệ:{" "}
            <a
              href="tel:0336051204"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              0336051204
            </a>
          </p>
          <p className="text-sm mt-2">
            📧 Email:{" "}
            <a
              href="mailto:jozostudiollc@gmail.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              jozostudiollc@gmail.com
            </a>
          </p>
          <p className="text-sm mt-2">
            🏢 Địa chỉ:{" "}
            <a
              href="https://www.google.com/maps/place/Jozo+Music+Box/@10.9615421,106.8471298,1234m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3174dd6fa7fe3c73:0xac4d7af01bc4f800!8m2!3d10.9615421!4d106.8520007!16s%2Fg%2F11m64vjf12?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              78 Phan Trung, Tam Hiệp, Đồng Nai
            </a>
          </p>
          <p className="text-sm mt-4 text-pink-600 font-medium">
            💝 Cảm ơn bạn đã quan tâm đến Jozo! Chúng mình rất mong được gặp
            bạn! 💝
          </p>
          <p className="text-xs mt-2 text-gray-500 text-center">
            🔒 Cam kết bảo mật: Thông tin của bạn sẽ được bảo mật tuyệt đối và
            chỉ sử dụng cho mục đích tuyển dụng
          </p>
        </div>
      </div>
    </div>
  );
}
