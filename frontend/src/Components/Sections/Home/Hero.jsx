import React, { useEffect, useRef, useState } from 'react';
import Button from '../../UI/Button';
import '../../../Hero.css';

const Hero = () => {
  const leftRef = useRef(null);
  const [counts, setCounts] = useState({ projects: 0, satisfaction: 0, lift: 0 });
  
  const words = ["Design", "Build", "Elevate"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const els = leftRef.current?.querySelectorAll('[data-reveal]');
    if (els) {
      els.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 100);
        });
      });
    }

    const duration = 2000;
    const totalFrames = Math.round(duration / (1000 / 60));
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = (t => t * (2 - t))(frame / totalFrames);
      setCounts({
        projects: Math.floor(progress * 12),
        satisfaction: Math.floor(progress * 100),
        lift: Math.floor(progress * 3)
      });
      if (frame === totalFrames) clearInterval(timer);
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-container">
      <div className="hero-content-wrapper">
        <div ref={leftRef} className="hero-left">
          <div data-reveal className="badge-reveal-wrapper">
            <span className="hero-badge">Web Development Agency</span>
          </div>

          <h1 className="hero-headline" data-reveal>
            We <span className="typewriter-box">
              <span className="accent">
                {words[index].substring(0, subIndex)}
              </span>
              <span className="cursor">|</span>
            </span>
            <br />
            digital impact.
          </h1>

          <p className="hero-sub" data-reveal>
            High-performance web applications tailored for startups and businesses that need to scale fast and look incredible.
          </p>

          <div data-reveal className="hero-cta-wrapper">
            <Button 
              title="Book a Free Call"
              onClick={() => window.location.href = '#contact'} 
              className="hero-primary-btn"
            />
          </div>

          <div className="hero-stats-row" data-reveal>
            <div className="stat-item">
              <h3>{counts.projects}+</h3>
              <p>Projects</p>
            </div>
            <div className="stat-item">
              <h3>{counts.satisfaction}%</h3>
              <p>Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>{counts.lift}x</h3>
              <p>Avg. Lift</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-logo-glow">
            <img src="https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/BPS.png?updatedAt=1773667763921" alt="Logo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;