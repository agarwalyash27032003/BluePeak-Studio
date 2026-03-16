import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "../UI/SectionHeader";
import GlassStudioSlg from "../../Assets/Projects/Glass Studio Slg.png"
import TvastihStudio from "../../Assets/Projects/Tvastih.png"
import WanderLust from "../../Assets/Projects/WanderLust.png"
import '../../Projects.css'

const projects = [
  { id: 1, title: "WanderLust", image: WanderLust },
  { id: 2, title: "Tvastih Studio", image: TvastihStudio },
  { id: 3, title: "Glass Studio Siliguri", image: GlassStudioSlg },
]

const CARD_WIDTH = 600
const GAP = 40

export default function Projects() {

  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const totalDistance = (projects.length - 1) * (CARD_WIDTH + GAP)

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -200])

  return (
    <div id="example">
        <section className="intro-section">
        </section>
        <SectionHeader className="m-0" title={"Projects"} />
        <div ref={containerRef} className="scroll-container">

        <div className="sticky-wrapper">

            {/* TITLE */}
            {/* <motion.h1
            style={{ y: titleY }}
            className="text-6xl font-bold mb-20"
            >
            Projects
            </motion.h1> */}

            {/* CARDS */}
            <motion.div
            style={{ x }}
            className="gallery"
            >

            {projects.map(project => (
                <div
                key={project.id}
                className="gallery-item"
                >

                <img
                    src={project.image}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" /> */}

                <div className="item-content">

                    <span className="item-number">
                    0{project.id}
                    </span>

                    <h2>
                    {project.title}
                    </h2>

                </div>

                </div>
            ))}

            </motion.div>

        </div>

        </div>
    </div>
  )
}