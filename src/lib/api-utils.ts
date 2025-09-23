/**
 * Utility function để lấy API URL từ environment variables
 * Fallback về localhost:4000 cho development
 */
export const getApiUrl = (): string => {
  console.log(
    "process.env.NEXT_PUBLIC_BACKEND_API_URL",
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  );
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000";
};

/**
 * Tạo full API endpoint URL
 */
export const createApiEndpoint = (endpoint: string): string => {
  const baseUrl = getApiUrl();
  return `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};

/**
 * Cancel booking API call
 */
export const cancelBooking = async (
  bookingId: string,
  phone: string
): Promise<{
  success: boolean;
  message?: string;
  bookingId?: string;
}> => {
  try {
    const apiUrl = createApiEndpoint(`/bookings/${bookingId}/cancel`);

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: result.message,
        bookingId: result.bookingId,
      };
    } else {
      return {
        success: false,
        message: result.message || "Có lỗi xảy ra khi hủy booking",
      };
    }
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi hủy booking. Vui lòng thử lại sau.",
    };
  }
};
