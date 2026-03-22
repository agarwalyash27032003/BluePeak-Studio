import React from 'react'
import SectionHeader from '../../UI/SectionHeader'
import '../../../index.css'
import ContactForm from "../../UI/ContactForm"

const Contact = () => {
  return (
    <>
      <SectionHeader title={"Contact Us"} />
      <div className='w-[90vw] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center'>
        <div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>Ready to Automate Your Business?</h1>
          <h3 className='text-gray-400 text-xl md:text-2xl dm-sans max-w-md'>Let AI handle the hard work while you focus on growth. Book a free AI strategy session today.</h3>
        </div>

        <ContactForm />
      </div>
    </>
  )
}

export default Contact