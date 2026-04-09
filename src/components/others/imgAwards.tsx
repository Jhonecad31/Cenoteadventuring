import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506929197314-99884e8979e8?auto=format&fit=crop&w=800&q=80",
];

export default function App() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true} 
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index} className="relative group overflow-hidden">
            <img
              src={url}
              alt={`Tour image ${index}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}