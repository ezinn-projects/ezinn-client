import { NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";
import type { Gift } from "@/types/gift";

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
    const giftsCollection = db.collection<Gift>("gifts");

    const gifts = await giftsCollection
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: gifts });
  } catch (error) {
    console.error("Failed to fetch gifts", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
