import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, LayoutGroup } from "framer-motion";
import "../../../index.css"

const services = [
  {
    id: "01",
    title: "Website Development",
    tagline: "High-Performance Engineering",
    desc: "We build fast, scalable, and high-performance websites using modern technologies like React and Next.js.",
    features: ["React / Next.js", "Scalable Architecture", "Clean Code"],
    accent: "#5DCAA5"
  },
  {
    id: "02",
    title: "UI/UX Design",
    tagline: "Human-Centric Design",
    desc: "Crafting intuitive and visually engaging interfaces that improve user experience and drive conversions.",
    features: ["Visual Strategy", "User Experience", "Interactive Prototypes"],
    accent: "#378ADD"
  },
  {
    id: "03",
    title: "E-Commerce",
    tagline: "Scalable Digital Commerce",
    desc: "Design and development of modern online stores that scale with your business and maximize revenue.",
    features: ["Storefront Design", "Revenue Growth", "Modern Tech"],
    accent: "#fbbf24"
  },
  {
    id: "04",
    title: "Landing Pages",
    tagline: "Conversion Engines",
    desc: "High-converting landing pages built for marketing campaigns and lead generation.",
    features: ["Lead Gen Focus", "Fast Loading", "Marketing Optimized"],
    accent: "#EF9F27"
  },
  {
    id: "05",
    title: "Optimization",
    tagline: "Technical Excellence",
    desc: "Performance, SEO, and technical improvements to boost speed and rankings.",
    features: ["SEO Mastery", "Speed Optimization", "Technical Audit"],
    accent: "#378ADD"
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(services.length - 1, Math.floor(v * services.length));
    if (index !== active) setActive(index);
  });

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Optimized Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 transition-colors duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${services[active].accent} 0%, transparent 70%)` }}
        />

        <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-center z-10">
          
          {/* LEFT: THE NAVIGATOR */}
          <div className="md:col-span-5">

            <div className="relative space-y-10 pl-6 border-l border-white/5">
              <LayoutGroup>
                {services.map((s, i) => (
                  <div key={i} className="relative">
                    {i === active && (
                      <motion.div 
                        layoutId="navIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute -left-[26px] top-0 bottom-0 w-[3px] bg-yellow-400 shadow-[0_0_15px_#fbbf24]"
                      />
                    )}
                    <div className={`transition-all duration-500 ${i === active ? "translate-x-4 opacity-100" : "opacity-20"}`}>
                      <span className="block text-[10px] font-bold mb-1 font-mono" style={{ color: s.accent }}>{s.id}</span>
                      <h3 className="text-2xl md:text-3xl font-[azonix] text-white uppercase tracking-tighter">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </LayoutGroup>
            </div>
          </div>

          {/* RIGHT: THE DISPLAY CANVAS */}
          <div className="md:col-span-7 relative h-[500px]">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ 
                  opacity: index === active ? 1 : 0,
                  x: index === active ? 0 : 30,
                  scale: index === active ? 1 : 0.95,
                  pointerEvents: index === active ? "auto" : "none"
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[#0d1224] border border-white/5 rounded-[40px] p-10 md:p-16 overflow-hidden flex flex-col justify-center"
                style={{ willChange: "opacity, transform" }}
              >
                {/* Visual Accent */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20" 
                  style={{ background: service.accent }}
                />

                <div className="relative z-10">
                  <span className="hero-badge mb-6">
                    {service.tagline}
                  </span>
                  
                  <h4 className="text-4xl font-[azonix] text-white mb-6 leading-tight">
                    {service.title}
                  </h4>
                  
                  <p className="dm-sans text-xl text-white/50 leading-relaxed mb-10 max-w-lg">
                    {service.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span className="text-xs font-bold text-white/80 tracking-wide uppercase">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Number Watermark */}
                <span className="absolute -bottom-10 -right-10 text-[180px] font-[azonix] text-white/[0.02] pointer-events-none">
                  {service.id}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}