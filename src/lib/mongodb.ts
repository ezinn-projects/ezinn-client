/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

function getMongoUri(): string {
  if (process.env.NODE_ENV === "development") {
    return "mongodb://localhost:27017/jozo";
  }

  const { DB_USER, DB_PASSWORD, VPS_IP, VPS_PORT, DB_NAME, VPS_AUTH_SOURCE } =
    process.env;

  if (
    !DB_USER ||
    !DB_PASSWORD ||
    !VPS_IP ||
    !VPS_PORT ||
    !DB_NAME ||
    !VPS_AUTH_SOURCE
  ) {
    throw new Error("Please add your MongoDB credentials to .env");
  }

  return `mongodb://${DB_USER}:${DB_PASSWORD}@${VPS_IP}:${VPS_PORT}/${DB_NAME}?authSource=${VPS_AUTH_SOURCE}`;
}

const uri = getMongoUri();

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

if (process.env.NODE_ENV === "development") {
  ensureIndexes().catch(console.error);
}

export async function ensureIndexes() {
  try {
    const client = await clientPromise;
    const db = client.db("jozo");
    const collection = db.collection("users");

    await collection.createIndex(
      { phone_number: 1 },
      {
        unique: true,
        partialFilterExpression: { phone_number: { $type: "string" } }, // Chỉ index string values
      }
    );

    await collection.createIndex(
      { email: 1 },
      {
        unique: true,
        partialFilterExpression: { email: { $type: "string" } }, // Chỉ index string values
      }
    );

    console.log("Indexes created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
}
