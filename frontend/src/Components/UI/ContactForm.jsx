import React from 'react'
import Button from './Button'

const ContactForm = () => {
  return (
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
  )
}

export default ContactForm