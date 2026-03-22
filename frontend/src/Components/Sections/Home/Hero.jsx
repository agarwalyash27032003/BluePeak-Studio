import React from 'react'
import Button from '../../UI/Button'

const Hero = () => {
  return (
    <section className="max-w-[1200px] my-[5rem] md:my-[10rem] mx-auto px-6 h-full flex flex-col md:flex-row items-center lg:justify-between lg:gap-12">

      {/* LEFT CONTENT */}
      <div className="w-full md:w-[55%] text-center md:text-left">

        <h1 className="text-4xl md:text-7xl font-bold leading-tight font-[azonix]">
          <span className="whitespace-nowrap">Design •</span>{" "}
          <span className="whitespace-nowrap">Build •</span>{" "}
          <span className="whitespace-nowrap">Elevate</span>
        </h1>

        <p className="mt-6 max-w-xl mx-auto md:mx-0 text-gray-400 text-lg md:text-2xl dm-sans">
          We design and develop modern websites that are fast, scalable, and built to drive real results for your business.
        </p>

        <div className="mt-8 flex justify-center md:justify-start">
          <Button title={"Get Started!"} />
        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-[45%] flex justify-center">
        <img
          className="w-[250px] sm:w-[320px] md:w-[400px] lg:w-[450px] object-contain"
          src="https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/BPS.png?updatedAt=1773667763921"
          alt=""
        />
      </div>

    </section>
  )
}

export default Hero