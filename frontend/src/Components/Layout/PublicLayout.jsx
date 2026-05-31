import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import NeonCursor from "../UI/NeonCursor";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import ScrollTop from "../UI/ScrollTop";

const Home = lazy(() => import("../../Pages/Home"));
const Projects = lazy(() => import("../../Pages/Projects"));
const Services = lazy(() => import("../../Pages/Services"));
const About = lazy(() => import("../../Pages/About"));
const Contact = lazy(() => import("../../Pages/Contact"));
const PrivacyPolicy = lazy(() => import("../../Pages/PrivacyPolicy"));
const TestimonialForm = lazy(() => import("../../Pages/TestimonialForm"));

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
  </div>
);

export default function PublicLayout() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="public-site min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#1e3a8a] text-white">
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonial" element={<TestimonialForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
