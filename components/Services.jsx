import React from "react";
import { assets, serviceData } from "../assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
      <motion.h1
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        What I Offer
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        whileInView={{ opacity: 1 }}
        className="text-center text-5xl font-Ovo"
      >
        My Services
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.7,
        }}
        whileInView={{ opacity: 1 }}
        className="max-w-2xl mx-auto font-Ovo text-center mt-5 mb-12"
      >
        I am a self-taught developer with a passion for creating innovative
        digital experiences. I have a strong foundation in web development and
        have worked on a wide range of projects, from simple landing pages to
        complex web applications.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {serviceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 1 + index * 0.2, // Stagger animation for each item
            }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border-[0.5px] border-gray-500 p-6 rounded-xl cursor-pointer hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:bg-darkHover dark:hover:shadow-white"
          >
            <div className="flex items-center gap-2">
              <Image src={item.icon} alt="bg" className="w-6" />
              <motion.h3
                whileInView={{ scale: 1.05 }}
                className="font-Ovo text-lg my-4 text-gray-700 dark:text-white"
              >
                {item.title}
              </motion.h3>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.2,
              }}
              whileInView={{ opacity: 1 }}
              className="font-Ovo text-sm text-gray-600 dark:text-white/80 leading-5"
            >
              {item.description}
            </motion.p>
            <motion.a
              href={item.link}
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.4,
              }}
              whileInView={{ opacity: 1 }}
              className="font-Ovo flex items-center gap-2 justify-between mt-4 rounded-full"
            >
              Read more
              <Image src={assets.right_arrow} alt="bg" className="w-6 inline" />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
