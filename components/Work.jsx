import React from "react";
import { assets, workData } from "../assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const Work = ({ isdarkMode }) => {
  return (
    <div id="projects" className="w-full px-[12%] py-10 scroll-mt-20">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Projects
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-5xl font-Ovo"
      >
        My Latest Works
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10 dark:text-black">
        {workData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + index * 0.1, // Slight staggered animation for each item
            }}
            style={{
              backgroundImage: `url(${item.bgImage})`,
              backgroundSize: "cover",
            }}
            className="aspect-square bg-cover bg-center rounded-lg relative cursor-pointer group"
          >
            <motion.div
              className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.5 + index * 0.1, // Staggered effect for each card's content
              }}
            >
              <div>
                <motion.h2
                  className="font-semibold"
                  whileInView={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.h2>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>

              <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                <Image src={assets.send_icon} alt="send icon" className="w-6" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.a
        href=""
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full px-10 py-3 mx-auto my-20 hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 hover:shadow-black dark:text-white dark:border-white dark:hover:bg-darkHover dark:hover:shadow-white"
      >
        Show more{" "}
        <Image
          src={
            isdarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold
          }
          alt="right-arrow"
          className="w-6 inline"
        />
      </motion.a>
    </div>
  );
};

export default Work;
