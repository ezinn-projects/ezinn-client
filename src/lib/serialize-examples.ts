/**
 * Ví dụ về cách serialize MongoDB documents để truyền từ Server Component sang Client Component
 */

import { ObjectId } from "mongodb";
import {
  serializeMongoDocument,
  serializeMongoDocuments,
} from "@/lib/serialize-utils";

// Ví dụ về MongoDB document với ObjectId
const mongoDocument = {
  _id: new ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  roomId: new ObjectId("507f1f77bcf86cd799439012"),
  createdAt: new Date(),
  tags: [new ObjectId("507f1f77bcf86cd799439013"), "tag1"],
  metadata: {
    createdBy: new ObjectId("507f1f77bcf86cd799439014"),
    updatedBy: new ObjectId("507f1f77bcf86cd799439015"),
  },
};

// Serialize document
const serializedDoc = serializeMongoDocument(mongoDocument);
console.log("Serialized document:", serializedDoc);
// Output: {
//   _id: '507f1f77bcf86cd799439011',
//   name: 'John Doe',
//   email: 'john@example.com',
//   roomId: '507f1f77bcf86cd799439012',
//   createdAt: '2023-01-01T00:00:00.000Z',
//   tags: ['507f1f77bcf86cd799439013', 'tag1'],
//   metadata: {
//     createdBy: '507f1f77bcf86cd799439014',
//     updatedBy: '507f1f77bcf86cd799439015',
//   }
// }

// Ví dụ về array of documents
const mongoDocuments = [
  { _id: new ObjectId("507f1f77bcf86cd799439011"), name: "Doc 1" },
  { _id: new ObjectId("507f1f77bcf86cd799439012"), name: "Doc 2" },
];

const serializedDocs = serializeMongoDocuments(mongoDocuments);
console.log("Serialized documents:", serializedDocs);
// Output: [
//   { _id: '507f1f77bcf86cd799439011', name: 'Doc 1' },
//   { _id: '507f1f77bcf86cd799439012', name: 'Doc 2' },
// ]

// Ví dụ sử dụng trong Server Component
async function getBookingDetails(id: string) {
  // Giả lập fetch data từ MongoDB
  return {
    _id: new ObjectId(id),
    name: "Sample Booking",
    createdAt: new Date(),
  };
}

export async function MyServerComponent() {
  // Fetch data từ MongoDB
  const booking = await getBookingDetails("507f1f77bcf86cd799439011");

  // Serialize data trước khi truyền sang Client Component
  const serializedBooking = serializeMongoDocument(booking);

  // Trả về serialized data
  return serializedBooking;
}
