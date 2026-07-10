import type { Gift } from "@/types/gift";

export const parseGiftsList = (payload: unknown): Gift[] => {
  if (!payload || typeof payload !== "object") return [];

  const record = payload as Record<string, unknown>;
  const list = record.result ?? record.data;

  if (Array.isArray(list)) {
    return list as Gift[];
  }

  if (Array.isArray(payload)) {
    return payload as Gift[];
  }

  return [];
};

export const parseGiftItem = (payload: unknown): Gift | null => {
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const nested = record.result ?? record.data;

  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return nested as Gift;
  }

  if (record._id) {
    return record as Gift;
  }

  return null;
};
