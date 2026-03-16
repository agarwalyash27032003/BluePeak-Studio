import React from "react";

const Card = ({ title, description }) => {
  return (
    <div className="relative h-full min-h-[200px] flex flex-col justify-between p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-semibold mb-3">
          {title}
        </h2>

        <p className="text-gray-400 text-lg">
          {description}
        </p>
      </div>

    </div>
  );
};

export default Card;