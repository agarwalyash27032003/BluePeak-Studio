import React from 'react'
import logo from "../../Assets/4.png"
import Button from '../UI/Button'

const Hero = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 min-h-screen flex items-center justify-between">

      <div className="w-[60%]">

        <h1 className="text-7xl font-bold leading-tight">
          Design • Build •
        </h1>

        <h1 className="text-7xl font-bold leading-tight">
          Elevate
        </h1>

        <p className="text-xl mt-6 text-gray-300">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Quod omnis quibusdam maxime itaque placeat quaerat alias.
        </p>

        <div className="mt-8" >
          <Button title={"Get Started!"}/>
        </div>

      </div>

      <img className="h-28" src={logo} alt="" />

    </section>
  )
}

export default Hero