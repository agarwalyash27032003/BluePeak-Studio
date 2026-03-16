import React from "react";

const TrustCard = ({ title, description, image }) => {
  return (
    <div className="relative h-full flex flex-col p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent blur-3xl"></div>

      <div className="relative z-10 flex flex-col h-full">

        <img src={image} alt="" className="h-32 object-contain mb-16" />

        <h2 className="text-xl font-semibold mb-3">
          {title}
        </h2>

        <p className="text-gray-400 text-lg flex-grow">
          {description}
        </p>

      </div>

    </div>
  );
};

export default TrustCard;