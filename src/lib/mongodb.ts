/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.VPS_IP}:${process.env.VPS_PORT}/${process.env.DB_NAME}?authSource=${process.env.VPS_AUTH_SOURCE}`;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Caching client in development
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // Always create a new client in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

/**
 * Kiểm tra trạng thái kết nối MongoDB
 */
export async function checkMongoConnection() {
  try {
    const client = await clientPromise;
    await client.db("admin").command({ ping: 1 });
    return true; // Kết nối thành công
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return false; // Kết nối thất bại
  }
}

export default clientPromise;
