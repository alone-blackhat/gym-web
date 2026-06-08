import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data";
import { Testimonial } from "../types";
import { Quote, MessageSquare, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = TESTIMONIALS.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const getCardStyle = (index: number) => {
    // Relative position calculation (-1 means left, 0 means center, 1 means right)
    let relPos = index - activeIndex;
    
    // Handling cyclic indexes correctly
    if (relPos > 1) relPos -= total;
    if (relPos < -1) relPos += total;

    // Center active slide
    if (relPos === 0) {
      return {
        className: "z-20 scale-100 opacity-100 border-red-500/40 border-glow-red-active bg-zinc-950",
        style: {
          transform: "perspective(1000px) translate3d(0, 0, 0) rotateY(0deg)",
        },
      };
    }

    // Left peripheral slide
    if (relPos === -1 || (activeIndex === 0 && index === total - 1)) {
      return {
        className: "z-10 scale-85 opacity-40 bg-zinc-950/80 pointer-events-none hover:opacity-60",
        style: {
          transform: "perspective(1000px) translate3d(-35%, 0, -100px) rotateY(25deg)",
        },
      };
    }

    // Right peripheral slide
    if (relPos === 1 || (activeIndex === total - 1 && index === 0)) {
      return {
        className: "z-10 scale-85 opacity-40 bg-zinc-950/80 pointer-events-none hover:opacity-60",
        style: {
          transform: "perspective(1000px) translate3d(35%, 0, -100px) rotateY(-25deg)",
        },
      };
    }

    // Anything hidden (not utilized in a 3-card stack, but good practice)
    return {
      className: "hidden opacity-0 pointer-events-none",
      style: {
        transform: "scale(0.5) translate3d(0, 0, -300px)",
      },
    };
  };

  return (
    <section id="reviews" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {" "}
      {/* Visual background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              Verified success logs
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4">
            Athelete <span className="text-red-500 text-glow-red">reviews</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-gray-400 text-base md:text-lg">
            Witness the real outcomes of structural iron work, professional diet protocols, and metabolic focus.
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="relative max-w-4xl mx-auto h-[480px] md:h-[420px] flex items-center justify-center overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {TESTIMONIALS.map((test: Testimonial, index: number) => {
            const cardInfo = getCardStyle(index);
            return (
              <div
                key={test.id}
                onClick={cardInfo.className.includes("pointer-events-none") ? undefined : undefined}
                className={`absolute w-full max-w-lg md:max-w-2xl rounded-3xl p-8 py-10 flex flex-col justify-between border border-zinc-900 shadow-2xl transition-all duration-700 ease-out transform ${cardInfo.className}`}
                style={cardInfo.style}
              >
                {/* Quote details */}
                <div className="relative">
                  <div className="absolute -top-6 -left-2 text-zinc-800">
                    <Quote className="w-14 h-14 opacity-25 text-red-500" />
                  </div>
                  
                  {/* Rating block */}
                  <div className="flex gap-1 mb-5 relative z-10">
                    {Array.from({ length: test.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 text-red-500 fill-red-500" />
                    ))}
                  </div>

                  <p className="font-sans text-white text-base md:text-lg leading-relaxed relative z-10 mb-6 italic">
                    "{test.comment}"
                  </p>
                </div>

                {/* Client Profile and Achievement tag */}
                <div className="flex items-center justify-between border-t border-zinc-900 pt-5 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                      <img
                        src={test.imageUrl}
                        alt={test.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{test.name}</h4>
                      <p className="font-sans text-xs text-gray-500 leading-none mt-1">
                        {test.role}
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-950/40 border border-red-500/20 text-red-400 py-1.5 px-3 rounded-lg text-xs font-semibold font-mono">
                    {test.achievement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slide Action Controllers */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="w-11 w-11 h-11 h-11 rounded-full border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer select-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Index Dots */}
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveIndex(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === dotIdx ? "w-6 bg-red-600" : "w-1.5 bg-zinc-800 hover:bg-zinc-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-11 w-11 h-11 h-11 rounded-full border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer select-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
