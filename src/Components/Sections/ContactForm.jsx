import React from 'react'
import SectionHeader from '../UI/SectionHeader'
import '../../index.css'
import Button from "../UI/Button"

const ContactForm = () => {
  return (
    <>
      <SectionHeader title={"Contact Us"} />
      <div className='max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center'>
        <div>
          <h1 className='text-5xl font-bold'>Ready to Automate Your Business?</h1>
          <h3 className='text-xl'>Let AI handle the hard work while you focus on growth. Book a free AI strategy session today.</h3>
        </div>

        <div className='p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden ml-16 mr-16'>
          <form action="" className='contact-us-form flex flex-col gap-3 justify-center'>
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
            <div className='w-[50%] mx-auto'> 
              <Button title={"Submit!"} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactForm