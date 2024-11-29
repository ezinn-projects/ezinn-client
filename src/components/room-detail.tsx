import Image from "next/image";
import React from "react";

type RoomData = {
  name: string; // Tên phòng
  description: string; // Mô tả phòng
  price: number; // Giá gốc của phòng
  discountedPrice: number; // Giá đã giảm của phòng
  amenities: string[]; // Danh sách tiện ích
  images: string[]; // Danh sách URL hình ảnh
};

interface RoomDetailProps {
  roomData: RoomData; // Dữ liệu chi tiết của phòng
}

const RoomDetail: React.FC<RoomDetailProps> = ({ roomData }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Room Name */}
      <h1 className="text-3xl font-bold mb-4">{roomData.name}</h1>

      {/* Room Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {roomData.images.map((image, index) => (
          <div
            key={index}
            className="relative w-full aspect-w-4 aspect-h-3 overflow-hidden rounded-lg"
          >
            <Image
              src={image}
              alt={`Room image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Room Description */}
      <p className="text-gray-700 mb-4">{roomData.description}</p>

      {/* Pricing */}
      <p className="text-lg font-semibold text-gray-800 mb-4">
        Price:{" "}
        <span className="line-through text-gray-500">
          {roomData.price.toLocaleString()} VND
        </span>{" "}
        <span className="text-red-500">
          {roomData.discountedPrice.toLocaleString()} VND
        </span>
      </p>

      {/* Amenities */}
      <ul className="list-disc pl-5">
        <strong className="text-gray-800">Amenities:</strong>
        {roomData.amenities.map((amenity, index) => (
          <li key={index} className="text-gray-700">
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomDetail;
