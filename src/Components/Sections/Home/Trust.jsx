import React from 'react'
import SectionHeader from '../../UI/SectionHeader'
import TrustCard from '../../UI/TrustCard'

const Trust = () => {
  return (
    <>
      <SectionHeader title={"Edge"} />

      <section className="max-w-[1200px] mx-auto px-6 py-20">

        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-6 
          auto-rows-fr
        ">

          <TrustCard 
            title="Performance First"
            description="We build websites optimized for speed, scalability, and real-world performance."
            image="https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/3.png"
          />

          <TrustCard 
            title="On-Time Execution"
            description="We deliver projects on schedule while maintaining high quality standards."
            image="https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/2.png"
          />

          <TrustCard 
            title="Modern Technology"
            description="We use modern tools and frameworks to build secure and scalable solutions."
            image="https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/1.png"
          />

          <TrustCard 
            title="Built for Your Business"
            description="Every website is tailored to your brand, goals, and long-term growth."
            image="https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/4.png"
          />

        </div>

      </section>
    </>
  )
}

export default Trust