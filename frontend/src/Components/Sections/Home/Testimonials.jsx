import TestimonialsRow from "../../UI/TestimonialsRow"
import "../../../index.css"
import SectionHeader from "../../UI/SectionHeader"

const testimonials = [
  {
    name: "Tvastih Studio",
    text: "Had a really great experience working with BluePeak Studio—they understood exactly what we wanted and delivered a clean, modern website that looks great and works smoothly. The whole process was easy, communication was clear, and they were quick with changes. Very happy with the final result and would definitely recommend them.",
    img: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "David Park",
    text: "This saved us a lot of development time. The component works flawlessly.",
    img: "https://i.pravatar.cc/100?img=2"
  },
  {
    name: "Daniel Carter",
    text: "One of the best testimonial components I've used.",
    img: "https://i.pravatar.cc/100?img=3"
  },
  {
    name: "Michael Chen",
    text: "This tool saved me hours of work. The automation features are amazing.",
    img: "https://i.pravatar.cc/100?img=4"
  },
  {
    name: "Sarah Thompson",
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