import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const MapModal = ({ isOpen, onClose, isDarkMode, address = "London" }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!isOpen) return; // Avoid initializing the map if the modal is closed

    const mapboxToken =
      "pk.eyJ1IjoiYWdyYWhhcmktMTIzIiwiYSI6ImNscmRvenBrczFic2cya252ZDB2ZThiNWoifQ.iL2oxtMQW0jJqeGAXHeDvA";
    mapboxgl.accessToken = mapboxToken;

    const mapInstance = new mapboxgl.Map({
      container: "map-container", // Container ID
      style: isDarkMode
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/streets-v11", // Map style
      center: [-0.118092, 51.50693], // Default center point
      zoom: 12, // Default zoom level
    });

    // Add a marker
    new mapboxgl.Marker()
      .setLngLat([-0.118092, 51.50693]) // Example location
      .addTo(mapInstance);

    setMap(mapInstance);

    // Cleanup on unmount
    return () => {
      if (mapInstance) mapInstance.remove();
    };
  }, [isOpen, isDarkMode]); // Dependencies on modal state and dark mode

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative w-4/5 max-w-3xl h-3/4 rounded-lg shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl"
          aria-label="Close"
        >
          <AiOutlineClose
            className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          />
        </button>

        {/* Map Container */}
        <div id="map-container" className="w-full h-full" />

        {/* Location Pin Icon */}
        <MdLocationPin
          size={24}
          className={`absolute top-4 left-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
      </motion.div>
    </motion.div>
  );
};

export default MapModal;
