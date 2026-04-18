import React from "react";

const TrustCard = ({ title, description, image }) => {
  return (
    <div className="
      relative h-full flex flex-col
      p-8 rounded-3xl
      bg-white/5
      border border-white/10
      shadow-xl overflow-hidden
      hover:-translate-y-1 hover:shadow-2xl
      transition-all duration-300
    ">

      {/* glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent blur-3xl opacity-60"></div>

      <div className="relative z-10 flex flex-col h-full">

        {/* ICON */}
        <img 
          src={image} 
          alt={title}
          className="h-20 object-contain mb-8"
        />

        {/* TITLE */}
        <h2 className="text-3xl font-semibold font-[dual] mb-2 text-center">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-lg dm-sans flex-grow leading-relaxed">
          {description}
        </p>

      </div>

    </div>
  );
};

export default TrustCard;