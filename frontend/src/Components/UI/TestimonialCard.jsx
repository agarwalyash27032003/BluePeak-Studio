import React from 'react'

const TestimonialCard = ({t}) => {
  return (
    <div
      className="min-w-[320px] max-w-[320px] p-6 rounded-2xl
      bg-[#0d1224] 
      border border-white/5
      hover:border-purple-500/50
      transition-all duration-300 cursor-grab
      /* FLEXBOX ADDITION */
      flex flex-col min-h-[220px]" 
      style={{ 
        transform: 'translateZ(0)', 
        backfaceVisibility: 'hidden' 
      }}
    >
      <div className="text-yellow-500 text-sm mb-3">
        ★★★★★
      </div>

      {/* Wrapping text in a div with mt-auto on the next sibling pushes this up */}
      <div className="flex-grow">
        <p className="text-gray-400 text-sm leading-relaxed dm-sans">
          "{t.text}"
        </p>
      </div>

      {/* mt-auto pushes the footer to the very bottom of the card */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
        <img
          src={`${t.img}?tr=w-80,h-80`}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          alt={t.name}
          loading="lazy"
        />
        <div className="overflow-hidden">
          <p className="font-semibold text-white text-sm truncate">
            {t.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard