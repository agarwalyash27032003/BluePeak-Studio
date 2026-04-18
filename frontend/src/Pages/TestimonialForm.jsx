import React from 'react'
import HoverRating from '../Components/UI/HoverRating'

const TestimonialForm = () => {
  return (
    <div className='mt-32 py-10 px-4 lg:px-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden lg:ml-16 lg:mr-16'>
        <form action="">
            <div>
                <h2>Company Name</h2>
                <input type="text" />
            </div>
            <div>
                <h2>Role in Company</h2>
                <input type="text" />
            </div>
            {/* <div>
                <HoverRating />
            </div> */}
            <div>
                <h2>Testimonial</h2>
                <textarea name="" id=""></textarea>
            </div>
        </form>
    </div>
  )
}

export default TestimonialForm