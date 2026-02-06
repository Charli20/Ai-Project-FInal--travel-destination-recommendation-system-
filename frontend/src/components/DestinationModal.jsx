import { motion } from "framer-motion";
import bookingLogo from "../assets/booking.png";
import agodaLogo from "../assets/agoda.png";
import mapLogo from "../assets/google-maps.png";

export default function DestinationModal({ destination, onClose }) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white text-black rounded-2xl max-w-3xl w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-4">{destination["Destination Title"]}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {destination.image_1 && (
            <img src={destination.image_1} className="rounded-xl h-52 w-full object-cover" />
          )}
          {destination.image_2 && (
            <img src={destination.image_2} className="rounded-xl h-52 w-full object-cover" />
          )}
        </div>

        {destination["Destination Score"] && (
          <p className="text-lg mb-2">⭐ Rating: {destination["Destination Score"]}</p>
        )}

        <p className="text-gray-700 mb-6">{destination.destination_description}</p>

        <div className="flex gap-6 items-center">
          {destination["booking.com"] && (
            <a href={destination["booking.com"]} target="_blank">
              <img src={bookingLogo} className="h-8" />
            </a>
          )}
          {destination.agoda && (
            <a href={destination.agoda} target="_blank">
              <img src={agodaLogo} className="h-8" />
            </a>
          )}
          {destination.google_maps_links && (
            <a href={destination.google_maps_links} target="_blank">
              <img src={mapLogo} className="h-8" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
