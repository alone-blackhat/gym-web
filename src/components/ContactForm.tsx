import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Flame, Dumbbell } from "lucide-react";

interface ContactFormProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
}

export default function ContactForm({ selectedPlan, setSelectedPlan }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "",
    packageType: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync state when pricing component triggers plan selection
  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, packageType: selectedPlan }));
    }
  }, [selectedPlan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending application to local mock server
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      goal: "",
      packageType: "",
    });
    setSelectedPlan("");
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-transparent overflow-hidden">
      {/* Abstract background graphics */}
      <div className="absolute top-1/4 right-[2%] w-[450px] h-[450px] bg-red-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[350px] h-[350px] bg-red-600/[0.03] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT SIDE - CONTACT DETAILS */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
                  Ready to evolve
                </span>
              </div>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-4 leading-none">
                Start Your <br />
                <span className="text-red-500 text-glow-red">Fitness Journey</span>
              </h2>
              <p className="font-sans text-gray-400 text-sm md:text-base leading-relaxed">
                Apply today to secure a personalized consultation session, fully structured body composition scan, and a custom biomechanics review.
              </p>
            </div>

            {/* Quick stats / bullet accents */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl">
                <span className="block font-display font-bold text-2xl text-red-500 mb-1">
                  100% Free
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-500">
                  Equipment Induction
                </span>
              </div>
              <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl">
                <span className="block font-display font-bold text-2xl text-red-500 mb-1">
                  No Deposit
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-gray-500">
                  On Launch Bundles
                </span>
              </div>
            </div>

            {/* Interactive Salem contact chips */}
            <div className="flex flex-col gap-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/45 border border-zinc-900 hover:border-red-500/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    PHONE INQUIRIES
                  </span>
                  <span className="font-display font-semibold text-white tracking-wide">
                    +91 98765 43210
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/45 border border-zinc-900 hover:border-red-500/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/20 flex items-center justify-center text-red-500 transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    BASE CAMP
                  </span>
                  <span className="font-display font-semibold text-white tracking-wide">
                    Salem, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 3D GLASSMOPRHISM FORM */}
          <div className="lg:col-span-7">
            <div className="relative bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
              {/* Form frame border-glow overlay */}
              <div className="absolute inset-0 rounded-3xl border border-red-500/10 pointer-events-none" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight mb-2 pb-3 border-b border-zinc-900">
                    Membership <span className="text-red-500">Application</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name field (Floating Label) */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="peer w-full h-[60px] bg-zinc-900/60 border border-zinc-800 focus:border-red-500 rounded-xl px-4 pt-5 pb-1 text-white focus:outline-none placeholder-transparent text-sm transition-all"
                        placeholder="Name"
                      />
                      <label
                        htmlFor="form-name"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs transition-all pointer-events-none origin-left duration-200
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
                        peer-focus:top-3.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-red-500
                        peer-valid:top-3.5 peer-valid:-translate-y-0 peer-valid:text-xs"
                      >
                        Your Full Name
                      </label>
                    </div>

                    {/* Phone field (Floating Label) */}
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        id="form-phone"
                        required
                        pattern="^[0-9-+s()]*$"
                        value={formData.phone}
                        onChange={handleChange}
                        className="peer w-full h-[60px] bg-zinc-900/60 border border-zinc-800 focus:border-red-500 rounded-xl px-4 pt-5 pb-1 text-white focus:outline-none placeholder-transparent text-sm transition-all"
                        placeholder="Phone"
                      />
                      <label
                        htmlFor="form-phone"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs transition-all pointer-events-none origin-left duration-200
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
                        peer-focus:top-3.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-red-500
                        peer-valid:top-3.5 peer-valid:-translate-y-0 peer-valid:text-xs"
                      >
                        Phone Number
                      </label>
                    </div>
                  </div>

                  {/* Email field (Floating Label) */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="form-email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full h-[60px] bg-zinc-900/60 border border-zinc-800 focus:border-red-500 rounded-xl px-4 pt-5 pb-1 text-white focus:outline-none placeholder-transparent text-sm transition-all"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="form-email"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs transition-all pointer-events-none origin-left duration-200
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm
                      peer-focus:top-3.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-red-500
                      peer-valid:top-3.5 peer-valid:-translate-y-0 peer-valid:text-xs"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* Goal selection */}
                  <div className="relative">
                    <select
                      name="goal"
                      id="form-goal"
                      required
                      value={formData.goal}
                      onChange={handleChange}
                      className="w-full h-[60px] bg-zinc-900/60 border border-zinc-800 focus:border-red-500 rounded-xl px-4 pt-4 pb-1 text-gray-300 focus:outline-none text-sm transition-all appearance-none"
                    >
                      <option value="" disabled>Select your primary goal</option>
                      <option value="Weight Loss & Shred">Weight Loss & Shred</option>
                      <option value="Elite Muscle Building">Elite Muscle Building</option>
                      <option value="Guru Personal Training">Guru Personal Training</option>
                      <option value="Metabolic CrossFit">Metabolic CrossFit</option>
                      <option value="HIIT Explosion">HIIT Explosion</option>
                      <option value="Yoga & Zumba Flow">Yoga & Zumba Flow</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</span>
                    <label className="absolute left-4 top-1.5 text-red-500/70 text-[10px] font-mono uppercase tracking-wider">
                      PRIMARY FITNESS GOAL
                    </label>
                  </div>

                  {/* Membership Tier selector */}
                  <div className="relative">
                    <select
                      name="packageType"
                      id="form-package"
                      required
                      value={formData.packageType}
                      onChange={handleChange}
                      className="w-full h-[60px] bg-zinc-900/60 border border-zinc-800 focus:border-red-500 rounded-xl px-4 pt-4 pb-1 text-gray-300 focus:outline-none text-sm transition-all appearance-none"
                    >
                      <option value="" disabled>Choose your tier</option>
                      <option value="Basic Tier">Basic Tier (₹1,499/mo)</option>
                      <option value="Standard Tier">Standard Tier (₹2,499/mo)</option>
                      <option value="Premium Tier">Premium Tier (₹3,999/mo)</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</span>
                    <label className="absolute left-4 top-1.5 text-red-500/70 text-[10px] font-mono uppercase tracking-wider">
                      REQUESTED TIER
                    </label>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-display font-semibold tracking-wider uppercase cursor-pointer active:translate-y-0.5 shadow-lg shadow-red-600/20 active:shadow-md border border-red-500 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        PROCESSING SECURE APPLICATION...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        SUBMIT MEMBERSHIP APPLICATION
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* SUCCESS STATE CONTAINER */
                <div className="text-center py-10 flex flex-col items-center gap-6 relative z-10 animate-scaleUp">
                  <div className="w-20 h-20 rounded-full bg-red-950/40 border border-red-500 flex items-center justify-center text-red-500 shadow-xl shadow-red-600/10">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-3xl text-white uppercase tracking-tight">
                      Application Submitted!
                    </h3>
                    <p className="font-sans text-sm text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you <span className="text-white font-semibold">{formData.name}</span>. Your slot has been provisionally registered. Our head trainer will contact you shortly on <span className="text-white font-mono">{formData.phone}</span>.
                    </p>
                  </div>

                  <div className="bg-black/60 border border-zinc-900 p-5 rounded-2xl w-full text-left">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-red-400 mb-2">
                      REGISTRATION SUMMARY
                    </span>
                    <p className="font-mono text-xs text-gray-400 flex justify-between border-b border-zinc-900 pb-2 mb-2">
                      <span>PLAN SELECTED:</span> <span className="text-white font-bold">{formData.packageType}</span>
                    </p>
                    <p className="font-mono text-xs text-gray-400 flex justify-between">
                      <span>GOAL FOCUS:</span> <span className="text-white">{formData.goal || "Not Specified"}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 font-mono text-xs text-gray-400 hover:text-white border border-zinc-800 rounded-xl hover:border-zinc-700 cursor-pointer transition-all"
                  >
                    SUBMIT ANOTHER SLOT
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
