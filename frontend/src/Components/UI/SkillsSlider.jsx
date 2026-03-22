import { useRef, useState } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { FaReact, FaNodeJs, FaHtml5, FaJs, FaCss3Alt } from "react-icons/fa"
import { SiMongodb, SiExpress,SiPostman   } from "react-icons/si"
import { RiTailwindCssFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import SectionHeader from "./SectionHeader";

const skillsSets = [
  {
    text: "Frontend Development",
    skills: [
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt  /> },
      { name: "JavaScript", icon: <FaJs />},
      { name: "React", icon: <FaReact /> },
      { name: "Tailwind CSS", icon: <RiTailwindCssFill /> },
    ]
  },
  {
    text: "Backend Systems",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "REST API", icon: <TbApi /> },
    ]
  },
  {
    text: "Tools",
    skills: [
      { name: "Git / GitHUb", icon: <FaGithub /> },
      { name: "Postman", icon: <SiPostman /> },
    ]
  },
]

export default function SkillsSlider() {

  const containerRef = useRef(null)
  const [index, setIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const totalSets = skillsSets.length

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(
      totalSets - 1,
      Math.floor(v * totalSets)
    )
    setIndex(i)
  })

  return (
    <>
      <SectionHeader title={"Tech Stack  ·"}/>
      <section
        ref={containerRef}
        className="max-w-[1200px] mx-auto px-6 relative h-[300vh]"
      >

        <div className="sticky top-0 h-screen flex items-center">

          <div className="w-full grid grid-cols-[20%_70%_10%] items-center">

            {/* LEFT TEXT */}
            <div className="flex items-center justify-center gap-1 lg:gap-4">

              <h2 className="text-2xl lg:text-4xl font-bold text-white [writing-mode:vertical-rl] rotate-180">
                {skillsSets[index].text}
              </h2>

              <div className="w-[3px] h-28 bg-yellow-400"></div>

            </div>

            {/* SKILLS GRID */}
            <div
              key={index}
              className="grid grid-cols-3 lg:grid-cols-5 gap-10 text-center"
            >

              {skillsSets[index].skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 text-white/80 hover:scale-110 transition"
                >

                  <div className="text-4xl">
                    {skill.icon}
                  </div>

                  <p className="text-sm">
                    {skill.name}
                  </p>

                </div>
              ))}

            </div>

            {/* RIGHT INDICATORS */}
            <div className="flex flex-col items-center gap-6">

              {skillsSets.map((_, i) => (
                <div
                  key={i}
                  className={`w-[2px] h-10 transition ${i === index
                      ? "bg-white"
                      : "bg-white/20"
                    }`}
                />
              ))}

            </div>

          </div>

        </div>

      </section>

    </>
  )
}