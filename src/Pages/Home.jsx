import React from 'react'
import Hero from '../Components/Sections/Home/Hero';
import Services from '../Components/Sections/Home/Services';
import Projects from '../Components/Sections/Home/Projects';
import Trust from '../Components/Sections/Home/Trust';
import SkillsSlider from '../Components/UI/SkillsSlider';
import Testimonials from '../Components/Sections/Home/Testimonials';
import ContactForm from '../Components/Sections/Home/ContactForm';
import Footer from '../Components/Layout/Footer';
import Reveal from '../Components/UI/Reveal';

const Home = () => {
  return (
    <div>

      <Hero /> {/* no animation */}

      <Reveal>
        <Services />
      </Reveal>

      <Reveal>
        <Projects />
      </Reveal>

      <Reveal>
        <Trust />
      </Reveal>

      <Reveal>
        <SkillsSlider />
      </Reveal>

      <Reveal>
        <Testimonials />
      </Reveal>

      <Reveal>
        <ContactForm />
      </Reveal>

    </div>
  )
}

export default Home;