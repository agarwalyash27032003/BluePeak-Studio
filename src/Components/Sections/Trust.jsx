import React from 'react'
import SectionHeader from '../UI/SectionHeader'
import TrustCard from '../UI/TrustCard'

const Trust = () => {
  return (
    <>
      <SectionHeader title={"Edge"} />
      <div className='max-w-[1200px] mx-auto px-6 py-20'>

          <div className="grid grid-cols-4 gap-8 auto-rows-fr">
              <TrustCard title={"Performance First"} description={"We build websites optimized for speed, scalability, and real-world performance from day one."} image={"https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/3.png"}/>
              <TrustCard title={"On-Time Execution"} description={"We deliver projects on schedule while maintaining the highest quality standards."} image={"https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/2.png"}/>
              <TrustCard title={"Modern Technology"} description={"We use the latest tools and frameworks to deliver secure, future-ready web solutions."} image={"https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/1.png"}/>
              <TrustCard title={"Built for Your Business"} description={"Every website is crafted around your goals, brand identity, and long-term growth."} image={"https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/4.png"}/>
          </div>
      
      </div>
    </>
  )
}

export default Trust