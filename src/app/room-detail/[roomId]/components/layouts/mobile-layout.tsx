import { Room } from "@/mock";
import BookingSection from "../booking-section";
import ImageGalleryMobile from "../image-gallery-mobile";
import ReviewSection from "../review-section";
import Header from "./header";

export default function MobileLayout({ room }: { room: Room }) {
  return (
    <div className="md:hidden">
      <Header />

      <ImageGalleryMobile images={room.images} />

      <div className="container mt-3">
        <h2 className="text-2xl font-bold" aria-label={room.name}>
          {room.name}
        </h2>

        {/* Pricing */}
        <div className="flex items-center gap-x-4">
          <span className="text-lg font-bold text-red-500">
            {room.discountedPrice}
          </span>
          <span className="text-gray-400 line-through">
            {room.originalPrice}
          </span>
        </div>

        {/* Booking Section */}
        <BookingSection price={70000} />

        <div className="my-4 border-[0.2px] border-gray-200" />
        {/* Description */}
        <p className="text-gray-600">{room.description}</p>

        {/* Amenities */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Tiện ích:</h3>
          <ul className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, index) => (
              <li
                key={index}
                className="bg-gray-100 text-sm rounded-full px-3 py-1 text-gray-700"
              >
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* Review */}
        <ReviewSection />
      </div>
    </div>
  );
}
