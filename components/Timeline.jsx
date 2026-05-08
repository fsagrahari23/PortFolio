"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { LuBookOpen, LuBriefcase, LuGraduationCap } from "react-icons/lu";

const iconMap = {
  BookOpen: LuBookOpen,
  GraduationCap: LuGraduationCap,
  Briefcase: LuBriefcase,
};

const Timeline = () => {
  const timelineItems = useSelector((state) => state.portfolio.timelineItems);
  const timelineStatus = useSelector((state) => state.portfolio.status.timeline);

  return (
    <section id="timeline" className="w-full px-[12%] py-10 scroll-mt-20">
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        Journey So Far
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-5xl font-Ovo"
      >
        Timeline
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl mx-auto font-Ovo text-center mt-5 mb-12"
      >
        A quick view of my academic and professional milestones.
      </motion.p>

      {!timelineItems.length && (
        <p className="text-center text-sm text-gray-500 dark:text-white/70">
          {timelineStatus === "loading"
            ? "Loading timeline..."
            : "No timeline items available right now."}
        </p>
      )}

      {!!timelineItems.length && (
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-px bg-gray-300 dark:bg-white/15 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8">
            {timelineItems.map((item, index) => {
              const Icon = iconMap[item.icon] || LuBookOpen;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex sm:items-center ${
                    index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
                  }`}
                >
                  <div className="absolute left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-darkHover sm:left-1/2">
                    <Icon className="text-lg" />
                  </div>

                  <div
                    className={`ml-14 w-full rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-darkHover sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                      index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gray-600 dark:bg-darkTheme dark:text-white/70">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-white/60">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-Ovo">{item.title}</h3>
                    <p className="mt-2 text-sm font-medium text-gray-700 dark:text-white/80">
                      {item.organization}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-white/70">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Timeline;
