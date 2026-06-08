import { Dumbbell, Instagram, Facebook, Youtube, ShieldCheck } from "lucide-react";

export default function Footer() {
  const scrolltoSection = (id: string) => {
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
    <footer className="relative bg-zinc-950 border-t border-zinc-900 py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* About column */}
        <div className="lg:w-1/3 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="font-display font-black text-xl tracking-wider text-white">
              ELITE<span className="text-red-500">FITNESS</span>
            </span>
          </div>
          <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed">
            The prime center for professional progress in Salem, Tamil Nadu. Tailoring mechanical, metric-focused coaching to ensure rapid hypertrophy and fat reduction.
          </p>
          <div className="flex items-center gap-3.5 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/30 transition-all cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/30 transition-all cursor-pointer"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500/30 transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Directory grids */}
        <div className="flex flex-wrap gap-12 lg:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-red-500 font-bold">
              NAVIGATION
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Equipments", id: "equipments" },
                { label: "Programs", id: "programs" },
                { label: "Faculty Trainers", id: "trainers" },
                { label: "Membership Pricing", id: "pricing" },
                { label: "Contact Form", id: "contact" },
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => scrolltoSection(link.id)}
                  className="font-sans text-xs text-left text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-red-500 font-bold">
              COACHING STATS
            </h4>
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-xs text-gray-500">Monday - Friday: 5:00 AM - 10:00 PM</span>
              <span className="font-mono text-xs text-gray-500">Saturday: 6:00 AM - 8:00 PM</span>
              <span className="font-mono text-xs text-gray-500">Sunday Active: 7:00 AM - 12:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-[10.5px] text-gray-600">
          © {new Date().getFullYear()} ELITE FITNESS SALEM. ALL RIGHTS PROTECTED UNDER INDIAN JURISDICTION.
        </p>
        <div className="flex items-center gap-2 text-gray-600 font-mono text-[10px]">
          <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
          <span>GSTIN REGISTERED OFFICE</span>
        </div>
      </div>
    </footer>
  );
}
