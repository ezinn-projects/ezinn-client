import { MongoClient } from "mongodb";

declare global {
  // Khai báo thuộc tính `_mongoClientPromise` trên `globalThis`
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
}

export {}; // Đảm bảo TypeScript hiểu đây là một mô-đun
