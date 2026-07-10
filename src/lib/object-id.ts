export function normalizeObjectId(value: unknown): string | null {
  if (value == null) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || null;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.$oid === "string") {
      return record.$oid;
    }

    if (typeof record.toString === "function") {
      const asString = record.toString();
      if (asString && asString !== "[object Object]") {
        return asString;
      }
    }
  }

  const fallback = String(value).trim();
  return fallback && fallback !== "[object Object]" ? fallback : null;
}

export const extractGiftId = (reward: {
  giftId?: unknown;
  gift?: unknown;
}): string | null => {
  const directId = normalizeObjectId(reward.giftId);
  if (directId) return directId;

  if (reward.gift && typeof reward.gift === "object") {
    return normalizeObjectId((reward.gift as { _id?: unknown })._id);
  }

  return normalizeObjectId(reward.gift);
};
