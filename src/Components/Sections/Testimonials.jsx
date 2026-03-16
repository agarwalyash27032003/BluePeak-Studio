import TestimonialsRow from "../UI/TestimonialsRow"
import "../../index.css"
import SectionHeader from "../UI/SectionHeader"

const testimonials = [
  {
    name: "Emily Rodriguez",
    role: "Data Analyst",
    text: "The AI's ability to analyze data and provide insights is unmatched.",
    img: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "David Park",
    role: "Startup Founder",
    text: "This saved us a lot of development time. The component works flawlessly.",
    img: "https://i.pravatar.cc/100?img=2"
  },
  {
    name: "Daniel Carter",
    role: "Web Designer",
    text: "One of the best testimonial components I've used.",
    img: "https://i.pravatar.cc/100?img=3"
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    text: "This tool saved me hours of work. The automation features are amazing.",
    img: "https://i.pravatar.cc/100?img=4"
  },
  {
    name: "Sarah Thompson",
    role: "Project Manager",
    text: "It's intuitive, fast, and incredibly accurate!",
    img: "https://i.pravatar.cc/100?img=5"
  }
]

export default function Testimonials() {

  return (
    <>
        <SectionHeader title={"Testimonials"}/>
        <section className="py-32">

            <div className="space-y-8 relative testimonial-mask">

                <TestimonialsRow
                testimonials={testimonials}
                direction="left"
                />

                <TestimonialsRow
                testimonials={testimonials}
                direction="right"
                />

            </div>

        </section>
    </>
  )
}