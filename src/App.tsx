import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import GymEquipment from "./components/GymEquipment";
import TrainingPrograms from "./components/TrainingPrograms";
import Trainers from "./components/Trainers";
import MembershipPlans from "./components/MembershipPlans";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ThreeBackground from "./components/ThreeBackground";
import EquipmentShowcaseModal from "./components/EquipmentShowcaseModal";

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  return (
    <div
      id="app-root-shell"
      className="min-h-screen text-white bg-black selection:bg-red-600/35 selection:text-white relative font-sans antialiased dots-grid overflow-x-hidden"
    >
      {/* 3D Hardware Accelerated Canvas Background (Three.js) */}
      <ThreeBackground />

      {/* Embedded Ambient Light Shaders */}
      <div className="absolute top-[10%] left-[-15%] w-[45rem] h-[45rem] bg-gradient-to-r from-red-600/[0.04] to-transparent rounded-full blur-[200px] pointer-events-none select-none" />
      <div className="absolute top-1/2 right-[-20%] w-[50rem] h-[50rem] bg-gradient-to-l from-red-600/[0.03] to-transparent rounded-full blur-[220px] pointer-events-none select-none" />

      {/* Structural Page Elements */}
      <Header />

      <main className="relative z-10 w-full flex flex-col">
        {/* Full Viewport 3D Hero Screen */}
        <Hero />

        {/* 3D Bento-Style About Card Mesh */}
        <About />

        {/* 3D Grid Filtering Showcase */}
        <GymEquipment />

        {/* Extruded Training Pathway Matrix */}
        <TrainingPrograms />

        {/* 3D Portrait Flip Cards */}
        <Trainers />

        {/* Dynamic Pricing Slider Matrix */}
        <MembershipPlans onSelectPlan={setSelectedPlan} />

        {/* 3D Carousel Testimonial Stage */}
        <Testimonials />

        {/* Immersive CTA with Secure Glassmorphic Input */}
        <ContactForm selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      </main>

      {/* Certified Location & Accreditations Footer */}
      <Footer />

      {/* Branded Floating Support Button & All-Equipment 3D Showroom Modal */}
      <EquipmentShowcaseModal />
    </div>
  );
}
