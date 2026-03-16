import React from "react";
import Card from "../UI/Card";
import SectionHeader from "../UI/SectionHeader";

const Services = () => {
  return (
    
        <>
        <SectionHeader title={"Services"} />
    <section className="max-w-[1200px] mx-auto px-6 py-20">


        <div className="flex mb-5">
            <h1 className="text-5xl font-bold">Websites That Perform!</h1>
            <h3 className="text-xl font-bold">We design engaging experiences and build websites that deliver real results.</h3>
        </div>
      
      <div className="grid grid-cols-3 gap-6 items-stretch">

        <div className="col-span-2 bg-[url('https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/top-view-unrecognizable-hacker-performing-cyberattack-night%20(1).jpg')] bg-cover bg-center">
          <Card
            title="Website Development"
            description="Custom, responsive, and high-performance websites built using modern technologies like React and modern frameworks."
          />
        </div>

        <div>
          <Card
            title="UI/UX Design"
            description="Designing intuitive and visually appealing interfaces that improve user engagement and conversion rates."
          />
        </div>

        <Card
          title="Website Maintenance and Support"
          description="Ongoing updates, security patches, bug fixes, and improvements to keep websites running smoothly"
        />

        <Card
          title="E-Commerce Development"
          description="Design and develop modern e-commerce platforms that convert visitors into customers and scale with your business."
        />

        <Card
          title="Landing Page Development"
          description="Create focused landing pages optimized for conversions, performance, and seamless user experiences."
        />

      </div>

    </section>
    </>
  );
};

export default Services;