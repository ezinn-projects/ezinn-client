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

export interface TicketActionResult {
  success: boolean;
  message?: string;
  needsManualSave?: boolean; // Cho user biết cần save thủ công
}

export const useTicketActions = () => {
  // Helper function để kiểm tra thiết bị
  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // Check nếu browser hỗ trợ Web Share API với files
  const supportsFileSharing = () => {
    return (
      typeof navigator !== "undefined" &&
      navigator.share !== undefined &&
      navigator.canShare !== undefined
    );
  };

  // Helper function để tạo canvas từ booking details
  const createTicketCanvas = async (bookingDetails: BookingDetails) => {
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

    try {
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

      return canvas;
    } catch (error) {
      // Xóa element tạm thời nếu có lỗi
      document.body.removeChild(ticketElement);
      throw error;
    }
  };

  const downloadTicket = useCallback(
    async (bookingDetails: BookingDetails): Promise<TicketActionResult> => {
      try {
        const canvas = await createTicketCanvas(bookingDetails);
        const fileName = `jozo-booking-${bookingDetails.bookingCode}.png`;

        // Convert canvas to blob với quality cao
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Không thể tạo ảnh vé"));
              }
            },
            "image/png",
            1.0 // Max quality
          );
        });

        // === STRATEGY 1: Web Share API với Files (iOS/Android tốt nhất) ===
        if (isMobile() && supportsFileSharing()) {
          try {
            const file = new File([blob], fileName, { type: "image/png" });

            // Kiểm tra kỹ xem có thể share file không
            const canShareFiles = navigator.canShare({ files: [file] });

            if (canShareFiles) {
              await navigator.share({
                files: [file],
                title: "Vé đặt box JOZO",
                text: "Vé đặt box của bạn",
              });

              // Share thành công - iOS sẽ có option "Save to Photos"
              return {
                success: true,
                message: "Đã chia sẻ vé thành công!",
              };
            }
          } catch (shareError) {
            // User có thể hủy share - không phải lỗi
            if (
              shareError instanceof Error &&
              shareError.name === "AbortError"
            ) {
              return {
                success: false,
                message: "Đã hủy chia sẻ",
              };
            }
            // Nếu share thất bại, thử fallback
            console.warn("Share thất bại, chuyển sang fallback:", shareError);
          }
        }

        // === STRATEGY 2: Direct Download (Desktop & Fallback) ===
        const url = URL.createObjectURL(blob);

        if (isMobile()) {
          // Mobile fallback: Mở trong tab mới để user có thể long-press save
          const imageWindow = window.open("", "_blank");

          if (imageWindow) {
            // Tạo một trang HTML đơn giản hiển thị ảnh
            imageWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Vé đặt box JOZO</title>
                <style>
                  body {
                    margin: 0;
                    padding: 20px;
                    background: #f3f4f6;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    font-family: system-ui, -apple-system, sans-serif;
                  }
                  .container {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    max-width: 500px;
                    width: 100%;
                  }
                  img {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                  }
                  .instruction {
                    margin-top: 16px;
                    padding: 12px;
                    background: #fef3c7;
                    border-radius: 8px;
                    text-align: center;
                    color: #92400e;
                    font-size: 14px;
                  }
                  .instruction strong {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 16px;
                  }
                  .download-btn {
                    margin-top: 16px;
                    width: 100%;
                    padding: 12px;
                    background: #db2777;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <img src="${url}" alt="Vé đặt box JOZO" />
                  <div class="instruction">
                    <strong>📱 Cách lưu vé:</strong>
                    ${
                      isIOS()
                        ? "Nhấn giữ vào ảnh và chọn<br/><strong>'Thêm vào Ảnh'</strong>"
                        : "Nhấn giữ vào ảnh và chọn<br/><strong>'Tải xuống hình ảnh'</strong>"
                    }
                  </div>
                  <a href="${url}" download="${fileName}">
                    <button class="download-btn">
                      💾 Tải xuống vé
                    </button>
                  </a>
                </div>
              </body>
              </html>
            `);
            imageWindow.document.close();

            // Cleanup URL sau 2 phút
            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 120000);

            return {
              success: true,
              needsManualSave: true,
              message:
                "Đã mở vé. Vui lòng nhấn giữ vào ảnh để lưu vào thiết bị",
            };
          }

          // Nếu không mở được window, thử download trực tiếp
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => URL.revokeObjectURL(url), 100);

          return {
            success: true,
            message: "Đã tải vé xuống thiết bị",
          };
        } else {
          // Desktop: Download trực tiếp
          const link = document.createElement("a");
          link.download = fileName;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Cleanup URL ngay sau khi download
          setTimeout(() => URL.revokeObjectURL(url), 100);

          return {
            success: true,
            message: "Đã tải vé xuống máy tính",
          };
        }
      } catch (error) {
        console.error("Lỗi khi tải xuống vé:", error);
        return {
          success: false,
          message:
            error instanceof Error
              ? `Lỗi: ${error.message}`
              : "Không thể tải vé. Vui lòng thử lại",
        };
      }
    },
    []
  );

  const shareTicket = useCallback(
    async (bookingDetails: BookingDetails): Promise<TicketActionResult> => {
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
          try {
            await navigator.share({
              title: "Vé đặt box JOZO",
              text: shareText,
            });

            return {
              success: true,
              message: "Đã chia sẻ thành công!",
            };
          } catch (shareError) {
            // User hủy share
            if (
              shareError instanceof Error &&
              shareError.name === "AbortError"
            ) {
              return {
                success: false,
                message: "Đã hủy chia sẻ",
              };
            }
            throw shareError;
          }
        } else {
          // Fallback: copy vào clipboard
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareText);
            return {
              success: true,
              message: "Đã sao chép thông tin vé vào clipboard!",
            };
          } else {
            return {
              success: false,
              message: "Trình duyệt không hỗ trợ chia sẻ",
            };
          }
        }
      } catch (error) {
        console.error("Lỗi khi chia sẻ vé:", error);
        return {
          success: false,
          message:
            error instanceof Error
              ? `Lỗi: ${error.message}`
              : "Không thể chia sẻ. Vui lòng thử lại",
        };
      }
    },
    []
  );

  return {
    downloadTicket,
    shareTicket,
  };
};
