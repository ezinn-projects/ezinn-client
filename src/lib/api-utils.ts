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

export const addSongToQueue = async (
  bookingId: string,
  video: {
    video_id: string;
    title: string;
    thumbnail: string;
    author: string;
    duration: number;
  }
): Promise<{
  success: boolean;
  message?: string;
}> => {
  // Sử dụng Next.js API route để có cache revalidation
  const apiUrl = `/api/bookings/${bookingId}/queue-songs`;

  // Format dữ liệu theo yêu cầu mới với position mặc định là "top"
  const requestData = {
    video_id: video.video_id,
    title: video.title,
    thumbnail: video.thumbnail,
    author: video.author,
    duration: video.duration,
    position: "top",
  };

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  const result = await response.json();
  return result;
};

export const removeSongFromQueue = async (
  bookingId: string,
  index: number
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    // Sử dụng Next.js API route để có cache revalidation
    const apiUrl = `/api/bookings/${bookingId}/queue-songs/${index}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: result.message || "Đã xóa bài khỏi danh sách phát",
      };
    } else {
      return {
        success: false,
        message: result.message || "Có lỗi xảy ra khi xóa bài",
      };
    }
  } catch (error) {
    console.error("Error removing song from queue:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi xóa bài. Vui lòng thử lại sau.",
    };
  }
};
