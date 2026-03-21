import React from 'react'
import SectionHeader from '../../UI/SectionHeader'
import '../../../index.css'
import Button from "../../UI/Button"

const ContactForm = () => {
  return (
    <>
      <SectionHeader title={"Contact Us"} />
      <div className='w-[90vw] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center'>
        <div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>Ready to Automate Your Business?</h1>
          <h3 className='text-gray-400 text-xl md:text-2xl dm-sans max-w-md'>Let AI handle the hard work while you focus on growth. Book a free AI strategy session today.</h3>
        </div>

        <div className='py-10 px-4 lg:px-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden lg:ml-16 lg:mr-16'>
          <form action="" className='contact-us-form flex flex-col gap-3 justify-center dm-sans'>
            <div>
              <h2>Name</h2>
              <input type="text" name="" id="" />
            </div>
            <div>
              <h2>Contact Number</h2>
              <input type="number" name="" id="" />
            </div>
            <div>
              <h2>Email</h2>
              <input type="email" name="" id="" />
            </div>
            <div>
              <h2>Message</h2>
              <textarea name="" id=""></textarea>
            </div>
            <div className='w-[50%] mx-auto flex justify-center items-center'> 
              <Button title={"Submit!"} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactForm