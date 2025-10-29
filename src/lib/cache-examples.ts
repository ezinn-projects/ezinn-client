/**
 * Ví dụ về các cách cache và deduplicate requests trong Next.js
 */

// 1. Sử dụng fetch với Data Cache
export async function fetchWithDataCache(url: string) {
  const response = await fetch(url, {
    cache: "force-cache", // Cache data trong Data Cache
    next: { revalidate: 3600 }, // Revalidate sau 1 giờ
  });
  return response.json();
}

// 2. Sử dụng fetch với Request Memoization (tự động)
export async function fetchWithMemoization(url: string) {
  // Request memoization hoạt động tự động cho GET/HEAD requests
  // với cùng URL và options trong cùng một render pass
  const response = await fetch(url);
  return response.json();
}

// 3. Sử dụng React cache() để wrap database calls
import { cache } from "react";

export const getCachedData = cache(async (id: string) => {
  // Database call sẽ được cache trong cùng một render pass
  const data = await fetch(`/api/data/${id}`);
  return data.json();
});

// 4. Ví dụ về cách sử dụng trong Server Component
export async function MyServerComponent({ id }: { id: string }) {
  // Cả hai calls này sẽ được deduplicated nếu có cùng URL
  const data1 = await fetchWithMemoization(`/api/data/${id}`);
  const data2 = await fetchWithMemoization(`/api/data/${id}`);

  // Hoặc sử dụng cached function
  const cachedData = await getCachedData(id);

  return { data1, data2, cachedData };
}

// 5. Ví dụ về fetch với AbortSignal để opt-out memoization
export async function fetchWithoutMemoization(url: string) {
  const controller = new AbortController();
  const response = await fetch(url, {
    signal: controller.signal, // Opt-out khỏi memoization
  });
  return response.json();
}
