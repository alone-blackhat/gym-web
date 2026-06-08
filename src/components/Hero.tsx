import { useState, useEffect } from "react";
import { Dumbbell, ShieldCheck, Zap, ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const [membersCount, setMembersCount] = useState(0);
  const [trainersCount, setTrainersCount] = useState(0);
  const [equipmentCount, setEquipmentCount] = useState(0);

  // Smooth count-up effect
  useEffect(() => {
    const duration = 1500; // 1.5s
    const steps = 30;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setMembersCount(Math.min(Math.floor((1500 / steps) * step), 1500));
      setTrainersCount(Math.min(Math.floor((15 / steps) * step), 15));
      setEquipmentCount(Math.min(Math.floor((120 / steps) * step), 120));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden select-none"
    >
      {/* 3D Floating elements (resembling floating weight plates and dumbbells in CSS space) */}
      <div className="absolute top-1/4 left-10 lg:left-24 animate-float1 z-10 pointer-events-none opacity-20 lg:opacity-40 select-none">
        <div className="relative p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-2xl flex items-center justify-center transform rotate-12 backdrop-blur-sm">
          <Dumbbell className="w-10 h-10 text-red-500 transform -rotate-12" />
          <div className="absolute -bottom-1 -right-1 bg-red-600 text-[8px] font-mono p-1 rounded font-bold">25 KG</div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-10 lg:right-28 animate-float2 z-10 pointer-events-none opacity-20 lg:opacity-40 select-none">
        <div className="relative p-5 rounded-full bg-zinc-900/60 border border-zinc-800 shadow-2xl flex items-center justify-center transform -rotate-6 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full border-4 border-dashed border-red-500/40 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-red-600" />
          </div>
          <div className="absolute -top-1 -left-1 bg-zinc-950 text-[8px] font-mono p-1 border border-zinc-800 rounded font-bold">PLATE</div>
        </div>
      </div>

      {/* Hero central layout */}
      <div className="max-w-5xl mx-auto text-center relative z-20 flex flex-col items-center">
        {/* Glow badge overlay */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-950/40 border border-red-500/30 rounded-full mb-6 shadow-lg shadow-red-950/50 animate-pulse">
          <ShieldCheck className="w-4 h-4 text-red-500" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-400">
            SALEM'S PREEMINENT STRENGTH SANCTUARY
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight mb-6 leading-none">
          Build Strength. <br />
          Burn Fat. <br />
          Become <span className="text-red-500 text-glow-red select-none">Unstoppable.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto font-sans text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed mb-10 px-4">
          Experience elite physical coaching, modern biomechanically optimized weight stacks, and intense customized nutrition protocols. Join the local movement today.
        </p>

        {/* Hero Actions with 3D press kinetics */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button
            onClick={() => scrollToSection("pricing")}
            className="w-full sm:w-auto relative font-display font-extrabold text-sm tracking-widest text-white bg-red-600 hover:bg-red-500 border border-red-500 px-8 py-4.5 rounded-xl overflow-hidden group shadow-xl shadow-red-600/30 cursor-pointer active:translate-y-1 active:shadow-md transition-all flex items-center justify-center gap-2"
          >
            JOIN NOW
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="w-full sm:w-auto font-display font-bold text-sm tracking-widest text-white bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-8 py-4.5 rounded-xl cursor-pointer active:translate-y-1 transition-all flex items-center justify-center gap-2 "
          >
            <Play className="w-4 h-4 text-red-500 fill-red-500" />
            BOOK FREE TRIAL
          </button>
        </div>

        {/* 3D Static statistics indicators */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-zinc-900/60 pt-10 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
              {membersCount}+
            </span>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 mt-1 block">
              Active Members
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-zinc-900/60 px-4">
            <span className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
              {trainersCount}+
            </span>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 mt-1 block">
              Certified Instructors
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
              {equipmentCount}+
            </span>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-gray-500 mt-1 block">
              Advanced Machines
            </span>
          </div>
        </div>
      </div>

      {/* Floating animations styling helper */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(12deg) scale(1); }
          50% { transform: translateY(-15px) rotate(15deg) scale(1.02); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(-6deg) scale(1); }
          50% { transform: translateY(20px) rotate(-10deg) scale(0.98); }
        }
        .animate-float1 {
          animation: float1 6s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
