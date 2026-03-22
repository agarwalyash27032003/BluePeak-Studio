import React from "react";
import Card from "../../UI/Card";
import SectionHeader from "../../UI/SectionHeader";

const Services = () => {
  return (
    <>
      <SectionHeader title={"Services"} />

      <section className="max-w-[1200px] mx-auto px-6 py-20">

        {/* HEADING */}
        <div className="flex flex-col md:flex-row justify-between lg:items-start md:items-end gap-6 mb-12 justify-center items-center text-center">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-[azonix]">
            Websites That Perform
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl dm-sans max-w-md ">
            We design engaging experiences and build websites that deliver real results.
          </p>

        </div>

        {/* GRID */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        ">

          {/* FEATURED CARD */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[260px]">

            {/* BG IMAGE */}
            <div className="
              absolute inset-0
              bg-cover bg-center
            "></div>

            {/* CONTENT */}
            <div className="relative z-10 h-full">
              <Card
                title="Website Development"
                description="Custom, responsive, and high-performance websites built using modern technologies."
              />
            </div>

          </div>

          {/* OTHER CARDS */}
          <Card
            title="UI/UX Design"
            description="Designing intuitive and visually appealing interfaces that improve user engagement."
          />

          <Card
            title="Website Maintenance"
            description="Ongoing updates, security patches, and improvements to keep your site running smoothly."
          />

          <Card
            title="E-Commerce Development"
            description="Modern e-commerce platforms that convert visitors into customers and scale your business."
          />

          <Card
            title="Landing Page Development"
            description="High-converting landing pages built for performance and user engagement."
          />

        </div>

      </section>
    </>
  );
};

export default Services;