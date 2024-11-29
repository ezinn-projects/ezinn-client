import Image from "next/image";
import React from "react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[500px] rounded-lg overflow-hidden">
      {/* Hình lớn bên trái */}
      <div className="row-span-2 col-span-1 relative">
        <Image
          src={images[0]} // Hình lớn đầu tiên
          alt="Main room image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* 4 hình nhỏ bên phải */}
      {images.slice(1, 5).map((image, index) => (
        <div key={index} className="relative w-full h-full">
          <Image
            src={image}
            alt={`Room subimage ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
