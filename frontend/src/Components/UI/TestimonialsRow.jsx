import { useState } from "react"
import TestimonialCard from "./TestimonialCard"

export default function TestimonialsRow({ testimonials, direction }) {

  const [paused, setPaused] = useState(false)

  const items = [...testimonials, ...testimonials]

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >

      <div
        className={`flex gap-6 w-max ${
          direction === "left"
            ? "animate-scroll-left"
            : "animate-scroll-right"
        }`}
        style={{
          animationPlayState: paused ? "paused" : "running"
        }}
      >

        {items.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}

      </div>

    </div>
  )
}