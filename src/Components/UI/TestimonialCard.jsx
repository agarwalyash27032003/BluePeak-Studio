import React from 'react'

const TestimonialCard = ({t}) => {
  return (
    <div
      className="min-w-[320px] max-w-[320px] p-6 rounded-2xl
      bg-white/5 backdrop-blur-lg
      border border-white/10
      hover:border-purple-400
      hover:shadow-[0_0_20px_rgba(168,85,247,0.35)]
      transition-all duration-300 cursor-grab"
    >
      <div className="text-yellow-400 text-lg mb-3">
        ★★★★★
      </div>

      <p className="text-gray-300 text-sm leading-relaxed">
        "{t.text}"
      </p>

      <div className="flex items-center gap-3 mt-6">
        <img
          src={t.img}
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-semibold text-white">
            {t.name}
          </p>
          <p className="text-xs text-gray-400">
            {t.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard