import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 1. Particle System (Crimson Glow)
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random position in a large cylinder/sphere space
      const theta = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 30;
      const h = (Math.random() - 0.5) * 60;

      positions[i] = Math.cos(theta) * radius;
      positions[i + 1] = h;
      positions[i + 2] = Math.sin(theta) * radius;

      // Color profile: Neon Crimson to Deep Auburn
      const ratio = Math.random();
      colors[i] = 0.9 + ratio * 0.1; // Red: high
      colors[i + 1] = 0.05 + ratio * 0.05; // Green: very low
      colors[i + 2] = 0.05 + ratio * 0.1; // Blue: low
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture helper - a simple glowing particle procedurally designed
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(239, 68, 68, 0.8)");
      gradient.addColorStop(0.7, "rgba(239, 68, 68, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 16, 16);
    }

    const pTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.45,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. Central Wireframe Geometry (Heavy iron aesthetic)
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Sub-geometries: A stunning neon torus knot reflecting mechanical and core strength
    const torusKnotGeo = new THREE.TorusKnotGeometry(4.5, 0.8, 120, 16, 2, 3);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const mainKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    ringGroup.add(mainKnot);

    // Inner glowing core
    const sphereGeo = new THREE.IcosahedronGeometry(2, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff3333,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerCore = new THREE.Mesh(sphereGeo, sphereMat);
    ringGroup.add(innerCore);

    // Outer orbital rings
    const ringGeo1 = new THREE.RingGeometry(8, 8.2, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff3333,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    ringGroup.add(orbitRing1);

    const ringGeo2 = new THREE.RingGeometry(11, 11.2, 64);
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat1);
    orbitRing2.rotation.y = Math.PI / 4;
    ringGroup.add(orbitRing2);

    // Light highlights
    const pointLight = new THREE.PointLight(0xef4444, 2, 40);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    // Position updates based on user scrolling & cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to +1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? scrolled / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Animation Loop
    let animationFrameId: number;
    const targetCamRef = { x: 0, y: 0, z: 25 };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles slowly
      particles.rotation.y += 0.001;
      particles.rotation.z += 0.0003;

      // Rotate heavy mechanical wireframe
      mainKnot.rotation.x += 0.004;
      mainKnot.rotation.y += 0.006;
      innerCore.rotation.x -= 0.002;
      innerCore.rotation.y += 0.003;
      orbitRing1.rotation.z += 0.002;
      orbitRing2.rotation.z -= 0.001;

      // Camera parallax scroll
      // Scroll moves central wireframe upwards out of screen as user scrolls down
      ringGroup.position.y = scrollRef.current * 20;
      ringGroup.position.z = -scrollRef.current * 10;
      
      // Target camera coords including cursor parallax
      targetCamRef.x = mouseRef.current.x * 6;
      targetCamRef.y = mouseRef.current.y * 4;
      // Scroll pulls camera closer/further
      targetCamRef.z = 25 - scrollRef.current * 12;

      // Smooth camera interpolation (lerp)
      camera.position.x += (targetCamRef.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamRef.y - camera.position.y) * 0.05;
      camera.position.z += (targetCamRef.z - camera.position.z) * 0.05;

      // Look at center subtly shifted by hover/scroll
      camera.lookAt(0, scrollRef.current * 5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      torusKnotGeo.dispose();
      torusKnotMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      pTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-background-container"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-black overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
