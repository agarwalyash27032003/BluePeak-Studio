import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <section className="text-white dm-sans min-h-screen">

      <div className="w-[75%]  mx-auto px-6 pt-32 pb-20 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        
          <h1 className="mt-6 text-5xl md:text-7xl font-[azonix] leading-[1.05] text-center">
            Privacy Policy
          </h1>

          <p className="mt-6 text-white/30 text-xs tracking-widest uppercase">
            Last Updated: April 21, 2026
          </p>

          <p className="mt-10 text-gray-400 text-lg dm-sans text-justify">
            BluePeak Studio (“we”, “us”) is committed to protecting your privacy.
            This policy explains how we collect, use, and safeguard your information.
          </p>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="w-[75%] mx-auto px-6 py-20 space-y-20">

        {/* SECTION */}
        <PolicySection title="Interpretation & Definitions">
          The words whose initial letters are capitalized have meanings defined
          under the following conditions. These definitions apply regardless of
          singular or plural usage.
        </PolicySection>

        <PolicySection title="Personal Data">
          We may collect personal information such as your name, email address,
          and phone number when you interact with our services.
        </PolicySection>

        <PolicySection title="Usage Data">
          Usage data is collected automatically and may include your IP address,
          browser type, pages visited, and time spent on the platform.
        </PolicySection>

        <PolicySection title="Cookies">
          We use cookies and similar tracking technologies to enhance your
          experience and analyze usage patterns.
        </PolicySection>

        <PolicySection title="Use of Data">
          Your data helps us deliver services, communicate updates, improve
          performance, and personalize your experience.
        </PolicySection>

        <PolicySection title="Data Retention">
          We retain your data only for as long as necessary to fulfill legal,
          operational, and security obligations.
        </PolicySection>

        <PolicySection title="Security">
          We implement industry-standard measures to protect your data, but no
          system can guarantee absolute security.
        </PolicySection>

        <PolicySection title="Contact">
          For any privacy-related concerns, contact us at{" "}
          <span className="text-[#FFC107]">
            thebluepeakstudio@gmail.com
          </span>
        </PolicySection>

      </div>

    </section>
  );
};

/* SECTION COMPONENT */
const PolicySection = ({ title, children }) => {
  return (
    <div className="">
      
      <h2 className="mb-3 text-3xl font-semibold font-[dual]">
        {title}
      </h2>

      <p className="text-gray-400 text-lg dm-sans text-justify">
        {children}
      </p>

    </div>
  );
};

export default PrivacyPolicy;