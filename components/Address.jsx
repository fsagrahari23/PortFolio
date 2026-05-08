import React from "react";
import { motion } from "framer-motion";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.7437737135597!2d82.71083507617624!3d27.22719324650399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39973b9ca67b6cef%3A0x8f4d737fdf17d2b0!2sShri%20ram%20traders!5e0!3m2!1sen!2sin!4v1778234888381!5m2!1sen!2sin";

const MapModal = ({ isOpen, onClose, isDarkMode }) => {
  const coordinates = "20.3237412, 76.1694158";

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
        className={`relative w-11/12 max-w-4xl rounded-2xl shadow-lg overflow-hidden ${
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

        <div className="px-6 pt-6">
          <div className="flex items-center gap-3 pr-10">
            <MdLocationPin
              size={24}
              className={isDarkMode ? "text-gray-400" : "text-gray-600"}
            />
            <div>
              <h2 className="text-lg font-semibold">Location</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Coordinates: {coordinates}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Google Map Location"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MapModal;
