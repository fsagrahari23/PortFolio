import Image from "next/image";
import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion"; // Import Framer Motion

const Footer = ({ isdarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-20"
    >
      <motion.div
        className="text-center"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={isdarkMode ? assets.logo_dark : assets.logo}
          alt="bg"
          className="w-36 mx-auto mb-2"
        />

        <div className="w-max flex items-center gap-2 mx-auto">
          <Image
            src={isdarkMode ? assets.mail_icon_dark : assets.mail_icon}
            alt="bg"
            className="w-6"
          />
          <span className="font-Ovo">monuagrahari854@gmail.com</span>
        </div>
      </motion.div>

      <motion.div
        className="text-center sm:flex- items-center justify-center border-t border-gray-500 mx-[10%] py-6 mt-12"
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p>Copyright &copy; 2023 Monu Agrahari</p>
        <ul className="flex items-center gap-10 justify-center mt-4 sm:mt-0">
          <motion.li
            whileInView={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <a target="_blank" href="https://github.com/MonuAgrahari">
              Github
            </a>
          </motion.li>
          <motion.li
            whileInView={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <a target="_blank" href="https://www.linkedin.com/in/monuagrahari/">
              Linkedin
            </a>
          </motion.li>
          <motion.li
            whileInView={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <a target="_blank" href="https://twitter.com/MonuAgrahari">
              Twitter
            </a>
          </motion.li>
          <motion.li
            whileInView={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <a target="_blank" href="https://www.instagram.com/monuagrahari/">
              Instagram
            </a>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
