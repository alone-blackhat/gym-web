import { PROGRAMS } from "../data";
import { Program } from "../types";
import Tilt3D from "./Tilt3D";
import { Flame, Dumbbell, UserCheck, Activity, Zap, Compass, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  "prog-1": Flame,
  "prog-2": Dumbbell,
  "prog-3": UserCheck,
  "prog-4": Activity,
  "prog-5": Zap,
  "prog-6": Compass,
};

export default function TrainingPrograms() {
  return (
    <section id="programs" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {/* Background vector decorations */}
      <div className="absolute top-1/2 left-[-15%] w-[40rem] h-[40rem] bg-gradient-to-r from-red-600/5 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
            <Compass className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              Transformative Fitness Blueprints
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4">
            Forging <span className="text-red-500 text-glow-red">Elite Workouts</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-gray-400 text-base md:text-lg">
            Choose from six specialized pathways designed for rapid body composition shifts, optimal athletic power, and total biomechanical harmony.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog: Program, idx: number) => {
            const IconComponent = ICON_MAP[prog.id] || Dumbbell;
            return (
              <div key={prog.id} className="h-full">
                <Tilt3D
                  className="bg-zinc-950/70 border border-zinc-900 shadow-2xl p-8 flex flex-col h-full rounded-2xl group transition-all"
                  glowColor="rgba(239, 68, 68, 0.2)"
                  maxTilt={15}
                >
                  {/* 3D Extruding Icon Container */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 mb-8 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 shadow-inner group-hover:shadow-red-600/30"
                    style={{
                      transform: "translateZ(30px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-125" />
                  </div>

                  {/* Text Content - subtle depth */}
                  <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-gray-400 rounded text-[9px] font-mono tracking-wider font-bold">
                        {prog.duration}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-wider font-bold border ${
                          prog.intensity === "Extreme"
                            ? "bg-red-950/40 border-red-500/30 text-red-400"
                            : prog.intensity === "High"
                            ? "bg-orange-950/40 border-orange-500/30 text-orange-400"
                            : "bg-amber-950/40 border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {prog.intensity} Intensity
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-red-500 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="font-sans text-gray-400 text-sm leading-relaxed mb-6">
                      {prog.description}
                    </p>
                  </div>

                  {/* Benefits List - extrudes forward slightly */}
                  <div
                    className="flex flex-col gap-2.5 mt-auto"
                    style={{
                      transform: "translateZ(10px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {prog.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                        <span className="font-sans text-xs text-gray-300 font-light">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </Tilt3D>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
