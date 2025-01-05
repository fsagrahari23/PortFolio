import Image from "next/image";
import React from "react";
import { assets, infoList, toolsData } from "../assets/assets";
import { motion } from "motion/react";

const About = ({ isdarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{
        duration: 1,
      }}
      whileInView={{ opacity: 1 }}
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        whileInView={{ y: 0, opacity: 1 }}
        className="text-center mb-5 text-lg font-Ovo"
      >
        Introduction
      </motion.h1>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        whileInView={{ opacity: 1 }}
        className="text-center text-5xl font-Ovo"
      >
        About Me
      </motion.h2>
      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          transition={{
            duration: 0.6,
          }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="w-64 sm:w-80 max-w-none rounded-3xl"
        >
          <Image
            src={assets.user_image}
            alt="user"
            className="w-full rounded-3xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          whileInView={{ opacity: 1 }}
          className="flex-1"
        >
          <motion.p
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 1,
            }}
            whileInView={{ opacity: 1 }}
            className="max-w-2xl mb-10 font-Ovo"
          >
            I am a self-taught developer with a passion for creating innovative
            digital experiences. I have a strong foundation in web development
            and have worked on a wide range of projects, from simple landing
            pages to complex web applications. My goal is to continue learning
            and growing as a developer, and to create meaningful and impactful
            projects that make a difference in people&apos;s lives.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.5,
            }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
          >
            {infoList.map((item, index) => (
              <motion.li
                whileInView={{ scale: 1.05 }}
                key={index}
                className="border-[0.5px] border-gray-500 p-6 rounded-xl cursor-pointer hover:bg-[#fcf4ff]
                hover:-translate-y-1 duration-500
                hover:shadow-black
                dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50
                "
              >
                <Image
                  src={isdarkMode ? item.iconDark : item.icon}
                  alt="check"
                  className="w-7 mt-3"
                />{" "}
                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/80">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
          <motion.h4
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 1,
            }}
            whileInView={{ opacity: 1 }}
            className="my-6 text-gray-700 dark:text-white/80 font-Ovo"
          >
            Tools I use
          </motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.3,
            }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3 sm:gap-5"
          >
            {toolsData.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-center border  border-gray-500 w-12 sm:w-14 aspect-square rounded-lg cursor-pointer hover:bg-[#fcf4ff]
                hover:-translate-y-1 duration-500
                dark:hover:bg-darkHover
                dark:hover:shadow-white
                "
              >
                <Image src={item} alt="check" className="w-5 sm:w-7" />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
