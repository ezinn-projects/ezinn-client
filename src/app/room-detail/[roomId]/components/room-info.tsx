import React from "react";

interface RoomInfoProps {
  name: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  amenities: string[];
}

const RoomInfo: React.FC<RoomInfoProps> = ({
  name,
  description,
  originalPrice,
  discountedPrice,
  amenities,
}) => {
  return (
    <div className="mt-8">
      {/* Pricing */}
      <p className="text-gray-600 line-through">Giá cũ: {originalPrice}</p>
      <p className="text-black font-semibold text-xl mb-4">
        Giá khuyến mãi: {discountedPrice}
      </p>

      {/* Description */}
      <p className="text-lg text-gray-700 mb-6">{description}</p>

      {/* Amenities */}
      <ul className="list-disc pl-5">
        <strong className="text-gray-800 text-lg">Tiện ích:</strong>
        {amenities.map((amenity, index) => (
          <li key={index} className="text-gray-700">
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomInfo;
