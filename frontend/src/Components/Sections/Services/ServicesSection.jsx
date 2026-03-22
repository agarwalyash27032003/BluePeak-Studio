import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import BorderGlow from "../../../Components/UI/BorderGlow";

const services = [
  {
    title: "Website Development",
    desc: "We build fast, scalable, and high-performance websites using modern technologies like React and Next.js.",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Website%20Development.png",
  },
  {
    title: "UI/UX Design",
    desc: "Crafting intuitive and visually engaging interfaces that improve user experience and drive conversions.",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/UIUX.png",
  },
  {
    title: "E-Commerce",
    desc: "Design and development of modern online stores that scale with your business and maximize revenue.",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/E%20Commerce.png?updatedAt=1774040342739",
  },
  {
    title: "Landing Pages",
    desc: "High-converting landing pages built for marketing campaigns and lead generation.",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Landing%20Pages.png?updatedAt=1774040342871",
  },
  {
    title: "Optimization",
    desc: "Performance, SEO, and technical improvements to boost speed and rankings.",
    image:
      "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/SEO.png?updatedAt=1774214178321",
  },
];

export default function ServicesSection() {
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size properly
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Use correct ref dynamically
  const { scrollYProgress } = useScroll({
    target: isMobile ? mobileRef : desktopRef,
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
      {/* HEADING */}
      {/* <h1 className="flex justify-center text-center items-center pt-20 sm:pt-28 md:pt-36 mb-8 sm:mb-16 text-3xl sm:text-5xl md:text-7xl font-bold leading-tight font-[azonix] px-4">
        Services
      </h1> */}

      {/* ================= MOBILE ================= */}
      <section
        ref={mobileRef}
        className="md:hidden relative h-[250vh] w-[90%] mx-auto px-4"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center">

          

          {/* Title */}
          <motion.h2
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-semibold font-[dual] text-yellow-400 mb-6 text-center"
          >
            {services[active].title}
          </motion.h2>

          {/* Card */}
          <motion.div
            key={active + "card"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#060010"
              borderRadius={20}
              glowRadius={30}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={["#c084fc", "#f472b6", "#38bdf8"]}
            >
              <div className="p-5 flex flex-col items-center text-center">
                <img
                  src={services[active].image}
                  alt=""
                  className="h-[15rem] mb-4"
                />
                <p className="dm-sans text-gray-400 text-xl">
                  {services[active].desc}
                </p>
              </div>
            </BorderGlow>
          </motion.div>
        </div>
      </section>

      {/* ================= DESKTOP ================= */}
      <section
        ref={desktopRef}
        className="hidden md:block relative h-[300vh] w-[90%] mx-auto px-6 mt-16"
      >
        <div className="sticky top-[80px] h-[calc(100vh-80px)] flex items-center">
          <div className="grid grid-cols-2 gap-12 w-full">

            {/* LEFT */}
            <div className="flex flex-col justify-center gap-6">
              {services.map((s, i) => (
                <motion.h2
                  key={i}
                  animate={{
                    opacity: i === active ? 1 : 0.3,
                    x: i === active ? 0 : -30,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`text-2xl lg:text-3xl font-semibold font-[dual] cursor-pointer ${
                    i === active ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {s.title}
                </motion.h2>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
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
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                >
                  <div className="px-8 py-4 flex flex-col items-center text-center">
                    <img
                      src={services[active].image}
                      alt=""
                      className="h-[200px]"
                    />
                    <h2 className="text-3xl font-semibold font-[dual] mt-4">
                      {services[active].title}
                    </h2>
                    <p className="text-gray-400 text-lg mt-2">
                      {services[active].desc}
                    </p>
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