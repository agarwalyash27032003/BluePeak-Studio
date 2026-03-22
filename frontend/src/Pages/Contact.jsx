import React from 'react'
import ContactForm from "../Components/UI/ContactForm"
import ContactInfo from '../Components/Sections/Contact/ContactInfo'

const Contact = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 w-[80%] mx-auto mt-[5rem] md:mt-[10rem]'>
            <ContactInfo />
            <ContactForm />
        </div>
    )
}

export default Contact