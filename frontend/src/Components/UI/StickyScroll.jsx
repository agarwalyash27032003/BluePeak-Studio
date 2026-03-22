"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Website Development",
    description:
      "We build fast, scalable, and high-performance websites using modern technologies like React and Next.js.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Website Development
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Modern, scalable, and optimized for performance.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive and visually engaging interfaces that improve user experience and drive conversions.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            UI/UX Design
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Clean, intuitive, and conversion-focused design systems.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "E-Commerce",
    description:
      "Design and development of modern online stores that scale with your business and maximize revenue.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            E-Commerce
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Scalable stores built for performance and growth.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Landing Pages",
    description:
      "High-converting landing pages built for marketing campaigns and lead generation.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Landing Pages
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Designed to convert visitors into customers.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Optimization",
    description:
      "Performance, SEO, and technical improvements to boost speed and rankings.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Optimization
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Speed, SEO, and performance enhancements that matter.
          </p>
        </div>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
  <section className="w-full py-24 max-w-[1200px] mx-auto px-6">

    {/* Heading */}
    <div className="mb-20 text-center md:text-left">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Crafting <span className="text-yellow-400">Digital Excellence</span>
      </h2>

      <p className="text-gray-400 mt-5 max-w-2xl">
        We design and build high-performance digital products that help brands grow,
        scale, and stand out in a competitive market.
      </p>
    </div>

    {/* Sticky Scroll */}
    <StickyScroll content={content} />

  </section>
);
}