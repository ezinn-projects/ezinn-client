"use client";

import Image from "next/image";
import { useState } from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive: ResponsiveType = {
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 10,
  },
};

function ImageGalleryMobile({ images }: { images: string[] }) {
  console.log(images);
  const [activeIndex, setActiveIndex] = useState(1);
  // const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-[300px]">
      <Carousel
        swipeable={true}
        draggable={true}
        slidesToSlide={images.length}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        focusOnSelect={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px"
        afterChange={(_, { currentSlide }) => setActiveIndex(currentSlide)}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[300px]">
            <Image
              src={image}
              alt={`Room subimage ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </Carousel>

      {/* {isLoaded && ( */}
      <p className="absolute bottom-4 right-4 bg-gray-900/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition text-xs">
        {activeIndex + 1}/{images.length}
      </p>
      {/* )} */}
    </div>
  );
}

export default ImageGalleryMobile;
