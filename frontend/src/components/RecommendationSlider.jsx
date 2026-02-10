
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import FloatingCard from "./FloatingCard";
import { motion, AnimatePresence } from "framer-motion";
import bookingLogo from "../assets/booking.png";
import agodaLogo from "../assets/agoda.png";
import googleMapsLogo from "../assets/google-maps.png";

const RecommendationSlider = ({ title, data, onSelect, onHover }) => {
  const [activeDestination, setActiveDestination] = useState(null);

  // Close modal when user scrolls
  useEffect(() => {
    if (!activeDestination) return;

    const handleScroll = () => setActiveDestination(null);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeDestination]);

  return (
    <section className="relative pt-32 pb-24 bg-black overflow-visible">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-white mb-10 px-6">{title}</h2>

      {/* Slider */}
      <Swiper
        modules={[Navigation, EffectCoverflow, A11y]}
        effect="coverflow"
        grabCursor
        loop
        navigation
        slidesPerView={3}
        spaceBetween={16}
        centeredSlides={false}
        coverflowEffect={{
          rotate: 0,
          stretch: -10,
          depth: 80,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="px-6 py-10 overflow-visible"
      >
        {data.map((p, i) => (
          <SwiperSlide key={i} className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="origin-center"
            >
              <FloatingCard>
                <div
                  className="flex flex-col gap-4 p-4 min-h-[420px] cursor-pointer bg-white rounded-2xl shadow-lg"
                  onClick={() => setActiveDestination(p)}
                  onMouseEnter={() => onHover && onHover(p)}
                >
                  <img
                    src={p.image_1 || p["Destination Image"]}
                    alt={p["Destination Title"]}
                    className="w-full h-52 object-cover rounded-xl"
                  />

                  <h3 className="text-lg font-semibold text-black">
                    {p["Destination Title"]}
                  </h3>

                  <p className="text-sm text-gray-800 line-clamp-3">
                    {p.destination_description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(p);
                    }}
                    className="mt-auto w-full border border-gray-800 text-gray-800 py-2 rounded-full transition hover:bg-gray-100"
                  >
                    Select
                  </button>
                </div>
              </FloatingCard>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <AnimatePresence>
        {activeDestination && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black max-w-3xl w-full rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto shadow-xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <button
                onClick={() => setActiveDestination(null)}
                className="absolute top-3 right-3 text-xl font-bold text-black"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">
                {activeDestination["Destination Title"]}
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {activeDestination.image_1 && (
                  <img
                    src={activeDestination.image_1}
                    className="aspect-square object-cover rounded"
                  />
                )}
                {activeDestination.image_2 && (
                  <img
                    src={activeDestination.image_2}
                    className="aspect-square object-cover rounded"
                  />
                )}
              </div>

              <p className="text-sm mb-3">
                {activeDestination.destination_description}
              </p>

              {activeDestination["Destination Score"] && (
                <p className="text-sm font-semibold mb-4">
                  ⭐ Rating: {activeDestination["Destination Score"]}
                </p>
              )}

              <div className="flex gap-6 items-center mb-4">
                {activeDestination["booking.com"] && (
                  <a
                    href={activeDestination["booking.com"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={bookingLogo} className="h-8" alt="Booking.com" />
                  </a>
                )}
                {activeDestination["agoda"] && (
                  <a
                    href={activeDestination["agoda"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={agodaLogo} className="h-8" alt="Agoda" />
                  </a>
                )}
                {activeDestination["google_maps_links"] && (
                  <a
                    href={activeDestination["google_maps_links"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={googleMapsLogo}
                      className="h-8"
                      alt="Google Maps"
                    />
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  onSelect(activeDestination);
                  setActiveDestination(null);
                }}
                className="w-full border border-gray-800 text-gray-800 py-2 rounded-full transition hover:bg-gray-100"
              >
                Select Destination
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RecommendationSlider; 
