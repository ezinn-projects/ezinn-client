import { NextResponse } from "next/server";
import clientPromise, { checkMongoConnection } from "@/lib/mongodb";

export async function GET() {
  try {
    // Kiểm tra kết nối MongoDB trước khi thực hiện truy vấn
    const isConnected = await checkMongoConnection();
    if (!isConnected) {
      return NextResponse.json(
        { success: false, message: "MongoDB connection failed" },
        { status: 500 }
      );
    }

    // Nếu kết nối thành công, tiếp tục xử lý
    const client = await clientPromise;
    const db = client.db("jozo");
    const collection = db.collection("prices");

    const prices = await collection.find({}).toArray();
    return NextResponse.json({ success: true, data: prices });
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
