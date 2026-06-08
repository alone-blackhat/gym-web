import { useState } from "react";
import { PLANS } from "../data";
import { MembershipPlan } from "../types";
import Tilt3D from "./Tilt3D";
import { ShieldAlert, Check, HelpCircle, Flame, Star, Award } from "lucide-react";

interface MembershipPlansProps {
  onSelectPlan: (planName: string) => void;
}

export default function MembershipPlans({ onSelectPlan }: MembershipPlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const handleApply = (planName: string) => {
    // Call the parent state modifier to select the plan
    onSelectPlan(planName);

    // Scroll smoothly to form section with an offset
    const element = document.getElementById("contact");
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
    <section id="pricing" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              Honest transparent rates
            </span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4">
            Membership <span className="text-glow-red text-red-500">plans</span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans text-gray-400 text-base md:text-lg">
            Invest in your structural wellness. Pick a plan that aligns with your timeline, resources, and athletic goals.
          </p>

          {/* Billing Toggle Module */}
          <div className="mt-10 inline-flex items-center p-1 bg-zinc-950 border border-zinc-900 rounded-2xl relative">
            {/* Sliding backdrop indicator */}
            <div
              className={`absolute top-1 bottom-1 w-[120px] rounded-xl bg-red-600 shadow-lg shadow-red-600/20 transition-transform duration-500 transform ${
                billingCycle === "yearly" ? "translate-x-[120px]" : "translate-x-0"
              }`}
            />
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative z-10 w-[120px] py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                billingCycle === "monthly" ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative z-10 w-[120px] py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                billingCycle === "yearly" ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              YEARLY <span className="text-[9px] text-red-300 ml-0.5">SAVE 15%</span>
            </button>
          </div>
        </div>

        {/* Pricing Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mt-6">
          {PLANS.map((plan: MembershipPlan) => {
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const savings = billingCycle === "yearly" ? Math.round(plan.monthlyPrice * 12 - plan.yearlyPrice) : 0;

            return (
              <div key={plan.id} className="h-full flex">
                <Tilt3D
                  className={`flex flex-col justify-between w-full p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-sm shadow-2xl relative border ${
                    plan.popular
                      ? "border-red-600/75 border-glow-red-active lg:scale-[1.03] lg:-translate-y-2 z-10"
                      : "border-zinc-900 border-glow-red hover:border-zinc-800"
                  }`}
                  glowColor={plan.popular ? "rgba(239, 68, 68, 0.25)" : "rgba(239, 68, 68, 0.12)"}
                  maxTilt={8}
                  scale={1.02}
                >
                  {/* Popular Banner Badge */}
                  {plan.popular && (
                    <div className="absolute top-5 right-5 bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Most Popular
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block mb-1">
                      {plan.tag}
                    </span>
                    <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight mb-4">
                      {plan.name}
                    </h3>

                    {/* Pricing Display */}
                    <div className="flex items-baseline gap-1 text-white mb-6 select-none">
                      <span className="font-display text-2xl font-bold text-red-500">₹</span>
                      <span className="font-display text-5xl md:text-6xl font-black tracking-tight animate-pulseSlow">
                        {price.toLocaleString("en-IN")}
                      </span>
                      <span className="font-mono text-xs text-gray-500 uppercase ml-2">
                        / {billingCycle === "monthly" ? "Month" : "Year"}
                      </span>
                    </div>

                    {/* Discount or savings indicator */}
                    {billingCycle === "yearly" && savings > 0 && (
                      <div className="mb-6 p-2 bg-red-950/30 border border-red-500/10 rounded-lg text-center">
                        <span className="font-mono text-[10px] text-red-400">
                          CONGRATS: SAVED ₹{savings.toLocaleString("en-IN")} / YEARLY
                        </span>
                      </div>
                    )}

                    {/* Features List */}
                    <div className="space-y-3 pt-6 border-t border-zinc-900/60 pb-8">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="p-0.5 bg-red-950/40 border border-red-500/20 rounded-full text-red-500 shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-sans text-xs md:text-sm text-gray-300 font-light leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply membership tactile button */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleApply(plan.name)}
                      className={`w-full py-4 rounded-xl font-display font-medium text-sm tracking-wider uppercase cursor-pointer active:translate-y-1 transition-all duration-100 ${
                        plan.popular
                          ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 border border-red-500 active:shadow-md"
                          : "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 active:bg-zinc-900"
                      }`}
                    >
                      Apply For Plan
                    </button>
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
