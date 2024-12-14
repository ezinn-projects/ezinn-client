"use client";

import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import { Button } from "../ui/button";

const responsive: ResponsiveType = {
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 10,
  },
};

function ImagesList({ images }: { images: string[] }) {
  return (
    <div className="relative w-full h-[300px] md:hidden block">
      <Carousel
        swipeable={true}
        draggable={true}
        slidesToSlide={images.length}
        showDots
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        focusOnSelect={true}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //   customDot={}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[300px]">
            <Image
              src={image}
              alt={`Room subimage ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg object-cover"
              //   onLoad={() => setIsLoaded(true)}
            />
          </div>
        ))}
      </Carousel>

      <Button
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeartIcon />
      </Button>
    </div>
  );
}

export default ImagesList;
