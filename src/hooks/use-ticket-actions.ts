"use client";

import { useCallback } from "react";
import html2canvas from "html2canvas";

interface BookingDetails {
  name: string;
  phone: string;
  roomType: string;
  date: string;
  time: string;
  bookingCode: string;
}

export const useTicketActions = () => {
  const downloadTicket = useCallback(async (bookingDetails: BookingDetails) => {
    try {
      // Tạo một element tạm thời để render vé
      const ticketElement = document.createElement("div");
      ticketElement.innerHTML = `
        <div style="width: 400px; height: 600px; background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%); position: relative; overflow: hidden;">
          <!-- Background Pattern -->
          <div style="position: absolute; inset: 0; opacity: 0.1;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #f9a8d4 0%, #c084fc 100%);"></div>
            <div style="position: absolute; top: 40px; left: 40px; width: 80px; height: 80px; border-radius: 50%; background: #f9a8d4; opacity: 0.2;"></div>
            <div style="position: absolute; top: 128px; right: 64px; width: 64px; height: 64px; border-radius: 50%; background: #c084fc; opacity: 0.2;"></div>
            <div style="position: absolute; bottom: 80px; left: 80px; width: 96px; height: 96px; border-radius: 50%; background: #f9a8d4; opacity: 0.2;"></div>
            <div style="position: absolute; bottom: 128px; right: 40px; width: 72px; height: 72px; border-radius: 50%; background: #c084fc; opacity: 0.2;"></div>
          </div>

          <!-- Header -->
          <div style="position: relative; z-index: 10; padding: 24px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="font-size: 30px; font-weight: bold; color: #db2777; margin-bottom: 8px; margin: 0;">JOZO</h1>
            </div>

            <!-- Booking Code -->
            <div style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 2px dashed #f9a8d4;">
              <div style="text-align: center;">
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px; margin: 0;">Mã đặt box</p>
                <p style="font-size: 24px; font-weight: bold; color: #db2777; letter-spacing: 0.1em; font-family: monospace; margin: 0;">
                  ${bookingDetails.bookingCode}
                </p>
              </div>
            </div>

            <!-- Booking Details -->
            <div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 16px; text-align: center; margin: 0 0 16px 0;">
                Thông tin đặt box
              </h2>
              
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="color: #6b7280; font-weight: 500;">Tên khách hàng:</span>
                  <span style="color: #1f2937; font-weight: 600; text-align: right;">
                    ${bookingDetails.name}
                  </span>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="color: #6b7280; font-weight: 500;">Số điện thoại:</span>
                  <span style="color: #1f2937; font-weight: 600; text-align: right;">
                    ${bookingDetails.phone}
                  </span>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="color: #6b7280; font-weight: 500;">Loại box:</span>
                  <span style="color: #1f2937; font-weight: 600; text-align: right;">
                    ${bookingDetails.roomType}
                  </span>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="color: #6b7280; font-weight: 500;">Ngày đặt:</span>
                  <span style="color: #1f2937; font-weight: 600; text-align: right;">
                    ${bookingDetails.date}
                  </span>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                  <span style="color: #6b7280; font-weight: 500;">Thời gian:</span>
                  <span style="color: #1f2937; font-weight: 600; text-align: right;">
                    ${bookingDetails.time}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 24px; text-align: center;">
              <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px; margin: 0;">
                Vui lòng mang theo mã đặt box khi đến
              </p>
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                Cảm ơn bạn đã tin tưởng JOZO! 🎉
              </p>
            </div>

            <!-- Decorative Elements -->
            <div style="position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; background: #f9a8d4; border-radius: 50%; opacity: 0.3;"></div>
            <div style="position: absolute; bottom: 16px; left: 16px; width: 24px; height: 24px; background: #c084fc; border-radius: 50%; opacity: 0.3;"></div>
          </div>
        </div>
      `;

      // Thêm element vào DOM tạm thời
      ticketElement.style.position = "absolute";
      ticketElement.style.left = "-9999px";
      ticketElement.style.top = "-9999px";
      document.body.appendChild(ticketElement);

      // Chuyển đổi thành canvas
      const canvas = await html2canvas(
        ticketElement.firstElementChild as HTMLElement,
        {
          width: 400,
          height: 600,
          scale: 2, // Để có độ phân giải cao hơn
          backgroundColor: null,
          useCORS: true,
        }
      );

      // Xóa element tạm thời
      document.body.removeChild(ticketElement);

      // Tạo link tải xuống
      const link = document.createElement("a");
      link.download = `jozo-booking-${bookingDetails.bookingCode}.png`;
      link.href = canvas.toDataURL("image/png");

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (error) {
      console.error("Lỗi khi tải xuống vé:", error);
      return false;
    }
  }, []);

  const shareTicket = useCallback(async (bookingDetails: BookingDetails) => {
    try {
      // Tạo text để chia sẻ
      const shareText = `🎉 Tôi vừa đặt box thành công tại JOZO!
      
📋 Thông tin đặt box:
• Mã đặt box: ${bookingDetails.bookingCode}
• Tên: ${bookingDetails.name}
• Số điện thoại: ${bookingDetails.phone}
• Loại box: ${bookingDetails.roomType}
• Ngày: ${bookingDetails.date}
• Thời gian: ${bookingDetails.time}

Cảm ơn JOZO đã mang đến trải nghiệm tuyệt vời! 🎊`;

      // Kiểm tra xem có hỗ trợ Web Share API không
      if (navigator.share) {
        await navigator.share({
          title: "Vé đặt box JOZO",
          text: shareText,
        });
      } else {
        // Fallback: copy vào clipboard
        await navigator.clipboard.writeText(shareText);
        alert("Đã sao chép thông tin vé vào clipboard!");
      }

      return true;
    } catch (error) {
      console.error("Lỗi khi chia sẻ vé:", error);
      return false;
    }
  }, []);

  return {
    downloadTicket,
    shareTicket,
  };
};
