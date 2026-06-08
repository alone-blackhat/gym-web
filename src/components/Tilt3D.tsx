import React, { useRef, useState } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
  className?: string;
  glowColor?: string;
}

export default function Tilt3D({
  children,
  maxTilt = 12,
  scale = 1.04,
  className = "",
  glowColor = "rgba(239, 68, 68, 0.2)",
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s",
  });
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 80%)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    
    // Mouse relative to card boundaries
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing mouse coordinates to -0.5 to 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Direct tilt calculations
    const rotateX = -(normY * maxTilt);
    const rotateY = normX * maxTilt;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s",
      boxShadow: `0 20px 40px -15px rgba(0,0,0,0.8), 0 0 30px ${glowColor}`,
    });

    // Glass flash gloss glow coordinates
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 120px at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s",
      boxShadow: "0 10px 20px -10px rgba(0,0,0,0.6)",
    });

    setGlowStyle({
      opacity: 0,
      background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 80%)",
      transition: "opacity 0.6s ease",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden preserve-3d cursor-pointer ${className}`}
      style={tiltStyle}
    >
      {/* Light Reflection Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={glowStyle}
      />
      
      {/* Children elements positioned nicely within 3D transformation */}
      <div className="w-full h-full preserve-3d select-none">
        {children}
      </div>
    </div>
  );
}
