"use client";
import Image from "next/image";
import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; // Corrected motion import

const Header = () => {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col justify-center items-center gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <Image
          src={assets.profile_img}
          alt="bg"
          className="rounded-full w-32"
        />
      </motion.div>
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3, // Fixed spelling from "dalay" to "delay"
          type: "spring",
          stiffness: 100,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo"
      >
        Hi I'm Monu Agrahari{" "}
        <Image src={assets.hand_icon} alt="bg" className="w-6 inline" />
      </motion.h3>
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6, // Fixed spelling from "dalay" to "delay"
        }}
        whileInView={{ y: 0, opacity: 1 }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo"
      >
        Fullstack Developer based in LuckNow.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.9, // Adjusted delay for staggered animation
        }}
        whileInView={{ opacity: 1 }}
        className="max-w-2xl mx-auto font-Ovo"
      >
        I am a self-taught developer with a passion for creating innovative
        digital experiences. I have a strong foundation in web development and
        have worked on a wide range of projects, from simple landing pages to
        complex web applications.
      </motion.p>
      <div className="flex flex-col md:flex-row items-center mt-4 gap-4">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.2, // Adjusted delay for staggered animation
          }}
          whileInView={{ y: 0, opacity: 1 }}
          href="#contact"
          className="px-10 py-3 border rounded-full border-white bg-black text-white flex items-center gap-2 dark:bg-transparent"
        >
          Contact me{" "}
          <Image
            src={assets.right_arrow_white}
            alt="bg"
            className="w-4 inline"
          />
        </motion.a>
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.4, // Adjusted delay for staggered animation
          }}
          whileInView={{ y: 0, opacity: 1 }}
          href="/assets/sample-resume.pdf"
          download
          className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:bg-white dark:text-black"
        >
          My Resume{" "}
          <Image src={assets.download_icon} alt="bg" className="w-4 inline" />
        </motion.a>
      </div>
    </div>
  );
};

export default Header;
