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
            <h3 className="text-xl font-bold">Our AI-driven automation eliminates busywork, streamlines your operations, and helps your business grow, without extra effort.</h3>
        </div>
      
      <div className="grid grid-cols-3 gap-6 items-stretch">

        <div className="col-span-2 bg-[url('https://ik.imagekit.io/bluepeakstudio/BluePeak%20Studio/top-view-unrecognizable-hacker-performing-cyberattack-night%20(1).jpg')] bg-cover bg-center">
          <Card
            title="Workflow Automation"
            description="Let AI handle repetitive tasks, so your team can focus on high-impact work."
          />
        </div>

        <div>
          <Card
            title="AI Chatbots"
            description="Enhance customer experience with AI-powered assistants."
          />
        </div>


        <Card
          title="AI Marketing"
          description="Send smarter messages at the right moment with AI."
        />

        <Card
          title="CRM Automation"
          description="Capture, qualify, and route leads automatically."
        />

        <Card
          title="Analytics Automation"
          description="Turn business data into actionable insights."
        />

      </div>

    </section>
    </>
  );
};

export default Services;