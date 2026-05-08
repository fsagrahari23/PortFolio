"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Certificates = () => {
  const certificates = useSelector((state) => state.portfolio.certificates);
  const certificateStatus = useSelector(
    (state) => state.portfolio.status.certificates
  );

  return (
    <section id="resume" className="w-full px-[12%] py-10 scroll-mt-20">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Credentials
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-5xl font-Ovo"
      >
        Certificates
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl mx-auto font-Ovo text-center mt-5 mb-12"
      >
        A collection of certificates, documents, and resume snapshots from my
        journey.
      </motion.p>

      {!certificates.length && (
        <p className="text-center text-sm text-gray-500 dark:text-white/70">
          {certificateStatus === "loading"
            ? "Loading certificates..."
            : "No certificates available right now."}
        </p>
      )}

      {!!certificates.length && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((item, index) => (
            <motion.a
              key={item._id}
              href={item.fileUrl || item.image}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-darkHover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-darkTheme">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-Ovo">{item.title}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-white/60">
                    {item.fileType === "application/pdf" ? "Open PDF" : "View"}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-white/80">
                  {item.organization}
                </p>
                <p className="text-sm text-gray-600 dark:text-white/70">
                  {item.date}
                </p>
                {(item.fileName || item.fileType) && (
                  <p className="text-xs text-gray-500 dark:text-white/60">
                    {[item.fileName, item.fileType].filter(Boolean).join(" • ")}
                  </p>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Certificates;
