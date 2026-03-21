import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "../../UI/SectionHeader"
import GlassStudioSlg from "../../../Assets/Projects/Glass Studio Slg.png"
import TvastihStudio from "../../../Assets/Projects/Tvastih.png"
import WanderLust from "../../../Assets/Projects/WanderLust.png"
import './Projects.css'

const projects = [
  { id: 1, title: "WanderLust", image: WanderLust },
  { id: 2, title: "Tvastih Studio", image: TvastihStudio },
  { id: 3, title: "Glass Studio Siliguri", image: GlassStudioSlg },
]

export default function Projects() {

  const containerRef = useRef(null)
  const galleryRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const totalDistance = useTransform(scrollYProgress, [0, 1], [0, -800]) // temp fallback

  return (
    <div id="example">

      <SectionHeader title={"Projects"} />

      <div ref={containerRef} className="scroll-container">

        <div className="sticky-wrapper">

          <motion.div
            ref={galleryRef}
            style={{ x: totalDistance }}
            className="gallery"
          >

            {projects.map(project => (
              <div key={project.id} className="gallery-item">

                <img
                  src={project.image}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                <div className="item-content">
                  <span className="item-number">0{project.id}</span>
                  <h2>{project.title}</h2>
                </div>

              </div>
            ))}

          </motion.div>

        </div>

      </div>

    </div>
  )
}