import { useState, useEffect } from "react";
import { Price } from "@/types/price.d";

const CACHE_KEY = "jozo_prices";
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

interface CachedPrices {
  data: Price[];
  timestamp: number;
}

export function usePrices() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Kiểm tra cache trước
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache: CachedPrices = JSON.parse(cached);
          const now = Date.now();

          // Nếu cache còn hiệu lực (dưới 5 phút), sử dụng cache
          if (now - parsedCache.timestamp < CACHE_DURATION) {
            setPrices(parsedCache.data);
            setLoading(false);
            return;
          }
        }

        // Nếu không có cache hoặc cache hết hạn, fetch từ API
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/price`
        );
        const data = await response.json();

        if (data.success && data.data) {
          const newPrices = data.data;
          setPrices(newPrices);

          // Lưu vào cache
          const cacheData: CachedPrices = {
            data: newPrices,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } else {
          throw new Error(data.message || "Failed to fetch prices");
        }
      } catch (err) {
        console.error("Error fetching prices:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // Nếu có lỗi và có cache cũ, sử dụng cache cũ
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache: CachedPrices = JSON.parse(cached);
          setPrices(parsedCache.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Hàm để refresh prices (bỏ qua cache)
  const refreshPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/price`
      );
      const data = await response.json();

      if (data.success && data.data) {
        const newPrices = data.data;
        setPrices(newPrices);

        // Cập nhật cache
        const cacheData: CachedPrices = {
          data: newPrices,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } else {
        throw new Error(data.message || "Failed to fetch prices");
      }
    } catch (err) {
      console.error("Error refreshing prices:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Hàm để clear cache
  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
  };

  return {
    prices,
    loading,
    error,
    refreshPrices,
    clearCache,
  };
}
