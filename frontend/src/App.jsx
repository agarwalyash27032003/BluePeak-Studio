import Header from "./Components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import NeonCursor from "./Components/UI/NeonCursor";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Services from "./Pages/Services";
import About from "./Pages/About";
import Footer from "./Components/Layout/Footer";
import Contact from "./Pages/Contact";
import { Toaster } from "react-hot-toast";
import ScrollTop from "./Components/UI/ScrollTop";
import TestimonialForm from "./Pages/TestimonialForm";

// function App() {
//   return (
//     <div className="text-white min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#1e3a8a]">
//       <Toaster
//         position="top-center"
//         toastOptions={{
//           style: {
//             background: "#1e293b",
//             color: "#fff",
//             border: "1px solid rgba(255,255,255,0.1)",
//           },
//         }}
//       />
//       <ScrollTop />
//       <NeonCursor />
//       <Header />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/about-us" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/testimonial" element={<TestimonialForm />} />
//       </Routes>

//       <Footer />
//     </div>
//   );
// }

function App() {
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
      <NeonCursor />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonial" element={<TestimonialForm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;