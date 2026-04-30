import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "./Components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import NeonCursor from "./Components/UI/NeonCursor";
import Footer from "./Components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import ScrollTop from "./Components/UI/ScrollTop";

const Home = lazy(() => import("./Pages/Home"));
const Projects = lazy(() => import("./Pages/Projects"));
const Services = lazy(() => import("./Pages/Services"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TestimonialForm = lazy(() => import("./Pages/TestimonialForm"));

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="text-white min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#1e3a8a]">
    
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <ScrollTop />

      {isDesktop && <NeonCursor />}

      <Header />

      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonial" element={<TestimonialForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;