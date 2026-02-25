import { NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";

export type HolidayItem = {
  _id?: string;
  date: string; // ISO date "2026-02-18T00:00:00.000Z"
  name: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export async function GET() {
  try {
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "MongoDB connection failed" },
        { status: 500 }
      );
    }

    const client = await clientPromise;
    const db = client.db("jozo");
    const collection = db.collection("holidays");

    const rows = await collection.find({}).toArray();

    const data: HolidayItem[] = rows.map((row: Record<string, unknown>) => {
      const dateVal = row.date;
      const dateStr =
        typeof dateVal === "string"
          ? dateVal
          : dateVal && typeof dateVal === "object" && "$date" in dateVal
            ? (dateVal as { $date: string }).$date
            : dateVal instanceof Date
              ? dateVal.toISOString()
              : "";
      return {
        _id: (row._id as { toString: () => string })?.toString?.() ?? undefined,
        date: dateStr,
        name: (row.name as string) ?? "",
        description: (row.description as string | null) ?? null,
        createdAt:
          typeof (row as { createdAt?: { $date?: string } }).createdAt ===
          "object"
            ? (row as { createdAt: { $date: string } }).createdAt?.$date
            : undefined,
        updatedAt:
          typeof (row as { updatedAt?: { $date?: string } }).updatedAt ===
          "object"
            ? (row as { updatedAt: { $date: string } }).updatedAt?.$date
            : undefined,
      };
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/holidays error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
