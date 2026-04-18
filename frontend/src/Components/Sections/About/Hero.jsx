import { useEffect, useRef } from 'react'
import './AboutUs.css'

const steps = [
  { num: '01', title: 'Discovery', desc: 'We align your business goals with a technical roadmap built for scale.', color: '#5DCAA5' },
  { num: '02', title: 'Design', desc: 'Crafting high-fidelity interfaces that define your digital identity.', color: '#378ADD' },
  { num: '03', title: 'Engineering', desc: 'Clean, modular code built with React and Node for maximum performance.', color: '#fbbf24' },
  { num: '04', title: 'Optimization', desc: 'Post-launch auditing to ensure your impact grows day after day.', color: '#D85A30' }
]

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('[data-reveal]')
    if (!els) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="about-page" ref={containerRef}>
      <div className="about-inner">
        {/* HERO SECTION */}
        <header className="about-hero">
          <span className="port-badge" data-reveal>The Studio</span>
          <h1 className="about-headline" data-reveal>
            Engineering <span className="text-gradient">Digital Impact.</span>
          </h1>
          <p className="about-sub" data-reveal>
            BluePeak Studio is a boutique development firm specialized in building 
            premium web experiences. We bridge the gap between heavy-duty engineering 
            and world-class UI design.
          </p>
        </header>

        {/* PROCESS SECTION - Editorial Style */}
        <div className="process-container">
          <div className="process-sticky" data-reveal>
            <span className="port-badge">Our Method</span>
            <h2 className="sticky-hl">The<br/>Process</h2>
          </div>
          <div className="process-list">
            {steps.map((step) => (
              <div key={step.num} className="process-item" data-reveal>
                <span className="step-num">{step.num}</span>
                <div className="step-body">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEAD ARCHITECT - Light Theme Version */}
        <div className="architect-box" data-reveal>
          <div className="arch-visual">YA</div>
          <div className="arch-content">
            <span className="port-badge">Lead Architect</span>
            <h2 className="arch-name">Yash Agarwal</h2>
            <p className="arch-bio">
              With a background in Full-Stack Web Development, Yash founded BluePeak 
              to ensure every project is built on a foundation of performance and 
              scalability. Every line of code is reviewed to meet elite studio standards.
            </p>
            <div className="arch-tags">
              <span className="arch-tag">React Expert</span>
              <span className="arch-tag">System Design</span>
              <span className="arch-tag">UI/UX Strategy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}