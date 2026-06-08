import { TRAINERS } from "../data";
import { Trainer } from "../types";
import { Trophy, Star, ShieldCheck, Dumbbell, Award, ArrowRightLeft } from "lucide-react";

export default function Trainers() {
  return (
    <section id="trainers" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-[5%] w-72 h-72 bg-red-600/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-96 h-96 bg-red-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
            <Trophy className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              Master Level Personnel
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4">
            Elite <span className="text-red-500 text-glow-red">Coaching staff</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-gray-400 text-base md:text-lg">
            Flip any card to explore their state or national championship backgrounds, professional academic standards, and focus targets.
          </p>
        </div>

        {/* Trainers Grid with 3D Flip Card System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TRAINERS.map((trainer: Trainer, index: number) => {
            return (
              <div
                key={trainer.id}
                className="relative w-full h-[480px] perspective-1000 group cursor-pointer"
              >
                {/* 3D Pivot Element */}
                <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180 shadow-2xl">
                  
                  {/* ====== FRONT SIDE ====== */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden bg-zinc-950 border border-zinc-900 flex flex-col">
                    {/* Portrait Photo Container */}
                    <div className="relative h-2/3 overflow-hidden w-full bg-zinc-900">
                      {/* Vignette gradient filter overlay to shade the photo into the black card bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                      
                      {/* Experience and flip prompts */}
                      <div className="absolute top-4 left-4 z-20 bg-black/70 border border-white/5 text-white py-1 px-3 rounded-lg text-[10px] font-mono tracking-wider font-bold backdrop-blur-md">
                        EXP: {trainer.experience}
                      </div>

                      <div className="absolute top-4 right-4 z-20 bg-red-600 border border-red-500 text-white rounded-full p-2 text-xs shadow-lg shadow-red-600/35">
                        <ArrowRightLeft className="w-4 h-4 animate-pulse" />
                      </div>

                      <img
                        src={trainer.imageUrl}
                        alt={trainer.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info bottom card area */}
                    <div className="p-6 flex flex-col justify-end flex-grow bg-zinc-950 border-t border-zinc-900/40">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">
                          VERIFIED ELITE COACH
                        </span>
                      </div>
                      <h3 className="font-display font-black text-2xl text-white tracking-tight mb-1">
                        {trainer.name}
                      </h3>
                      <p className="font-sans text-sm text-gray-500 leading-none">
                        {trainer.role}
                      </p>
                    </div>
                  </div>

                  {/* ====== BACK SIDE ====== */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180 bg-zinc-950 border-2 border-red-600/30 p-8 flex flex-col justify-between">
                    
                    {/* Header Details */}
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="font-display font-black text-2xl text-white tracking-tight">
                            {trainer.name}
                          </h4>
                          <p className="font-sans text-xs text-red-500 mt-0.5 uppercase tracking-wider font-semibold">
                            {trainer.role}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/20 flex items-center justify-center">
                          <Dumbbell className="w-5 h-5 text-red-500" />
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="font-sans text-xs text-gray-400 leading-relaxed mb-6 italic">
                        "{trainer.bio}"
                      </p>

                      {/* Specialties */}
                      <div className="mb-6">
                        <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                          Focal Gym Focus
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {trainer.specialties.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-gray-300 rounded-lg text-[10.5px] font-sans"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certifications Bottom */}
                    <div className="bg-black/60 border border-zinc-900 rounded-xl p-4 mt-auto">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Award className="w-4 h-4 text-red-500" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold">
                          ACCREDITATIONS
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {trainer.certifications.map((cert, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-red-500" />
                            <span className="font-mono text-[9.5px] text-gray-400 truncate">
                              {cert}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
