import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EQUIPMENTS } from "../data";
import { Equipment } from "../types";
import Tilt3D from "./Tilt3D";
import { ShieldCheck, Dumbbell, Zap, Play } from "lucide-react";

const CATEGORIES = ["All", "Cardio", "Strength", "Free Weights", "Functional Training"] as const;

export default function GymEquipment() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredEquipment = EQUIPMENTS.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="equipments" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-[-10%] w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              State-of-the-art Gear
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4">
            Elite <span className="text-red-500 text-glow-red">3D Showcase</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-gray-400 text-base md:text-lg">
            Train with industrial-grade, biometrically optimized machines. Experience perfect mechanics and frictionless movement.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                  : "bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEquipment.map((eq: Equipment, index: number) => (
              <motion.div
                key={eq.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <Tilt3D
                  className="bg-zinc-950/80 border border-zinc-900 flex flex-col h-full card shadow-2xl backdrop-blur-sm group"
                  glowColor="rgba(239, 68, 68, 0.15)"
                >
                  {/* Photo area */}
                  <div className="relative h-64 overflow-hidden w-full">
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />
                    
                    {/* Glowing Accent Ring on Hover */}
                    <div className="absolute bottom-4 right-4 z-20 bg-red-600/90 text-white px-3 py-1 rounded-md text-[10.5px] font-mono tracking-wider font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      COMMERCIAL
                    </div>

                    <img
                      src={eq.imageUrl}
                      alt={eq.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />

                    {/* Reflection / Light beam visual element */}
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine transition-transform duration-500 pointer-events-none" />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow z-20">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-red-500 mb-2 block">
                      {eq.category} // MODEL-0{index + 1}
                    </span>
                    <h3 className="font-display font-extrabold text-xl lg:text-2xl text-white mb-2 group-hover:text-red-500 transition-colors">
                      {eq.name}
                    </h3>
                    <p className="font-sans text-xs text-gray-400 mb-6 leading-relaxed flex-grow">
                      {eq.description}
                    </p>

                    {/* Static specifications container formatted like high-end blueprint */}
                    <div className="bg-black/50 border border-zinc-900 rounded-xl p-4 mt-auto">
                      <div className="flex justify-between items-center mb-2 pb-2 border-b border-zinc-900/40">
                        <span className="font-mono text-[10px] text-gray-500">SPECIFICATIONS</span>
                        <span className="font-mono text-[10px] text-red-400 font-bold uppercase">
                          {eq.stats.label}: {eq.stats.value}
                        </span>
                      </div>
                      <p className="font-mono text-[10.5px] text-gray-400 font-light truncate">
                        {eq.specs}
                      </p>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
