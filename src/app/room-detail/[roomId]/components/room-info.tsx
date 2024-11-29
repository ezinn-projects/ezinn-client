import React from "react";

interface RoomInfoProps {
  name: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  amenities: string[];
}

const RoomInfo: React.FC<RoomInfoProps> = ({
  description,
  originalPrice,
  discountedPrice,
  amenities,
}) => {
  return (
    <div className="mt-8">
      {/* Pricing */}
      <p className="dark:text-white text-black line-through">
        Giá cũ: {originalPrice}
      </p>
      <p className="dark:text-white text-black font-semibold text-xl mb-4">
        Giá khuyến mãi: {discountedPrice}
      </p>

      {/* Description */}
      <p className="dark:text-white text-black text-lg mb-6">{description}</p>

      {/* Amenities */}
      <ul className="list-disc pl-5">
        <strong className="dark:text-white text-black text-lg">
          Tiện ích:
        </strong>
        {amenities.map((amenity, index) => (
          <li key={index} className="dark:text-white text-gray-800">
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomInfo;
