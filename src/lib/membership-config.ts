import clientPromise, { getDatabaseName } from "@/lib/mongodb";
import { serializeMongoDocument } from "@/lib/serialize-utils";
import type { IMembershipConfig } from "@/types/membership";
import { unstable_cache } from "next/cache";

const COLLECTION = "membershipConfigs";
const CACHE_TAG = "membership-config";

/**
 * Lấy config membership mới nhất từ MongoDB (server-side).
 * Cache bằng unstable_cache — `export const revalidate` không áp dụng cho query DB.
 * @see https://nextjs.org/docs/app/api-reference/functions/unstable_cache
 */
export const getMembershipConfig = unstable_cache(
  async (): Promise<IMembershipConfig | null> => {
    try {
      const client = await clientPromise;
      const db = client.db(getDatabaseName());
      const doc = await db
        .collection(COLLECTION)
        .find({})
        .sort({ updatedAt: -1 })
        .limit(1)
        .next();

      if (!doc) return null;

      return serializeMongoDocument(
        doc as Record<string, unknown>,
      ) as unknown as IMembershipConfig;
    } catch (error) {
      console.error("Lấy membershipConfig thất bại", error);
      return null;
    }
  },
  ["membership-config"],
  {
    tags: [CACHE_TAG],
    revalidate: 60,
  },
);

export function sortTierThresholds(
  thresholds: Record<string, number> | undefined | null,
): [string, number][] {
  if (!thresholds) return [];
  return Object.entries(thresholds).sort((a, b) => a[1] - b[1]);
}
