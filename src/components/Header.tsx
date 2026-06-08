import { useState, useEffect } from "react";
import { Dumbbell, Menu, X, Users, Compass, ShieldCheck } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
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
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/85 backdrop-blur-md border-b border-red-500/10 shadow-2xl shadow-red-950/20"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-red-600/30">
            <span className="absolute inset-0 bg-red-600 rounded-xl blur-md opacity-30 group-hover:opacity-70 transition-opacity"></span>
            <Dumbbell className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              ELITE<span className="text-red-500">FITNESS</span>
            </span>
            <span className="block text-[8px] font-mono tracking-widest text-gray-500">
              SALEM // TN
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: "Overview", id: "hero" },
            { label: "Equipments", id: "equipments" },
            { label: "Programs", id: "programs" },
            { label: "Trainers", id: "trainers" },
            { label: "Pricing", id: "pricing" },
            { label: "Reviews", id: "reviews" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-sans font-medium text-sm text-gray-400 hover:text-white transition-colors cursor-pointer relative py-1 hover:text-glow-red group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => scrollToSection("contact")}
            className="font-mono text-xs text-red-500 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500/10 cursor-pointer active:scale-95 transition-all"
          >
            FREE TRIAL
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="relative font-display font-semibold text-xs tracking-wider text-white bg-red-600 border border-red-500 px-5 py-2.5 rounded-lg overflow-hidden group shadow-lg shadow-red-600/20 cursor-pointer active:translate-y-0.5 active:shadow-md transition-all"
          >
            <span className="absolute -inset-y-0 -left-12 w-8 bg-white/20 transform skew-x-12 group-hover:animate-shine translate-x-0 group-hover:translate-x-64 transition-transform duration-700"></span>
            JOIN MEMBERSHIP
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dynamic Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-red-500/20 p-6 flex flex-col gap-6 shadow-2xl transition-all animate-fadeIn">
          <div className="flex flex-col gap-4">
            {[
              { label: "Overview", id: "hero" },
              { label: "Gym Equipments", id: "equipments" },
              { label: "Training Programs", id: "programs" },
              { label: "Elite Trainers", id: "trainers" },
              { label: "Membership Plans", id: "pricing" },
              { label: "Testimonials", id: "reviews" },
              { label: "Contact Us", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-display font-medium text-lg text-gray-300 hover:text-white py-2 text-left border-b border-gray-900 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full text-center py-3 border border-red-500/30 text-red-500 rounded-xl font-mono text-sm cursor-pointer"
            >
              BOOK A FREE TRIAL
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="w-full text-center py-3 bg-red-600 text-white font-display font-semibold tracking-wider rounded-xl cursor-pointer"
            >
              JOIN MEMBERSHIP NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
