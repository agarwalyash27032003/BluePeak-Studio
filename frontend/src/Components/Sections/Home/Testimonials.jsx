import TestimonialsRow from "../../UI/TestimonialsRow"
import "../../../index.css"
import SectionHeader from "../../UI/SectionHeader"

const testimonials = [
  {
    name: "Tvastih Studio",
    text: "Had a really great experience working with BluePeak Studio—they understood exactly what we wanted and delivered a clean, modern website that looks great and works smoothly. Very happy with the final result and would definitely recommend them.",
    img: "https://ik.imagekit.io/bluepeakstudio/Chikoo%20Constructions/Logo.jpg"
  },
  {
    name: "Zolo Media",
    text: "Yash delivered high-quality work on the project. His proficiency was evident in the innovative solutions he implemented.",
    img: "https://ik.imagekit.io/bluepeakstudio/Chikoo%20Constructions/1667542912129.jpg"
  },
  {
    name: "Mr Lazy Tech",
    text: "BluePeak Studio did an amazing job building my blogging website—they perfectly understood my needs as a tech YouTuber and delivered a clean, fast, and user-friendly site. What impressed me the most is that the website started ranking on several high-performing keywords within a short time.",
    img: "https://ik.imagekit.io/bluepeakstudio/Chikoo%20Constructions/channels4_profile%20(1).jpg"
  },
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