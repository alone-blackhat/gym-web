import { Shield, Trophy, Users, CheckCircle2 } from "lucide-react";
import Tilt3D from "./Tilt3D";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {/* Background vector accents */}
      <div className="absolute top-1/2 right-[5%] w-80 h-80 bg-red-600/[0.03] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT SIDE - 3D LAYERED CARD STACK */}
          <div className="lg:col-span-6 flex justify-center items-center relative h-[450px] md:h-[500px]">
            {/* We'll build an interactive bento style layout of panels using our 3D component with distinct depths */}
            
            {/* Primary Center Card */}
            <div className="relative w-full max-w-sm z-20">
              <Tilt3D
                className="bg-zinc-950/90 border border-zinc-900 rounded-3xl p-8 shadow-2xl relative"
                glowColor="rgba(239, 68, 68, 0.25)"
                maxTilt={10}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                    <Trophy className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">THE IRON PROMISE</h4>
                    <span className="block font-mono text-[9px] text-red-500 uppercase tracking-widest">
                      Our Core Creed
                    </span>
                  </div>
                </div>

                <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed mb-6">
                  We don't offer generic templates or gimmicks. We build structural iron foundations. Guided by biomechanical assessments, our results are scientifically designed and systematically verified.
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    "Uncompromising Integrity",
                    "Custom Metric Tracking",
                    "Elite Facility Maintenance",
                  ].map((creed, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="font-mono text-[10.5px] text-gray-300 font-semibold uppercase tracking-wider">
                        {creed}
                      </span>
                    </div>
                  ))}
                </div>
              </Tilt3D>
            </div>

            {/* Layered Stacked Background Panel 1 (Slightly offset top-left with deeper Z state) */}
            <div
              className="absolute top-2 left-[5%] md:left-[10%] w-72 h-[320px] rounded-2xl bg-zinc-900/35 border border-zinc-900 -z-10 opacity-60 hidden md:block"
              style={{
                transform: "perspective(1000px) translate3d(-30px, -20px, -80px) rotate(-4deg)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="p-6">
                <Shield className="w-8 h-8 text-zinc-700 mb-4" />
                <div className="h-2 w-24 bg-zinc-800 rounded mb-2"></div>
                <div className="h-2 w-16 bg-zinc-800/60 rounded"></div>
              </div>
            </div>

            {/* Layered Stacked Background Panel 2 (Slightly offset bottom-right and rotated slightly) */}
            <div
              className="absolute bottom-4 right-[5%] md:right-[10%] w-72 h-[280px] rounded-2xl bg-zinc-900/35 border border-zinc-900 -z-20 opacity-65 hidden md:block"
              style={{
                transform: "perspective(1000px) translate3d(40px, 30px, -110px) rotate(6deg)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
              }}
            >
              <div className="p-6 flex flex-col justify-end h-full">
                <Trophy className="w-8 h-8 text-zinc-700 mb-4 self-end" />
                <div className="h-2 w-20 bg-zinc-800 rounded mb-2 self-end"></div>
                <div className="h-2 w-28 bg-zinc-800/40 rounded self-end"></div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - CONTENT PARALLEL LINES */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full w-fit">
              <Users className="w-3.5 h-3.5 text-red-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
                Beyond standard franchise gyms
              </span>
            </div>

            <h3 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-none mb-2">
              We focus on the <br />
              <span className="text-red-500 text-glow-red">Progress Protocol.</span>
            </h3>

            <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed">
              At Elite Fitness we represent structured execution. We designed a space where casual gym visitors transform into highly athletic, structurally sound individuals. We invest heavily in professional credentials and first-tier, commercial-grade safety mechanics.
            </p>

            {/* Interactive Grid of values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-sm text-white mb-1">
                    Injury-Safe Environments
                  </h5>
                  <p className="font-sans text-xs text-gray-500 leading-normal">
                    Strict mechanical setup, regular belt calibrations, and safety stops.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950/40 border border-zinc-900">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-sm text-white mb-1">
                    Premium Cleanliness
                  </h5>
                  <p className="font-sans text-xs text-gray-500 leading-normal">
                    Unmatched hygiene, dual filtration channels, and regular sanitization cycles.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
