import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

const Weather = ({ isdarkMode }) => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Initially hidden
  const [isButtonVisible, setIsButtonVisible] = useState(true); // Show the button initially

  useEffect(() => {
    const fetchWeatherData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
              )
              .then((response) => {
                setWeatherData(response.data);
                setCity(response.data.name);
              })
              .catch((error) => {
                console.error("Error fetching weather data:", error);
              });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not available in this browser.");
      }
    };
    fetchWeatherData();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle visibility of weather component
    setIsButtonVisible(!isButtonVisible); // Hide/show the button when toggling
  };

  return (
    <>
      {/* Weather Info Modal */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 100,
        }}
        transition={{ duration: 0.5 }}
        className={`fixed bottom-16 left-4 w-64 rounded-lg shadow-md p-4 transition-all duration-500 ${
          isdarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2
            className={`text-lg font-bold ${
              isdarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {city || "Loading..."}
          </h2>
          <button
            onClick={toggleVisibility}
            className={`text-${
              isdarkMode ? "gray-200" : "gray-800"
            } cursor-pointer`}
          >
            <span className="font-bold text-xl">×</span> {/* Close button */}
          </button>
        </div>
        <div className="flex items-center mb-4">
          {weatherData.weather && (
            <div>
              {weatherData.weather[0].main === "Clear" && (
                <WiDaySunny size={24} />
              )}
              {weatherData.weather[0].main === "Clouds" && (
                <WiCloud size={24} />
              )}
              {weatherData.weather[0].main === "Rain" && <WiRain size={24} />}
            </div>
          )}
          <p
            className={`ml-2 text-lg ${
              isdarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {weatherData.main?.temp ? `${weatherData.main.temp}°C` : "N/A"}
          </p>
        </div>
        <p
          className={`text-gray-600 ${
            isdarkMode ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {weatherData.weather && weatherData.weather[0].description}
        </p>
      </motion.div>

      {/* Floating Button to Toggle Weather Info */}
      {isButtonVisible && (
        <button
          onClick={toggleVisibility}
          className={`fixed bottom-4 right-4 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg ${
            isdarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <WiDaySunny size={24} /> {/* Weather Icon */}
        </button>
      )}
    </>
  );
};

export default Weather;
