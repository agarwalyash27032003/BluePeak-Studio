import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import BorderGlow from '../../../Components/UI/BorderGlow';

const services = [
  {
    title: "Website Development",
    desc: "We build fast, scalable, and high-performance websites using modern technologies like React and Next.js.",
    image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Website%20Development.png"
  },
  {
    title: "UI/UX Design",
    desc: "Crafting intuitive and visually engaging interfaces that improve user experience and drive conversions.",
    image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Website%20Development.png"
  },
  {
    title: "E-Commerce",
    desc: "Design and development of modern online stores that scale with your business and maximize revenue.",
    image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Website%20Development.png"
  },
  {
    title: "Landing Pages",
    desc: "High-converting landing pages built for marketing campaigns and lead generation.",
    image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Website%20Development.png"
  },
  {
    title: "Optimization",
    desc: "Performance, SEO, and technical improvements to boost speed and rankings.",
    image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Website%20Development.png"
  },
];

export default function ServicesSection() {

  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(
      services.length - 1,
      Math.floor(v * services.length)
    );
    setActive(index);
  });

  return (
    <>
      {/* <SectionHeader title={"Services"} /> */}

      <h1 className="
  flex justify-center text-center items-center
  pt-24 sm:pt-28 md:pt-36
  mb-10 sm:mb-16
  text-5xl md:text-7xl font-bold leading-tight font-[azonix] px-4
">
        Services
      </h1>
      <section
        ref={ref}
        className="relative h-[300vh] w-[90%] mx-auto px-4 sm:px-6 mt-[10rem] sm:mt-16"
      >

        <div className="sticky top-0 h-screen flex items-center">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

            {/* LEFT SIDE (Titles) */}
            <div className="flex flex-col justify-center gap-6 services-page-left-side">

              {services.map((s, i) => (
                <motion.h2
                  key={i}
                  animate={{
                    opacity: i === active ? 1 : 0.3,
                    x: i === active ? 0 : -30,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`text-3xl font-semibold font-[dual] cursor-pointer ${i === active ? "text-yellow-400" : "text-white"
                    }`}
                >
                  {s.title}
                </motion.h2>
              ))}

            </div>

            {/* RIGHT SIDE (Content Card) */}
            <div className="flex items-center">

              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}

              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#060010"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                >
                  <div className="p-[2rem] flex flex-col justify-center items-center text-center">
                    <img src={services[active].image} alt="" className="h-[30vh]" />
                    <h2 className="text-3xl font-semibold font-[dual]">{services[active].title}</h2>
                    <p className="text-gray-400 text-lg dm-sans">{services[active].desc}</p>
                  </div>
                </BorderGlow>

              </motion.div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}
