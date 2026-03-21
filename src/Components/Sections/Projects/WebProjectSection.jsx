import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Chikoo Constructions",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-21%20003541.png",
    link: "https://your-site-1.com",
  },
  {
    title: "Tvastih Studio",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-11%20221051.png",
    link: "https://your-site-2.com",
  },
  {
    title: "WanderLust",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-11%20221731.png",
    link: "https://your-site-3.com",
  },
  {
    title: "Glass Studio Siliguri",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-11%20221510.png",
    link: "https://your-site-4.com",
  },
];

const WebProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".project-item");

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:border-y lg:border-white">

      {/* LEFT */}
      <div className="lg:border-r lg:border-white px-[5rem] hidden lg:block">
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight font-[azonix]">All Works</h1>
          <p className="text-gray-400 text-xl md:text-2xl dm-sans transition-all duration-500">
            {projects[activeIndex].title}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="px-[3rem] space-y-32 lg:py-[5rem]">

        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block project-item group"

            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl">

              {/* IMAGE */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <span className="text-white text-lg tracking-wide">
                  View Project →
                </span>
              </div>

            </div>
            <div className="flex flex-row justify-between mt-[5px] text-gray-400 text-lg dm-sans">
              <h1>({index + 1})</h1>
              <h1>{project.title}</h1>
            </div>
          </motion.a>
        ))}

      </div>
    </div>
  );
};

export default WebProjectSection;