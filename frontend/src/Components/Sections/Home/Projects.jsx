import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import SectionHeader from "../../UI/SectionHeader"
import './Projects.css'

const projects = [
  { id: 1, title: "Chikoo Constructions", image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-21%20003541.png", link: "https://chikoo-constructions.vercel.app/" },
  { id: 2, title: "Tvastih Studio", image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-11%20221051.png", link: "https://agarwalyash2703.wixsite.com/tvastih" },
  { id: 3, title: "WanderLust", image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-11%20221731.png", link: "https://wanderlust-1k0r.onrender.com/listings" },
  { id: 4, title: "Glass Studio Siliguri", image: "https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/Screenshot%202026-03-11%20221510.png", link: "https://zolomedia.wixsite.com/glass-decor" },
]

export default function Projects() {

  const containerRef = useRef(null)
  const galleryRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const totalDistance = useTransform(scrollYProgress, [0, 1], [0, -1200]) // temp fallback

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
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-item"
              >

                <img
                  src={project.image}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  alt={project.title}
                />

                <div className="item-content">
                  <span className="item-number">0{project.id}</span>
                  <h2>{project.title}</h2>
                </div>

              </a>
            ))}
          </motion.div>

        </div>

      </div>

    </div>
  )
}