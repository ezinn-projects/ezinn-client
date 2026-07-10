import { ObjectId } from "mongodb";
import clientPromise, { getDatabaseName } from "@/lib/mongodb";
import { normalizeObjectId } from "@/lib/object-id";
import {
  serializeMongoDocument,
  serializeMongoDocuments,
} from "@/lib/serialize-utils";
import type { Gift } from "@/types/gift";

const toObjectIds = (ids: string[]) =>
  ids
    .map((id) => normalizeObjectId(id))
    .filter((id): id is string => Boolean(id && ObjectId.isValid(id)))
    .map((id) => new ObjectId(id));

export async function getGiftById(id: string): Promise<Gift | null> {
  const normalized = normalizeObjectId(id);
  if (!normalized || !ObjectId.isValid(normalized)) {
    return null;
  }

  const client = await clientPromise;
  const db = client.db(getDatabaseName());
  const gift = await db.collection<Gift>("gifts").findOne({
    _id: new ObjectId(normalized),
    isActive: true,
  });

  return gift ? (serializeMongoDocument(gift) as Gift) : null;
}

export async function getGiftsByIds(ids: string[]): Promise<Gift[]> {
  const objectIds = toObjectIds(ids);
  if (objectIds.length === 0) {
    return [];
  }

  const client = await clientPromise;
  const db = client.db(getDatabaseName());
  const gifts = await db
    .collection<Gift>("gifts")
    .find({ _id: { $in: objectIds }, isActive: true })
    .toArray();

  return serializeMongoDocuments(gifts) as Gift[];
}

export async function getActiveGifts(): Promise<Gift[]> {
  const client = await clientPromise;
  const db = client.db(getDatabaseName());
  const gifts = await db
    .collection<Gift>("gifts")
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .toArray();

  return serializeMongoDocuments(gifts) as Gift[];
}
