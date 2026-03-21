import React from "react"

const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-28">

      {/* BIG BACKGROUND TEXT */}
      <h1 className="absolute top:0 lg:bottom-0 left-1/2 -translate-x-1/2 
      text-[6rem] lg:text-[20vw] font-bold text-white/5 select-none pointer-events-none">
        bluepeak
      </h1>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 dm-sans">

        {/* TOP SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-12">

          {/* CONTACT */}
          <div className="space-y-4">
            <p className="text-sm text-white/40 tracking-widest">
              [ CALL US ]
            </p>

            <p className="text-sm lg:text-lg text-white">
              +91 93781 73053
            </p>

            <p className="text-sm text-white/40 tracking-widest mt-6">
              [ MAIL US ]
            </p>

            <p className="text-sm lg:text-lg font-semibold break-all">
              thebluepeakstudio@gmail.com
            </p>
          </div>


          {/* NAVIGATION */}
          <div>
            <p className="text-sm text-white/40 tracking-widest mb-4">
              [ NAVIGATION ]
            </p>

            <ul className="space-y-3 text-white/80">
              <li>Home</li>
              <li>Projects</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>


          {/* SERVICES */}
          <div>
            <p className="text-sm text-white/40 tracking-widest mb-4">
              [ SERVICES ]
            </p>

            <ul className="space-y-3 text-white/80">
              <li>Website Development</li>
              <li>UI/UX Design</li>
              <li>Performance Optimization</li>
              <li>SEO Ready Websites</li>
            </ul>
          </div>


          {/* SOCIAL */}
          <div>
            <p className="text-sm text-white/40 tracking-widest mb-4">
              [ FOLLOW US ]
            </p>

            <ul className="space-y-3 text-white/80">
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>GitHub</li>
            </ul>
          </div>

        </div>


        {/* BOTTOM BAR */}
        <div className="mt-24 flex flex-col md:flex-row justify-between text-sm text-white/40 gap-4 items-center">

          <p>
            ©2026 BluePeak Studio. All Rights Reserved
          </p>

          <div className="flex gap-6">
            <p className="hover:text-white cursor-pointer">
              Privacy Policy
            </p>
            <p className="hover:text-white cursor-pointer">
              Terms & Conditions
            </p>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer