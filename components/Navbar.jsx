import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import MapModal from "./Address";
// Assuming you have a MapModal component

const Navbar = ({ isdarkMode, setIsDarkMode }) => {
  const sideMenuRef = useRef(null);
  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  const [isScroll, setIsScroll] = useState(false);
  const [showMap, setShowMap] = useState(false); // State to control the map visibility

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, [isScroll]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 -z-10 w-11/12 translate-y-[-80%] dark:hidden">
        <Image
          src={assets.header_bg_color}
          alt="bg"
          className="w-full h-full"
        />
      </div>
      <nav
        className={`w-full fixed top-0 left-0 right-0 flex items-center justify-between max-w-7xl mx-auto py-4 md:px-8 px-4 md:flex z-50 ${
          isScroll
            ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkTheme dark:shadow-white/20"
            : ""
        }`}
      >
        <a href="#top">
          <Image
            src={isdarkMode ? assets.logo_dark : assets.logo}
            width={50}
            height={50}
            alt="logo"
            className="cursor-pointer w-28 mr-14"
          />
        </a>
        <ul
          className={`hidden md:flex items-center gap-5 lg:gap-8 rounded-full px-12 py-3 ${
            !isScroll
              ? "bg-white bg-opacity-50 shadow-md dark:border dark:border-white/50 dark:bg-transparent"
              : ""
          }`}
        >
          <li>
            <a className="font-Ovo" href="#top">
              Home
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#services">
              Services
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#contact">
              Contact
            </a>
          </li>
          <li>
            <a className="font-Ovo" href="#resume">
              Resume
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isdarkMode)}
            className="transform transition duration-300"
          >
            {isdarkMode ? (
              <Image
                src={assets.sun_icon}
                alt="sun icon"
                className="w-6 cursor-pointer"
              />
            ) : (
              <Image
                src={assets.moon_icon}
                alt="moon icon"
                className="w-6 cursor-pointer"
              />
            )}
          </button>
          <a
            href="#contact"
            className=" font-Ovo hidden lg:flex items-center gap-4 px-10 py-2.5 border border-gray-500 rounded-full ml-4 dark:border-white/50"
          >
            Contact{" "}
            <Image
              src={isdarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
              alt="right arrow"
              className="w-3"
            />
          </a>
          <button
            onClick={() => setShowMap(true)} // Open the map modal
            className="flex items-center gap-2 p-2 border rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white"
          >
            Open Map
          </button>
          <button onClick={openMenu}>
            <Image
              src={isdarkMode ? assets.menu_white : assets.menu_black}
              alt="menu icon"
              className="w-6 cursor-pointer md:hidden"
            />
          </button>
          {/* Map Button */}
        </div>
        {/* mobile menu */}
        <ul
          className="md:hidden flex flex-col items-center gap-5 px-12 py-20 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white"
          ref={sideMenuRef}
        >
          <div className="absolute top-6 right-6" onClick={closeMenu}>
            <Image
              src={isdarkMode ? assets.close_white : assets.close_black}
              alt="close icon"
              className="w-6 cursor-pointer"
            />
          </div>

          <li onClick={closeMenu}>
            <a className="font-Ovo" href="#top">
              Home
            </a>
          </li>
          <li onClick={closeMenu}>
            <a className="font-Ovo" href="#about">
              About
            </a>
          </li>
          <li onClick={closeMenu}>
            <a className="font-Ovo" href="#projects">
              Projects
            </a>
          </li>
          <li onClick={closeMenu}>
            <a className="font-Ovo" href="#services">
              Services
            </a>
          </li>
          <li onClick={closeMenu}>
            <a className="font-Ovo" href="#contact">
              Contact
            </a>
          </li>
          <li onClick={closeMenu}>
            <a className="font-Ovo" href="#resume">
              Resume
            </a>
          </li>
        </ul>
      </nav>

      {/* Map Modal */}
      <MapModal
        isOpen={showMap} // Pass the state to control visibility
        onClose={() => setShowMap(false)} // Function to close the map
        isDarkMode={isdarkMode} // Pass dark mode state
        address="London" // You can change the address or make it dynamic
      />
    </>
  );
};

export default Navbar;
