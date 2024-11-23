export type Room = {
  id: number;
  name: string;
  description: string;
  images: string[];
  originalPrice: string;
  discountedPrice: string;
  amenities: string[];
};

export const rooms: Room[] = [
  {
    id: 1,
    name: "Phòng Deluxe",
    description: "Một không gian sang trọng với đầy đủ tiện nghi.",
    images: [
      "https://via.placeholder.com/250",
      "https://via.placeholder.com/251",
      "https://via.placeholder.com/252",
    ],
    originalPrice: "500,000 đ/giờ",
    discountedPrice: "450,000 đ/giờ",
    amenities: ["WiFi", "Điều hòa", "TV"],
  },
  {
    id: 2,
    name: "Phòng Studio",
    description: "Phòng Studio đầy nghệ thuật.",
    images: [
      "https://via.placeholder.com/260",
      "https://via.placeholder.com/261",
      "https://via.placeholder.com/262",
    ],
    originalPrice: "600,000 đ/giờ",
    discountedPrice: "550,000 đ/giờ",
    amenities: ["WiFi", "Điều hòa", "Smart TV"],
  },
  {
    id: 3,
    name: "Phòng Suite",
    description: "Phòng Suite đẳng cấp cho kỳ nghỉ của bạn.",
    images: [
      "https://a0.muscache.com/im/pictures/d682f7bf-caa4-4433-9038-c5f81a01845b.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/2002b9b6-e4d8-48b2-af01-a058e400ef02.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/113bd9ea-b92c-4ab1-81cd-13825260e442.jpg?im_w=720",
    ],
    originalPrice: "800,000 đ/giờ",
    discountedPrice: "750,000 đ/giờ",
    amenities: ["WiFi", "Điều hòa", "Bồn tắm"],
  },
];
