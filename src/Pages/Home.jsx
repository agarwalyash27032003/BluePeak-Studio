import React from 'react'
import Hero from '../Components/Sections/Hero';
import Services from '../Components/Sections/Services';
import Projects from '../Components/Sections/Projects';
import Trust from '../Components/Sections/Trust';
import SkillsSlider from '../Components/UI/SkillsSlider';
import Testimonials from '../Components/Sections/Testimonials';
import ContactForm from '../Components/Sections/ContactForm';
import Footer from '../Components/Layout/Footer';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Projects />
      <Trust />
      <SkillsSlider />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Home;