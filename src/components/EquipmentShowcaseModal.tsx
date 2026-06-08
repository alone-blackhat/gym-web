import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";
import {
  X,
  Search,
  Dumbbell,
  Eye,
  Settings,
  Activity,
  Maximize2,
  ChevronRight,
  RotateCw,
  Sliders,
  Info,
  Shield,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronLeft,
  Volume2,
  Lock,
  CheckCircle,
  Trophy,
  Play,
  Compass,
  Tv,
  Heart,
  HelpCircle,
  RefreshCw,
  ZapOff
} from "lucide-react";
import { EQUIPMENTS } from "../data";
import { Equipment } from "../types";

// Map categories to game campaign level stages
interface MapZone {
  level: number;
  name: string;
  codename: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string; // Tailwind color name (e.g., 'cyan', 'red')
  borderGlow: string; // Tailwind glow class
  textColor: string;
  bgColor: string;
  rgbColor: string; // Hex/rgb for secondary visuals
  description: string;
  icon: any;
}

const ZONES: MapZone[] = [
  {
    level: 1,
    name: "Cardio Zone",
    codename: "STAGE_VELOCITY",
    category: "Cardio",
    difficulty: "Beginner",
    color: "cyan",
    borderGlow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    textColor: "text-cyan-400",
    bgColor: "bg-cyan-950/20",
    rgbColor: "#06b6d4",
    description: "Aerobic threshold builders, high-speed biomechanical decks and oxygenation stations.",
    icon: Activity
  },
  {
    level: 2,
    name: "Strength Zone",
    codename: "STAGE_KINETIC",
    category: "Strength",
    difficulty: "Intermediate",
    color: "red",
    borderGlow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    textColor: "text-red-500",
    bgColor: "bg-red-950/20",
    rgbColor: "#ef4444",
    description: "Iso-lateral weight stack assemblies, gas-assisted selectors and biomechanical load levers.",
    icon: Shield
  },
  {
    level: 3,
    name: "Free Weights Zone",
    codename: "STAGE_GRAVITY",
    category: "Free Weights",
    difficulty: "Advanced",
    color: "amber",
    borderGlow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    textColor: "text-amber-500",
    bgColor: "bg-amber-950/20",
    rgbColor: "#f59e0b",
    description: "Pro-series rubber-encased iron dumbbells, Olympic straight bars and calibrated plates.",
    icon: Award
  },
  {
    level: 4,
    name: "Functional Zone",
    codename: "STAGE_PULSE",
    category: "Functional Training",
    difficulty: "Intermediate",
    color: "emerald",
    borderGlow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-950/20",
    rgbColor: "#10b981",
    description: "Multi-point suspension wires, weighted kettlebells and high-density poly dacron battle ropes.",
    icon: Zap
  }
];

// High-end exercise setup and biometrics details
interface EnhancedEquipmentDetails {
  muscleGroup: string;
  setupGuide: string[];
  tips: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const ENHANCED_DETAILS: Record<string, EnhancedEquipmentDetails> = {
  "cardio-1": {
    muscleGroup: "Cardiovascular System, Hamstrings, Quadriceps, Calves",
    setupGuide: [
      "Stand on the side rails before starting the belt.",
      "Attach the safety cutoff clip securely to your waistband.",
      "Start at 1.0 km/h to test stride alignment.",
      "Adjust incline to 1-2% to mimic outdoor running resistance."
    ],
    tips: [
      "Avoid holding the handrails for natural kinetic energy translation.",
      "Keep chest upright and look straight ahead to prevent postural fatigue.",
      "Use interval sprints (HIIT) to supercharge metabolic afterburn."
    ],
    difficulty: "Beginner"
  },
  "strength-1": {
    muscleGroup: "Pectoralis Major, Anterior Deltoids, Triceps Brachii",
    setupGuide: [
      "Adjust gas-assisted seat height so handles align with mid-chest.",
      "Keep feet planted firmly on the platform.",
      "Grip the handles evenly using a closed overhand grip.",
      "Retract scapulae against back pad to stabilize shoulders."
    ],
    tips: [
      "Push outward on a controlled, powerful concentric arc.",
      "Maintain a slow 3-second negative (eccentric phase) to maximize muscle tension.",
      "Avoid locking elbows at the peak extension of the press."
    ],
    difficulty: "Intermediate"
  },
  "strength-2": {
    muscleGroup: "Quadriceps, Gluteus Maximus, Hamstrings / Pectorals & Shoulders",
    setupGuide: [
      "Set safety stops immediately below your targeted path depth.",
      "Align the bar across your upper trapezius (squats) or chest (presses).",
      "Rotate the bar slightly backward to unlock from pin tracks.",
      "Maintain active core tension before initiator launch."
    ],
    tips: [
      "The 7-degree angled track mimics the natural path of squatting.",
      "Always engage safety hooks with a simple wrist twist if fatigue threatens failure.",
      "Perfect for progressive loading and heavy eccentric training variables safely."
    ],
    difficulty: "Advanced"
  },
  "weights-1": {
    muscleGroup: "Biceps, Deltoids, Pectorals, Latissimus Dorsi, Core Stability",
    setupGuide: [
      "Select an appropriate weight class from the tiered rack.",
      "Ensure space around you is clear.",
      "Grip the contoured chrome knurled shafts squarely in the center.",
      "Maintain neutral wrist alignment under loading."
    ],
    tips: [
      "Dumbbells force unilateral stability, fixing muscular imbalances.",
      "Incorporate rotational elements (e.g., Arnold presses) to cover multiple muscle heads.",
      "Control the weights rather than relying on swinging momentum."
    ],
    difficulty: "Beginner"
  },
  "func-1": {
    muscleGroup: "Shoulders/Deltoids, Grip Strength, Core Stabilizers, Latissimus Dorsi",
    setupGuide: [
      "Anchor the double heat-shrink handles securely in your palms.",
      "Step back until the ropes have a slight, uniform sag.",
      "Establish a athletic half-squat foundation.",
      "Engage core brace tightly."
    ],
    tips: [
      "Mix up waves: try alternating waves, double slams, or wide circles.",
      "Work in short 20-30 second high-intensity sprint bursts.",
      "Avoid excess leg shaking; focus structural power translation inside shoulder girdles."
    ],
    difficulty: "Intermediate"
  },
  "func-2": {
    muscleGroup: "Gluteal Complex, Hamstrings, Erector Spinae, Transverse Abdominis",
    setupGuide: [
      "Place kettlebell between your feet on the ground.",
      "Hinge at hips, maintaining a flat back, and secure a double-handed grip.",
      "Pull shoulder blades back and down.",
      "Initiate swing by lifting from the floor into a backswing hike position."
    ],
    tips: [
      "Power the kettlebell swing strictly through active posterior hip snap, not shoulder lifting.",
      "At peak height of swing, your body should align in a straight vertical plank.",
      "Squeeze your glutes tightly at the top of each execution loop."
    ],
    difficulty: "Intermediate"
  },
  "strength-3": {
    muscleGroup: "Latissimus Dorsi, Teres Major, Rhomboids, Biceps Brachii",
    setupGuide: [
      "Adjust thigh roller pads to lock your lower body firmly onto bench.",
      "Select load and grip the lat bar slightly wider than shoulder-width.",
      "Sit down under loading and verify secure thigh stability.",
      "Depress shoulders before beginning the pull."
    ],
    tips: [
      "Pull the bar down toward upper collarbones by driving elbows toward back pockets.",
      "Squeeze the shoulder blades firmly at peak concentric compression.",
      "Refrain from leaning backward excessively to pull down via momentum."
    ],
    difficulty: "Beginner"
  },
  "strength-4": {
    muscleGroup: "Anterior Deltoids, Lateral Deltoids, Triceps, Clavicular Pectoralis",
    setupGuide: [
      "Adjust seat back so the handle grips sit just above shoulder height.",
      "Plat feet solidly, and secure overhand or neutral hammer grips.",
      "Secure back flush to pad, maintaining normal spinal curves.",
      "Brace core muscles solidly."
    ],
    tips: [
      "Press vertically without flaring elbows out too wide to protect rotator cuffs.",
      "Pause for 1 second at the top highlight height without elbow locking.",
      "Lower the press arms fully to expand shoulder range of motion."
    ],
    difficulty: "Intermediate"
  },
  "weights-2": {
    muscleGroup: "Posterior Chain, Quadriceps, Deltoids, Trapezius, Core Pillar",
    setupGuide: [
      "Load calibrated plates symmetrically on each sleeve.",
      "Slide heavy spring collars and clamp them tight against plate faces.",
      "Line up hands using the knurling markers as spatial guides.",
      "Engage double-overhand or hook grip configurations."
    ],
    tips: [
      "Perfect for testing your 1-Repetition Maximum on Squats, Deadlifts, and Bench Presses.",
      "Always maintain strict spinal neutral mechanics under load.",
      "Incorporate bumper plate drops safely inside shock-absorb rubber landing slots."
    ],
    difficulty: "Advanced"
  },
  "func-3": {
    muscleGroup: "Full-Body, Rotational Core, Postural Alignment, Stabilization Muscles",
    setupGuide: [
      "Slide the pulley housings to your desired height setting (low, middle, or high).",
      "Select attachments: ropes, single D-handles, or straight long bar.",
      "Select weight on dual independent stacks symmetrically.",
      "Reset tracking ropes and test resistance travel paths freely."
    ],
    tips: [
      "Excellent tool for metabolic conditioning, dynamic rotations, and wood chops.",
      "Constant tension cable design provides un-interrupted muscle loading angles.",
      "Stand 1-2 steps away from frame to pre-stretch core fibers before exercise onset."
    ],
    difficulty: "Intermediate"
  }
};

/**
 * THREE.JS PROCEDURAL 3D EQUIPMENT VIEWER WITH SPIN MECHANICS
 */
interface ThreeEquipmentViewerProps {
  equipmentId: string;
  accentColor: string; // hex representation
}

const ThreeEquipmentViewer: React.FC<ThreeEquipmentViewerProps> = ({ equipmentId, accentColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDragging: false, prevX: 0, prevY: 0, rotX: 0.15, rotY: -0.45 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Three scene setup with space grids
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060608);

    // Dynamic grid for cyber level effect
    const gridColor = new THREE.Color(accentColor);
    const grid = new THREE.GridHelper(10, 22, gridColor, 0x18181b);
    grid.position.y = -1.35;
    scene.add(grid);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 4.2);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Ambient & Directional dynamic light sources
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 10, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(gridColor, 1.8);
    dirLight2.position.set(-5, 4, -5);
    scene.add(dirLight2);

    // Glowing spot focus on center platform
    const spotLight = new THREE.SpotLight(gridColor, 3, 10, Math.PI / 8, 0.5, 1);
    spotLight.position.set(0, 3, 0);
    scene.add(spotLight);

    // Premium realistic materials
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x242427,
      roughness: 0.2,
      metalness: 0.85,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      roughness: 0.08,
      metalness: 0.95,
    });

    const cushionMaterial = new THREE.MeshStandardMaterial({
      color: gridColor, // Dynamic level theme colored padding
      roughness: 0.75,
      metalness: 0.15,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: gridColor,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
    });

    // Content container
    const equipmentGroup = new THREE.Group();
    scene.add(equipmentGroup);

    // Temporary storage for deallocation
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const regGeo = (geo: THREE.BufferGeometry) => {
      geometriesToDispose.push(geo);
      return geo;
    };

    // -------------------------------------------------------------
    // HIGH-END PROCEDURAL MODEL INJECTOR (Procedural Representation)
    // -------------------------------------------------------------
    switch (equipmentId) {
      case "cardio-1": {
        // TREADMILL
        const deckGeo = regGeo(new THREE.BoxGeometry(1.6, 0.14, 2.9));
        const deck = new THREE.Mesh(deckGeo, metalMaterial);
        deck.position.y = -1.25;
        deck.rotation.x = -0.05;
        equipmentGroup.add(deck);

        const trackGeo = regGeo(new THREE.BoxGeometry(1.35, 0.02, 2.7));
        const track = new THREE.Mesh(trackGeo, new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.95 }));
        track.position.y = 0.08;
        deck.add(track);

        const leftCol = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.045, 0.045, 1.7)), chromeMaterial);
        leftCol.position.set(-0.7, -0.4, 0.8);
        leftCol.rotation.x = 0.15;
        equipmentGroup.add(leftCol);

        const rightCol = leftCol.clone();
        rightCol.position.x = 0.7;
        equipmentGroup.add(rightCol);

        const handleGeo = regGeo(new THREE.CylinderGeometry(0.04, 0.04, 1.0));
        const leftHandle = new THREE.Mesh(handleGeo, metalMaterial);
        leftHandle.position.set(-0.7, 0.45, 0.4);
        leftHandle.rotation.x = Math.PI / 2 + 0.15;
        equipmentGroup.add(leftHandle);

        const rightHandle = leftHandle.clone();
        rightHandle.position.x = 0.7;
        equipmentGroup.add(rightHandle);

        const dashBezel = new THREE.Mesh(regGeo(new THREE.BoxGeometry(1.5, 0.25, 0.35)), metalMaterial);
        dashBezel.position.set(0, 0.42, 0.75);
        equipmentGroup.add(dashBezel);

        const screen = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.9, 0.45, 0.05)), screenMaterial);
        screen.position.set(0, 0.7, 0.72);
        screen.rotation.x = -0.15;
        equipmentGroup.add(screen);
        break;
      }

      case "strength-1": {
        // CHEST PRESS
        const frameCol = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.12, 2.4, 0.12)), metalMaterial);
        frameCol.position.set(0, -0.15, -0.4);
        equipmentGroup.add(frameCol);

        const footBase = new THREE.Mesh(regGeo(new THREE.BoxGeometry(1.2, 0.1, 1.5)), metalMaterial);
        footBase.position.y = -1.3;
        equipmentGroup.add(footBase);

        const userSeat = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.65, 0.1, 0.65)), cushionMaterial);
        userSeat.position.set(0, -0.6, 0.25);
        equipmentGroup.add(userSeat);

        const chestPad = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.55, 0.95, 0.12)), cushionMaterial);
        chestPad.position.set(0, 0.1, 0.02);
        chestPad.rotation.x = -0.06;
        equipmentGroup.add(chestPad);

        const armBarL = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.03, 0.03, 1.3)), chromeMaterial);
        armBarL.position.set(-0.35, 0.35, 0.25);
        armBarL.rotation.set(0.4, -0.15, -0.15);
        equipmentGroup.add(armBarL);

        const armBarR = armBarL.clone();
        armBarR.position.x = 0.35;
        armBarR.rotation.y = 0.15;
        armBarR.rotation.z = 0.15;
        equipmentGroup.add(armBarR);

        const loadStack = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.55, 1.7, 0.25)), metalMaterial);
        loadStack.position.set(0, -0.45, -0.85);
        equipmentGroup.add(loadStack);
        break;
      }

      case "strength-2": {
        // SMITH MACHINE
        const leftPost = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.1, 2.7, 0.1)), metalMaterial);
        leftPost.position.set(-0.8, -0.1, 0);
        equipmentGroup.add(leftPost);

        const rightPost = leftPost.clone();
        rightPost.position.x = 0.8;
        equipmentGroup.add(rightPost);

        const backGuideL = leftPost.clone();
        backGuideL.position.set(-0.8, -0.1, -0.75);
        backGuideL.rotation.x = -0.2;
        equipmentGroup.add(backGuideL);

        const backGuideR = backGuideL.clone();
        backGuideR.position.x = 0.8;
        equipmentGroup.add(backGuideR);

        const sliderShaftL = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.02, 0.02, 2.6)), chromeMaterial);
        sliderShaftL.position.set(-0.76, -0.15, 0.03);
        equipmentGroup.add(sliderShaftL);

        const sliderShaftR = sliderShaftL.clone();
        sliderShaftR.position.x = 0.76;
        equipmentGroup.add(sliderShaftR);

        // Barbell
        const barbellBar = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.024, 0.024, 2.1)), chromeMaterial);
        barbellBar.position.set(0, 0.05, 0.03);
        barbellBar.rotation.z = Math.PI / 2;
        equipmentGroup.add(barbellBar);

        const leftPlates = new THREE.Group();
        leftPlates.position.set(-0.95, 0.05, 0.03);
        leftPlates.rotation.z = Math.PI / 2;

        const mainPlt = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.19, 0.19, 0.08, 12)), cushionMaterial);
        leftPlates.add(mainPlt);

        const secondaryPlt = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.22, 0.22, 0.07, 12)), metalMaterial);
        secondaryPlt.position.y = -0.09;
        leftPlates.add(secondaryPlt);

        equipmentGroup.add(leftPlates);

        const rightPlates = leftPlates.clone();
        rightPlates.position.x = 0.95;
        equipmentGroup.add(rightPlates);
        break;
      }

      case "weights-1": {
        // DUMBBELLS ASSEMBLY
        const standL = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.06, 1.15, 0.06)), metalMaterial);
        standL.position.set(-0.9, -0.75, 0);
        standL.rotation.z = 0.12;
        equipmentGroup.add(standL);

        const standR = standL.clone();
        standR.position.x = 0.9;
        standR.rotation.z = -0.12;
        equipmentGroup.add(standR);

        const railUpper = new THREE.Mesh(regGeo(new THREE.BoxGeometry(1.9, 0.04, 0.3)), chromeMaterial);
        railUpper.position.set(0, -0.38, 0.05);
        equipmentGroup.add(railUpper);

        const railLower = railUpper.clone();
        railLower.position.y = -0.78;
        railLower.position.z = 0.15;
        equipmentGroup.add(railLower);

        // Dumbbells placement
        const offsets = [-0.65, -0.22, 0.22, 0.65];
        offsets.forEach((offsetX, xIdx) => {
          const dbGroup = new THREE.Group();
          dbGroup.position.set(offsetX, -0.32, 0.05);
          dbGroup.rotation.x = 0.15;

          const hBar = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.018, 0.018, 0.3)), chromeMaterial);
          hBar.rotation.z = Math.PI / 2;
          dbGroup.add(hBar);

          const r = 0.12 + xIdx * 0.035;
          const leftP = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(r, r, 0.07, 6)), cushionMaterial);
          leftP.position.x = -0.12;
          leftP.rotation.z = Math.PI / 2;
          dbGroup.add(leftP);

          const rightP = leftP.clone();
          rightP.position.x = 0.12;
          dbGroup.add(rightP);

          equipmentGroup.add(dbGroup);
        });
        break;
      }

      case "func-1": {
        // BATTLE ROPES
        const centerPin = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.07, 0.07, 1.25)), metalMaterial);
        centerPin.position.set(0, -0.7, -0.85);
        equipmentGroup.add(centerPin);

        const loopRing = new THREE.Mesh(regGeo(new THREE.TorusGeometry(0.09, 0.025, 10, 20)), chromeMaterial);
        loopRing.position.set(0, -0.5, -0.76);
        equipmentGroup.add(loopRing);

        // Dynamic rope splines generating beautiful wave curves
        const createWavySpline = (offsetDelta: number, phaseShift: number) => {
          const pathPoints = [];
          for (let z = 0; z <= 10; z++) {
            const zRat = z / 10;
            const targetZ = -0.7 + zRat * 2.5;
            const targetY = -1.35 + Math.sin(zRat * Math.PI * 4 + phaseShift) * 0.14 * (1 - zRat) + 0.08;
            const targetX = offsetDelta + Math.cos(zRat * Math.PI * 2 + phaseShift) * 0.05 * (1 - zRat);
            pathPoints.push(new THREE.Vector3(targetX, targetY - 0.02, targetZ));
          }
          const finalCurve = new THREE.CatmullRomCurve3(pathPoints);
          const tubeGeometry = regGeo(new THREE.TubeGeometry(finalCurve, 28, 0.04, 6, false));
          return new THREE.Mesh(tubeGeometry, new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 }));
        };

        const firstCurvingRope = createWavySpline(-0.12, 0);
        const secondCurvingRope = createWavySpline(0.12, Math.PI / 2);
        equipmentGroup.add(firstCurvingRope);
        equipmentGroup.add(secondCurvingRope);
        break;
      }

      case "func-2": {
        // KETTLEBELLS
        const kSizes = [0.36, 0.28, 0.22];
        const kOffsets = [
          new THREE.Vector3(-0.4, -0.98, 0.1),
          new THREE.Vector3(0.05, -1.06, -0.3),
          new THREE.Vector3(0.42, -1.13, 0.3)
        ];

        kSizes.forEach((radius, sIdx) => {
          const kBell = new THREE.Group();
          kBell.position.copy(kOffsets[sIdx]);

          const sphericalBody = new THREE.Mesh(regGeo(new THREE.SphereGeometry(radius, 24, 24)), cushionMaterial);
          sphericalBody.scale.y = 0.94;
          kBell.add(sphericalBody);

          const loopHandle = new THREE.Mesh(regGeo(new THREE.TorusGeometry(radius * 0.7, radius * 0.15, 12, 32, Math.PI)), chromeMaterial);
          loopHandle.position.y = radius * 0.82;
          kBell.add(loopHandle);

          equipmentGroup.add(kBell);
        });
        break;
      }

      case "strength-3": {
        // LAT PULLDOWN
        const uprightPost = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.12, 3.0, 0.12)), metalMaterial);
        uprightPost.position.set(0, 0.1, -0.3);
        equipmentGroup.add(uprightPost);

        const horizontalGallows = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.12, 0.12, 1.3)), metalMaterial);
        horizontalGallows.position.set(0, 1.4, 0.15);
        equipmentGroup.add(horizontalGallows);

        const benchSeat = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.6, 0.12, 0.8)), cushionMaterial);
        benchSeat.position.set(0, -0.65, 0.35);
        equipmentGroup.add(benchSeat);

        const cableRope = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.007, 0.007, 0.7)), chromeMaterial);
        cableRope.position.set(0, 1.1, 0.65);
        equipmentGroup.add(cableRope);

        const straightPulldownBar = new THREE.Group();
        straightPulldownBar.position.set(0, 0.75, 0.65);

        const internalPipe = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.02, 0.02, 1.7)), chromeMaterial);
        internalPipe.rotation.z = Math.PI / 2;
        straightPulldownBar.add(internalPipe);

        const barEndL = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.02, 0.02, 0.3)), chromeMaterial);
        barEndL.position.set(-0.85, -0.1, 0);
        barEndL.rotation.z = 0.45;
        straightPulldownBar.add(barEndL);

        const barEndR = barEndL.clone();
        barEndR.position.x = 0.85;
        barEndR.rotation.z = -0.45;
        straightPulldownBar.add(barEndR);

        equipmentGroup.add(straightPulldownBar);
        break;
      }

      case "strength-4": {
        // SHOULDER PRESS
        const baseStaging = new THREE.Mesh(regGeo(new THREE.BoxGeometry(1.1, 0.1, 1.3)), metalMaterial);
        baseStaging.position.y = -1.3;
        equipmentGroup.add(baseStaging);

        const spineGuide = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.12, 1.9, 0.12)), metalMaterial);
        spineGuide.position.set(0, -0.3, -0.05);
        spineGuide.rotation.x = -0.12;
        equipmentGroup.add(spineGuide);

        const bottomAssiento = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.64, 0.1, 0.64)), cushionMaterial);
        bottomAssiento.position.set(0, -0.58, 0.15);
        equipmentGroup.add(bottomAssiento);

        const backRibs = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.5, 0.85, 0.1)), cushionMaterial);
        backRibs.position.set(0, 0, 0.02);
        backRibs.rotation.x = -0.12;
        equipmentGroup.add(backRibs);

        const horizontalPivot = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.035, 0.035, 0.75)), chromeMaterial);
        horizontalPivot.position.set(0, 0.75, -0.15);
        horizontalPivot.rotation.z = Math.PI / 2;
        equipmentGroup.add(horizontalPivot);

        const gripPushL = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.025, 0.025, 1.15)), chromeMaterial);
        gripPushL.position.set(-0.32, 0.38, 0.15);
        gripPushL.rotation.set(-0.15, 0.0, 0.08);
        equipmentGroup.add(gripPushL);

        const gripPushR = gripPushL.clone();
        gripPushR.position.x = 0.32;
        gripPushR.rotation.z = -0.08;
        equipmentGroup.add(gripPushR);
        break;
      }

      case "weights-2": {
        // BARBELLS & PLATES STATION
        const rackPostL = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.08, 2.2, 0.08)), metalMaterial);
        rackPostL.position.set(-0.9, -0.32, 0);
        equipmentGroup.add(rackPostL);

        const rackPostR = rackPostL.clone();
        rackPostR.position.x = 0.9;
        equipmentGroup.add(rackPostR);

        const linkingRailLow = new THREE.Mesh(regGeo(new THREE.BoxGeometry(1.9, 0.08, 1.1)), metalMaterial);
        linkingRailLow.position.set(0, -1.35, 0.12);
        equipmentGroup.add(linkingRailLow);

        const catchHookL = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.12, 0.1, 0.24)), chromeMaterial);
        catchHookL.position.set(-0.9, 0.42, 0.06);
        equipmentGroup.add(catchHookL);

        const catchHookR = catchHookL.clone();
        catchHookR.position.x = 0.9;
        equipmentGroup.add(catchHookR);

        // Core straight barbell
        const straightBarbell = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.024, 0.024, 2.5)), chromeMaterial);
        straightBarbell.position.set(0, 0.48, 0.1);
        straightBarbell.rotation.z = Math.PI / 2;
        equipmentGroup.add(straightBarbell);

        const bumperSleeveGroupL = new THREE.Group();
        bumperSleeveGroupL.position.set(-1.05, 0.48, 0.1);
        bumperSleeveGroupL.rotation.z = Math.PI / 2;

        const red25KgPlate = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.23, 0.23, 0.08, 16)), cushionMaterial);
        bumperSleeveGroupL.add(red25KgPlate);

        const blue20KgPlate = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.21, 0.21, 0.07, 16)), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 }));
        blue20KgPlate.position.y = -0.09;
        bumperSleeveGroupL.add(blue20KgPlate);

        equipmentGroup.add(bumperSleeveGroupL);

        const bumperSleeveGroupR = bumperSleeveGroupL.clone();
        bumperSleeveGroupR.position.x = 1.05;
        bumperSleeveGroupR.rotation.z = -Math.PI / 2;
        equipmentGroup.add(bumperSleeveGroupR);
        break;
      }

      default: {
        // DUAL PULLEY FUNCTIONAL TRAINER (func-3)
        const frameHousingL = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.5, 2.8, 0.4)), metalMaterial);
        frameHousingL.position.set(-1.0, 0.0, -0.15);
        equipmentGroup.add(frameHousingL);

        const frameHousingR = frameHousingL.clone();
        frameHousingR.position.x = 1.0;
        equipmentGroup.add(frameHousingR);

        const traverseBridgingBar = new THREE.Mesh(regGeo(new THREE.BoxGeometry(2.3, 0.07, 0.4)), metalMaterial);
        traverseBridgingBar.position.set(0, 1.35, -0.15);
        equipmentGroup.add(traverseBridgingBar);

        const guideShaftL = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.015, 0.015, 2.6)), chromeMaterial);
        guideShaftL.position.set(-0.85, 0.0, -0.05);
        equipmentGroup.add(guideShaftL);

        const guideShaftR = guideShaftL.clone();
        guideShaftR.position.x = 0.85;
        equipmentGroup.add(guideShaftR);

        const lockPulleyCursorL = new THREE.Mesh(regGeo(new THREE.BoxGeometry(0.16, 0.16, 0.16)), chromeMaterial);
        lockPulleyCursorL.position.set(-0.85, -0.22, -0.05);
        equipmentGroup.add(lockPulleyCursorL);

        const wireLeftCrossover = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.005, 0.005, 0.9)), chromeMaterial);
        wireLeftCrossover.position.set(-0.5, -0.45, 0.2);
        wireLeftCrossover.rotation.z = -0.85;
        equipmentGroup.add(wireLeftCrossover);

        const lockPulleyCursorR = lockPulleyCursorL.clone();
        lockPulleyCursorR.position.x = 0.85;
        lockPulleyCursorR.position.y = 0.15;
        equipmentGroup.add(lockPulleyCursorR);

        const wireRightCrossover = new THREE.Mesh(regGeo(new THREE.CylinderGeometry(0.005, 0.005, 0.9)), chromeMaterial);
        wireRightCrossover.position.set(0.5, -0.15, 0.2);
        wireRightCrossover.rotation.z = 0.85;
        equipmentGroup.add(wireRightCrossover);
        break;
      }
    }

    // -------------------------------------------------------------
    // ROTATION AND SWIPE GESTURES GATOR
    // -------------------------------------------------------------
    const onMouseDown = (e: MouseEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return;
      const dX = e.clientX - dragRef.current.prevX;
      const dY = e.clientY - dragRef.current.prevY;

      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;

      dragRef.current.rotY += dX * 0.007;
      dragRef.current.rotX += dY * 0.007;

      dragRef.current.rotX = Math.max(-Math.PI / 5, Math.min(Math.PI / 5, dragRef.current.rotX));
    };

    const onMouseUpOrLeave = () => {
      dragRef.current.isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      dragRef.current.isDragging = true;
      dragRef.current.prevX = e.touches[0].clientX;
      dragRef.current.prevY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.isDragging || e.touches.length === 0) return;
      const dX = e.touches[0].clientX - dragRef.current.prevX;
      const dY = e.touches[0].clientY - dragRef.current.prevY;

      dragRef.current.prevX = e.touches[0].clientX;
      dragRef.current.prevY = e.touches[0].clientY;

      dragRef.current.rotY += dX * 0.01;
      dragRef.current.rotX += dY * 0.01;

      dragRef.current.rotX = Math.max(-Math.PI / 5, Math.min(Math.PI / 5, dragRef.current.rotX));
    };

    const containerEl = mountRef.current;
    if (containerEl) {
      containerEl.addEventListener("mousedown", onMouseDown);
      containerEl.addEventListener("mousemove", onMouseMove);
      containerEl.addEventListener("mouseup", onMouseUpOrLeave);
      containerEl.addEventListener("mouseleave", onMouseUpOrLeave);

      containerEl.addEventListener("touchstart", onTouchStart, { passive: true });
      containerEl.addEventListener("touchmove", onTouchMove, { passive: true });
      containerEl.addEventListener("touchend", onMouseUpOrLeave);
    }

    // Animation Loop
    let animationId: number;
    let timingClock = new THREE.Clock();

    const renderTick = () => {
      animationId = requestAnimationFrame(renderTick);
      const elapsedSec = timingClock.getElapsedTime();

      if (!dragRef.current.isDragging) {
        // Auto baseline slow spinning index
        dragRef.current.rotY += 0.004;
        equipmentGroup.position.y = Math.sin(elapsedSec * 1.4) * 0.04;
      }

      equipmentGroup.rotation.y = dragRef.current.rotY;
      equipmentGroup.rotation.x = dragRef.current.rotX;

      renderer.render(scene, camera);
    };

    renderTick();

    // Resize Observer bounds
    const resizeObs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObs.observe(mountRef.current);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObs.disconnect();

      if (containerEl) {
        containerEl.removeEventListener("mousedown", onMouseDown);
        containerEl.removeEventListener("mousemove", onMouseMove);
        containerEl.removeEventListener("mouseup", onMouseUpOrLeave);
        containerEl.removeEventListener("mouseleave", onMouseUpOrLeave);

        containerEl.removeEventListener("touchstart", onTouchStart);
        containerEl.removeEventListener("touchmove", onTouchMove);
        containerEl.removeEventListener("touchend", onMouseUpOrLeave);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometriesToDispose.forEach((g) => g.dispose());
      metalMaterial.dispose();
      chromeMaterial.dispose();
      cushionMaterial.dispose();
      wireMat.dispose();
      screenMaterial.dispose();
      spotLight.dispose();
      dirLight1.dispose();
      dirLight2.dispose();
      ambientLight.dispose();
      grid.dispose();
      renderer.dispose();
    };
  }, [equipmentId, accentColor]);

  return (
    <div className="w-full h-full relative overflow-hidden select-none rounded-2xl">
      {/* 3D Orbit overlay warning hud */}
      <div className="absolute top-4 left-4 font-mono text-[8.5px] text-zinc-500 pointer-events-none z-10 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          SYSTEM_RENDER // TRUE_3D_METRICS
        </div>
        <div className="text-zinc-600">DRAG TO ORBIT MACHINE</div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none z-10 text-zinc-600 flex items-center gap-1.5 font-mono text-[9px] uppercase">
        <RotateCw className="w-3.5 h-3.5 animate-spin text-red-500/40" />
        SENSITIVITY: HIGH
      </div>

      <div ref={mountRef} className="w-full h-full min-h-[300px] md:min-h-[380px] cursor-grab active:cursor-grabbing" />
    </div>
  );
};


/**
 * PRIMARY COMPONENT: GAME-STYLE GYM EQUIPMENT EXPLORER (HUD MASTER)
 */
export default function EquipmentShowcaseModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Gamified states
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    return localStorage.getItem("gym_onboarding_done") === "true";
  });
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [selectedGoal, setSelectedGoal] = useState<string>("");

  // Game progression states & engine
  const [activeZoneLevel, setActiveZoneLevel] = useState<number>(1);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [trainerInductionScheduled, setTrainerInductionScheduled] = useState<boolean>(false);

  // Playfulness scores and tracking
  const [xpPoints, setXpPoints] = useState<number>(() => {
    const saved = localStorage.getItem("gym_mastry_xp");
    return saved ? parseInt(saved, 10) : 100;
  });

  const [unlockedEquipmentIds, setUnlockedEquipmentIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("gym_unlocked_equipments");
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set(["cardio-1"]);
      }
    }
    return new Set(["cardio-1"]);
  });

  // Track unlocked levels / stages
  const [unlockedStages, setUnlockedStages] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("gym_unlocked_stages");
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set([1]);
      }
    }
    return new Set([1]); 
  });

  // Tap ripple state coordinates (soundless visual haptics)
  const [tapRipples, setTapRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextRippleId = useRef<number>(0);

  // Cinematic alerts
  const [unlockAnnouncement, setUnlockAnnouncement] = useState<{title: string; subtitle: string; description: string} | null>(null);
  const [levelUpAnnouncement, setLevelUpAnnouncement] = useState<{old: string; new: string} | null>(null);

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem("gym_mastry_xp", xpPoints.toString());
  }, [xpPoints]);

  useEffect(() => {
    localStorage.setItem("gym_unlocked_equipments", JSON.stringify(Array.from(unlockedEquipmentIds)));
  }, [unlockedEquipmentIds]);

  useEffect(() => {
    localStorage.setItem("gym_unlocked_stages", JSON.stringify(Array.from(unlockedStages)));
  }, [unlockedStages]);

  useEffect(() => {
    localStorage.setItem("gym_onboarding_done", onboardingCompleted.toString());
  }, [onboardingCompleted]);

  // Combine level equipments based on category mapping with proper stage levels
  const levelEquipments = useMemo(() => {
    return EQUIPMENTS.map((eq) => {
      let level = 1;
      let levelName = "Velocity Stage";

      if (eq.category === "Strength") {
        level = 2;
        levelName = "Kinetic Stage";
      } else if (eq.category === "Free Weights") {
        level = 3;
        levelName = "Gravity Stage";
      } else if (eq.category === "Functional Training") {
        level = 4;
        levelName = "Pulse Stage";
      }

      return {
        ...eq,
        level,
        levelName
      };
    });
  }, []);

  // Exploration percentage (unlocked vs total weights)
  const totalExploredUnlockedCount = useMemo(() => {
    return unlockedEquipmentIds.size;
  }, [unlockedEquipmentIds]);

  const progressPercentage = useMemo(() => {
    return Math.min(100, Math.floor((totalExploredUnlockedCount / EQUIPMENTS.length) * 100));
  }, [totalExploredUnlockedCount]);

  // Compute Athletic Level Rank name & badges based on current progress
  const getLevelNameFromProgress = (prog: number): "Beginner" | "Explorer" | "Challenger" | "Athlete" | "Elite" => {
    if (prog < 25) return "Beginner";
    if (prog < 50) return "Explorer";
    if (prog < 75) return "Challenger";
    if (prog < 95) return "Athlete";
    return "Elite";
  };

  const currentLevelTitle = useMemo(() => {
    return getLevelNameFromProgress(progressPercentage);
  }, [progressPercentage]);

  // Detect Level Up increments
  const prevLevelTitleRef = useRef<string>(currentLevelTitle);
  useEffect(() => {
    if (prevLevelTitleRef.current !== currentLevelTitle) {
      // Direct trigger level up animation!
      setLevelUpAnnouncement({
        old: prevLevelTitleRef.current,
        new: currentLevelTitle
      });
      prevLevelTitleRef.current = currentLevelTitle;
    }
  }, [currentLevelTitle]);

  // Filter machines based on search criteria and currently active level map coordinate
  const filteredEquipments = useMemo(() => {
    return levelEquipments.filter((eq) => {
      const matchSearch =
        searchQuery === "" ||
        eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchZone = eq.level === activeZoneLevel;
      return matchSearch && matchZone;
    });
  }, [levelEquipments, activeZoneLevel, searchQuery]);

  const currentActiveZone = useMemo(() => {
    return ZONES.find((z) => z.level === activeZoneLevel) || ZONES[0];
  }, [activeZoneLevel]);

  // Lock scroll when full-game overlays are mounted
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSelectedEquipment(null);
      setTrainerInductionScheduled(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle click soundless ripple highlights
  const handleStageContainerTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    const ry = e.clientY - rect.top;

    const id = nextRippleId.current++;
    setTapRipples((prev) => [...prev, { id, x: rx, y: ry }]);

    setTimeout(() => {
      setTapRipples((prev) => prev.filter((rip) => rip.id !== id));
    }, 600);

    if (navigator.vibrate) {
      navigator.vibrate(8);
    }
  };

  // Triggers Cinematic Unlocking Reveal Sequences
  const triggerEquipmentUnlockAnimation = (eq: Equipment) => {
    setUnlockAnnouncement({
      title: eq.name,
      subtitle: `Stage Level ${eq.category} Discovered`,
      description: eq.description
    });

    // Add directly to unlocked collection
    const updatedSet = new Set(unlockedEquipmentIds);
    updatedSet.add(eq.id);
    setUnlockedEquipmentIds(updatedSet);

    // Increase XP Points
    setXpPoints((prev) => prev + 150);

    // Automatically check stage completions to unlock next levels!
    const eqInThisZone = levelEquipments.filter(e => e.level === activeZoneLevel);
    const unlockedInThisZoneCount = eqInThisZone.filter(e => updatedSet.has(e.id)).length;
    
    // If all equipment within the current active zone are explored, unlock next campaign level!
    if (unlockedInThisZoneCount === eqInThisZone.length && activeZoneLevel < 4) {
      const nextLevel = activeZoneLevel + 1;
      if (!unlockedStages.has(nextLevel)) {
        const updatedStages = new Set(unlockedStages);
        updatedStages.add(nextLevel);
        setUnlockedStages(updatedStages);
      }
    }
  };

  const handleInspectMachine = (equipment: Equipment) => {
    const isAlreadyUnlocked = unlockedEquipmentIds.has(equipment.id);
    
    if (!isAlreadyUnlocked) {
      // Trigger cinematic unlock reward overlay sequence!
      triggerEquipmentUnlockAnimation(equipment);
    }

    setSelectedEquipment(equipment);
    setTrainerInductionScheduled(false);
  };

  const skipCadetProgram = () => {
    setOnboardingCompleted(true);
    setUnlockedEquipmentIds(new Set(levelEquipments.map(e => e.id)));
    setUnlockedStages(new Set([1, 2, 3, 4]));
    setXpPoints((prev) => prev + 350);
  };

  const handleSelectGoal = (goalStr: string) => {
    setSelectedGoal(goalStr);
    setXpPoints((prev) => prev + 100);
    // Transition to step 2 (Scan Highlight instruction)
    setOnboardingStep(2);
  };

  const handleCompleteOnboardingTreadmillTrigger = () => {
    // Force cinematic unlock trigger of Cardio-1 Treadmill first
    const treadmill = levelEquipments.find(e => e.id === "cardio-1") || levelEquipments[0];
    triggerEquipmentUnlockAnimation(treadmill);
    setOnboardingStep(4);
  };

  const finishAdventureOnboarding = () => {
    setOnboardingCompleted(true);
    setXpPoints((prev) => prev + 200);
  };

  const resetCampaignQuestProgress = () => {
    if (window.confirm("CONFIRM SYSTEM OVERRIDE: This resets all discovered coordinates and XP to Recruit ratios? This is irreversible.")) {
      setUnlockedEquipmentIds(new Set(["cardio-1"]));
      setUnlockedStages(new Set([1]));
      setXpPoints(100);
      setOnboardingCompleted(false);
      setOnboardingStep(0);
      setActiveZoneLevel(1);
    }
  };

  const submitInductionQuest = (e: React.FormEvent) => {
    e.preventDefault();
    setTrainerInductionScheduled(true);
    setXpPoints((prev) => prev + 250);
  };

  const specDetails = selectedEquipment ? ENHANCED_DETAILS[selectedEquipment.id] : null;
  const diffMultiplier = specDetails ? specDetails.difficulty : "Beginner";

  return (
    <>
      {/* -------------------------------------------------------------
          NEON GLOW GAME EXPLORER BUTTON (Always minimal on bottom safe frame)
          ------------------------------------------------------------- */}
      <div id="game-style-explorer-trigger-shell" className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="btn-game-style-trigger"
          title="Launch Interactive Explorer"
          onClick={(e) => {
            handleStageContainerTap(e);
            setIsOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-4 rounded-full flex items-center gap-3 cursor-pointer bg-zinc-950 border border-red-500/50 text-white font-mono tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.45)] backdrop-blur-md overflow-hidden"
        >
          {/* Subtle horizontal scanning radar lines */}
          <div className="absolute inset-x-0 top-0 h-px bg-red-500/60 animate-pulse" />
          
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>

          <Dumbbell className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-extrabold uppercase tracking-widest text-[#ef4444]">
            Explore Equipment
          </span>
        </motion.button>
      </div>

      {/* -------------------------------------------------------------
          MAIN IMMERSIVE GAME CHASSIS SYSTEM OVERLAY
          ------------------------------------------------------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="game-showcase-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full z-50 overflow-y-auto bg-black text-white font-sans flex flex-col focus:outline-none"
          >
            {/* Holographic matrix grids lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,22,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,22,0.45)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

            {/* Glowing neon lamps casting colored space halos */}
            <div className="absolute top-0 left-[25%] w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

            {/* Visual click ripple haptics simulation */}
            {tapRipples.map((rip) => (
              <span
                key={rip.id}
                style={{ left: rip.x - 24, top: rip.y - 24 }}
                className="absolute w-12 h-12 rounded-full border border-red-500 pointer-events-none z-50 animate-ping opacity-60"
              />
            ))}

            {/* -------------------------------------------------------------
                A1. CINEMATIC DISCOVERY REVEAL GATOR (UNLOCK ANIMATIONS OVERLAY)
                ------------------------------------------------------------- */}
            <AnimatePresence>
              {unlockAnnouncement && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 w-full h-full bg-black/95 z-50 flex flex-col items-center justify-center p-4"
                >
                  {/* Neon laser flash animation panel */}
                  <motion.div 
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: -50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="max-w-md w-full bg-zinc-950 border-2 border-red-500 p-8 rounded-3xl relative overflow-hidden text-center shadow-[0_0_60px_rgba(239,68,68,0.25)]"
                  >
                    {/* Ring particle pulse back */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-red-500/10 animate-ping pointer-events-none" />
                    
                    <div className="w-20 h-20 rounded-full bg-red-950/40 border-2 border-red-500 text-red-500 flex items-center justify-center mx-auto mb-6 relative">
                      <Lock className="w-8 h-8 animate-bounce" />
                      <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-pulse" />
                    </div>

                    <span className="font-mono text-[10px] text-red-500 font-extrabold uppercase tracking-widest block mb-1">
                      DISCOVERY DETECTED
                    </span>
                    <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-2 leading-none">
                      UNLOCKED
                    </h2>
                    <h3 className="text-zinc-300 font-mono text-sm uppercase text-white font-bold mb-4">
                      {unlockAnnouncement.title}
                    </h3>
                    
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed mb-6">
                      {unlockAnnouncement.description}
                    </p>

                    <div className="p-3 bg-zinc-900/60 border border-zinc-850 rounded-xl inline-flex items-center gap-2 font-mono text-[10px]">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-zinc-400">XP CONVERTED:</span>
                      <span className="font-bold text-white">+150 XP AWARDED</span>
                    </div>

                    <div className="mt-8">
                      <button
                        onClick={() => setUnlockAnnouncement(null)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-red-500 shadow-md"
                      >
                        CLOSE ANNOUNCEMENT
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* -------------------------------------------------------------
                A2. LEVEL-UP CINEMATIC OVERLAY RECEPTACLE
                ------------------------------------------------------------- */}
            <AnimatePresence>
              {levelUpAnnouncement && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 w-full h-full bg-black/95 z-50 flex flex-col items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.75, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="max-w-md w-full bg-gradient-to-b from-zinc-950 to-black border-2 border-amber-500 p-8 rounded-3xl text-center relative overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.25)]"
                  >
                    {/* Glowing gold burst ring */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="w-24 h-24 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center mx-auto mb-6 relative">
                      <Award className="w-10 h-10 text-amber-500 animate-spin-slow" />
                      <div className="absolute inset-1 rounded-full border border-dashed border-amber-500/40 animate-spin" />
                    </div>

                    <span className="font-mono text-[11px] text-amber-500 font-black uppercase tracking-widest block mb-1">
                      INTEGRATED LEVEL UP
                    </span>
                    <h2 className="font-display font-black text-4xl uppercase tracking-tight text-white mb-2">
                      PROMOTED
                    </h2>
                    <p className="font-sans text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed mb-6">
                      You have advanced from <span className="font-bold whitespace-nowrap text-zinc-500">{levelUpAnnouncement.old}</span> status to a recognized champion status class!
                    </p>

                    <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block mb-1">ATHLETIC CLASS SIGNED</span>
                      <span className="font-display font-black text-xl uppercase text-amber-500 tracking-wider">
                        {levelUpAnnouncement.new}
                      </span>
                    </div>

                    <button
                      onClick={() => setLevelUpAnnouncement(null)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-mono text-xs font-black uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-amber-400 shadow-md"
                    >
                      ACCREDIT ADVANCEMENT
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>


            {/* -------------------------------------------------------------
                B1. GAMIFIED ONBOARDING FLOW COUPLING
                ------------------------------------------------------------- */}
            {!onboardingCompleted && (
              <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-20">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 0: WELCOME GREETING CAPTAIN */}
                  {onboardingStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="max-w-xl w-full bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden text-center shadow-2xl"
                    >
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                      
                      <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 text-red-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Compass className="w-7 h-7 text-red-500 animate-spin-slow" />
                      </div>

                      <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-black block mb-1">
                        SALEM INTERACTIVE PLATFORM
                      </span>
                      <h2 className="font-display font-black text-3xl uppercase tracking-tight text-white mb-3">
                        GYM SYSTEMS QUEST
                      </h2>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                        Unlock, scan, and inspect the elite biomechanics machinery that drives world-class athlete training loops. Connect direct coaching blueprints. No prior gym intelligence is requested.
                      </p>

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setOnboardingStep(1)}
                          className="w-full py-4 bg-red-600 hover:bg-neutral-900/60 hover:text-red-500 text-white font-mono text-xs uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-transparent hover:border-red-500/30"
                        >
                          INITIATE TRAINING BLUEPRINT <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={skipCadetProgram}
                          className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors uppercase self-center py-1 mt-2 underline"
                        >
                          Skip Cadet Program & Unlock All Stages
                        </button>
                      </div>
                    </motion.div>
                  )}


                  {/* STEP 1: CHOOSE THE GOAL BLUEPRINT */}
                  {onboardingStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="max-w-2xl w-full bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4">
                        <div>
                          <span className="font-mono text-[8px] text-zinc-500 block uppercase font-bold">CADET DEPLOYMENT SEQUENCE</span>
                          <h3 className="font-display font-extrabold text-lg uppercase text-white">CHOOSE ADVENTURE PATH</h3>
                        </div>
                        <button onClick={skipCadetProgram} className="text-zinc-600 hover:text-zinc-400 font-mono text-[9.5px] uppercase">
                          Skip Onboarding
                        </button>
                      </div>

                      <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                        Select a biomechanical blueprint matching your targets. This calibrates default scanners and awards initial campaign levels.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                          { id: "loss", title: "WEIGHT DESTROYER", desc: "For extreme VO2 Max conditioning and core calorie sweep ratios.", badge: "STAGE_VELOCITY" },
                          { id: "gain", title: "FORCE MASS CORE", desc: "Isolated tension arrays, deep concentric load press variables.", badge: "STAGE_KINETIC" },
                          { id: "fitness", title: "ATHLETIC PLASTIC", desc: "Suspended vectors, multi-planar cables and dynamic kettlebells.", badge: "STAGE_PULSE" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSelectGoal(item.id)}
                            className="bg-zinc-950 border border-zinc-900 hover:border-red-500 p-5 rounded-2xl text-left cursor-pointer transition-all hover:bg-zinc-900/30 group flex flex-col justify-between min-h-[160px]"
                          >
                            <span className="font-mono text-[8px] text-zinc-500 group-hover:text-red-500 uppercase font-bold">{item.badge}</span>
                            <h4 className="font-display font-extrabold text-sm uppercase text-white my-2 group-hover:text-red-500 transition-colors">
                              {item.title}
                            </h4>
                            <p className="font-sans text-[10.5px] text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                              {item.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}


                  {/* STEP 2: SCANNERS DEPLOYED (GUIDED HIGHLIGHT INSTRUCTION) */}
                  {onboardingStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="max-w-xl w-full bg-zinc-950/85 border border-zinc-900 rounded-3xl p-8 backdrop-blur-xl relative text-center"
                    >
                      <div className="w-12 h-12 bg-cyan-950/40 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 animate-pulse">
                        <Activity className="w-5 h-5" />
                      </div>

                      <span className="font-mono text-[8px] text-cyan-400 font-extrabold uppercase tracking-widest block mb-1">
                        LEVEL SEC_01 SCANNER ONLINE
                      </span>
                      <h3 className="font-display font-black text-xl uppercase tracking-wider text-white mb-2">
                        FIRST MACHINE SCANNING PIN
                      </h3>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                        To unlock Stage One (Velocity Cardio deck), scanning is initiated. Execute scanning procedures on the <span className="text-cyan-400 font-bold">Commercial Treadmill</span>.
                      </p>

                      {/* Simulator preview box of treadmill */}
                      <div className="p-4 bg-zinc-950 border border-dashed border-cyan-500/20 rounded-2xl mb-6 relative hover:border-cyan-500 transition-all flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=200&auto=format&fit=crop"
                            alt="treadmill"
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-cover rounded-lg border border-zinc-800"
                          />
                          <div className="text-left">
                            <span className="font-mono text-[8px] text-zinc-500 uppercase block font-bold">DISCOVERY DIRECTORY // ITEM 01</span>
                            <span className="font-mono text-xs font-extrabold text-white uppercase block leading-none">COMMERCIAL TREADMILL</span>
                          </div>
                        </div>

                        <button
                          onClick={handleCompleteOnboardingTreadmillTrigger}
                          className="p-2 px-4 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-400 rounded-lg font-mono text-[10.5px] uppercase font-bold animate-pulse cursor-pointer"
                        >
                          INITIALIZE DISCOVERY
                        </button>
                      </div>

                      <button onClick={skipCadetProgram} className="font-mono text-[9.5px] text-zinc-500 hover:text-zinc-400 uppercase">
                        Skip Onboarding
                      </button>
                    </motion.div>
                  )}


                  {/* STEP 4: ONBOARDING ACCREDITATION COMPLETED framing */}
                  {onboardingStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="max-w-xl w-full bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 backdrop-blur-xl relative text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-950/35 border-2 border-green-500 text-green-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <CheckCircle className="w-8 h-8" />
                      </div>

                      <span className="font-mono text-[8px] text-zinc-500 uppercase font-black tracking-widest block mb-1">
                        BLUEPRINT SYNCHRONIZED
                      </span>
                      <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-2">
                        YOU ARE READY TO DISCOVER
                      </h2>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-6">
                        Scanner array calibrated. Discover equipment levels, gain scores, unlock biomechanical blueprints, and connect premium coaches on the live lobby!
                      </p>

                      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl inline-flex items-center gap-2 font-mono text-[9px] mb-6">
                        <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                        <span className="text-zinc-500">Milestone Bonus Earned:</span>
                        <span className="text-white font-bold">+200 XP Awarded</span>
                      </div>

                      <button
                        onClick={finishAdventureOnboarding}
                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase font-extrabold tracking-widest rounded-xl transition-all cursor-pointer shadow-lg"
                      >
                        ENTER ACTIVE HUD SYSTEM
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            )}


            {/* -------------------------------------------------------------
                B2. FULL GAME STATION LOBBY HUD (MAIN SCENE FRAMEWORK)
                ------------------------------------------------------------- */}
            {onboardingCompleted && (
              <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col flex-grow relative z-10 select-none">
                
                {/* -------------------------------------------------------------
                    HUD TOP HEADER: ATHLETE LEVEL INDICATORS & DYNAMIC PROGRESS
                    ------------------------------------------------------------- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-zinc-900 mb-6 font-mono">
                  
                  {/* Left Label Blocks */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded text-[9px] tracking-wide font-black uppercase">
                        SYS_STATUS: ACTIVE HUD
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-zinc-600 text-[9.5px] uppercase">
                        DYNAMO_KINETIC MATRIX
                      </span>
                    </div>

                    <h1 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-white flex items-center gap-2">
                      BIOMECHANICAL <span className="text-red-500">SCOUT</span>
                    </h1>
                  </div>

                  {/* Level system progression & Dynamic fill bar indicators */}
                  <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto bg-zinc-950/80 border border-zinc-900/60 p-3.5 rounded-xl backdrop-blur-md justify-between lg:justify-start">
                    
                    {/* Badge and Athlete Level */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-500/30 text-red-500 flex items-center justify-center">
                        <Trophy className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[8.5px] block uppercase">COGNITIVE LEVEL Rank</span>
                        <span className="text-xs font-black tracking-widest text-[#ef4444] uppercase">{currentLevelTitle}</span>
                      </div>
                    </div>

                    <div className="h-8 w-px bg-zinc-900 hidden sm:block" />

                    {/* XP progression counts */}
                    <div>
                      <span className="text-zinc-500 text-[8.5px] block uppercase">XP COUNTER</span>
                      <span className="text-xs font-black tracking-widest text-white">{xpPoints} XP GAINED</span>
                    </div>

                    <div className="h-8 w-px bg-zinc-900 hidden sm:block" />

                    {/* Highly responsive HUD progression bar */}
                    <div className="flex flex-col gap-1 min-w-[130px] flex-grow sm:flex-grow-0">
                      <div className="flex items-center justify-between text-[8px] text-zinc-500 font-bold">
                        <span>STAGE COMPLETION RATE</span>
                        <span className="text-white">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden relative border border-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full transition-all duration-300 ${
                            progressPercentage >= 90
                              ? "bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                              : "bg-red-600"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="h-4 w-px bg-zinc-900 hidden sm:block" />

                    {/* Close action trigger */}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 bg-zinc-900 border border-zinc-800 hover:border-red-500 text-zinc-500 hover:text-red-500 rounded-full transition-all cursor-pointer shadow-md group"
                      title="Deactivate Quest HUD"
                    >
                      <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>


                {/* -------------------------------------------------------------
                    HUD CENTER WORKSPACE Grid Panels
                    ------------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-grow mb-6 relative">
                  
                  {/* LEFT RAIL MODULES (INTERACTIVE CAMPAIGN CONNECTOR LEVEL MAP) */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    
                    {/* CAMPAIGN LEVEL SELECT NODE CANVAS */}
                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl relative overflow-hidden flex flex-col backdrop-blur-md">
                      
                      {/* Interactive campaign map indicator labels */}
                      <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-black block mb-4">
                        CAMPAIGN LEVEL SECTOR DIRECTORY
                      </span>

                      {/* Level zones rendered as interactive mapped nodes with connector lines */}
                      <div className="flex flex-col gap-3.5 relative">
                        {/* Connecting dotted laser lines behind map buttons */}
                        <div className="absolute left-[30px] top-6 bottom-6 w-0.5 border-l border-dashed border-zinc-800 pointer-events-none z-0" />

                        {ZONES.map((zn) => {
                          const IsSelected = zn.level === activeZoneLevel;
                          const IsUnlocked = unlockedStages.has(zn.level);
                          const ZoneIcon = zn.icon;

                          // Compute completing ratios in this sector
                          const eqInThisZone = levelEquipments.filter(e => e.level === zn.level);
                          const exploredInThisZone = eqInThisZone.filter(e => unlockedEquipmentIds.has(e.id)).length;
                          const isFullyExplored = exploredInThisZone === eqInThisZone.length;

                          return (
                            <button
                              key={zn.level}
                              disabled={!IsUnlocked}
                              onClick={(e) => {
                                handleStageContainerTap(e);
                                if (IsUnlocked) {
                                  setActiveZoneLevel(zn.level);
                                }
                              }}
                              className={`w-full p-4 rounded-xl text-left font-mono transition-all duration-300 flex items-center justify-between border relative overflow-hidden group z-10 ${
                                !IsUnlocked
                                  ? "bg-zinc-950/40 border-zinc-900/60 opacity-[0.45] cursor-not-allowed"
                                  : IsSelected
                                    ? `bg-zinc-900 border-${zn.color}-500/50 ${zn.borderGlow}`
                                    : "bg-zinc-950 border-zinc-900 hover:border-zinc-800 cursor-pointer"
                              }`}
                            >
                              {/* Left status glow edge */}
                              {IsSelected && IsUnlocked && (
                                <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                                  zn.color === "cyan" ? "bg-cyan-500" :
                                  zn.color === "red" ? "bg-red-500" :
                                  zn.color === "amber" ? "bg-amber-500" : "bg-emerald-500"
                                }`} />
                              )}

                              <div className="flex items-center gap-3.5 relative z-10">
                                {/* Visual numbered nodes */}
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black border transition-all ${
                                  !IsUnlocked
                                    ? 'bg-zinc-900 border-zinc-800 text-zinc-600'
                                    : IsSelected
                                      ? `${zn.textColor} ${zn.bgColor} border-${zn.color}-500/40`
                                      : 'bg-zinc-950 border-zinc-850 text-zinc-500 group-hover:text-white'
                                }`}>
                                  {IsUnlocked ? <ZoneIcon className="w-4.5 h-4.5" /> : <Lock className="w-4 h-4 text-zinc-600" />}
                                </div>

                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[8px] text-zinc-600 font-bold tracking-tight uppercase">
                                      LEVEL 0{zn.level}
                                    </span>
                                    {isFullyExplored && IsUnlocked && (
                                      <span className="text-[7px] uppercase bg-green-950/60 border border-green-500/30 text-green-400 px-1 rounded-sm flex items-center gap-0.5 font-bold tracking-tighter">
                                        COMPLETED
                                      </span>
                                    )}
                                  </div>
                                  <h3 className={`font-display font-extrabold text-sm uppercase tracking-tight transition-colors ${
                                    !IsUnlocked ? 'text-zinc-600' : 'text-white group-hover:text-red-500'
                                  }`}>
                                    {zn.name}
                                  </h3>
                                  <span className="text-[8.5px] text-zinc-500 group-hover:text-zinc-400 transition-colors capitalize">
                                    {zn.category} Section
                                  </span>
                                </div>
                              </div>

                              {/* Completed count labels on node column */}
                              <div className="text-right flex flex-col justify-end shrink-0 relative z-10">
                                {IsUnlocked ? (
                                  <>
                                    <span className="font-extrabold text-xs text-white">
                                      {exploredInThisZone} / {eqInThisZone.length}
                                    </span>
                                    <span className="text-[8px] text-zinc-500 tracking-tighter uppercase">Discovered</span>
                                  </>
                                ) : (
                                  <span className="text-[7.5px] uppercase text-zinc-600 font-bold bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded-sm">
                                    Locked
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                    </div>

                    {/* ACTIVE ZONE DETAILS PANEL */}
                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex-grow flex flex-col justify-between backdrop-blur-md">
                      <div>
                        <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-black block mb-3 border-b border-zinc-900 pb-2">
                          ACTIVE ZONE MATRIX STATS
                        </span>

                        <div className="space-y-3.5 my-3.5 font-mono text-[11px]">
                          <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
                            <span className="text-zinc-500 uppercase">Sector:</span>
                            <span className="text-white font-bold">{currentActiveZone.codename}</span>
                          </div>

                          <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
                            <span className="text-zinc-500 uppercase">Kinetic Base:</span>
                            <span className="text-white font-bold capitalize">{currentActiveZone.difficulty}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500 uppercase">Sector Specs:</span>
                            <span className="text-red-500 font-black animate-pulse">BIOMETRIC_CHECK</span>
                          </div>
                        </div>

                        <p className="font-sans text-[11px] text-zinc-500 leading-relaxed italic mt-4 pt-3 border-t border-zinc-900">
                          "{currentActiveZone.description}"
                        </p>
                      </div>

                      {/* Diagnostics Action Deck */}
                      <div className="mt-6 pt-4 border-t border-zinc-900">
                        <div className="flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
                            <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                          </div>
                          <div>
                            <span className="font-mono text-[8px] text-zinc-400 block uppercase font-bold">BIO-METRIC SCAN READY</span>
                            <span className="font-sans text-[10px] text-zinc-500 block leading-tight">Inspect cards at right to launch real-time 3D simulation grids.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>


                  {/* RIGHT COLUMN AREA: SCANNER SEARCH RIBBON & CARD DIRECTORY */}
                  <div className="lg:col-span-8 flex flex-col gap-5">
                    
                    {/* HUD DIRECTORY CONTROLLER BAR */}
                    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
                      <div className="relative w-full sm:max-w-xs">
                        <Search className="w-4 h-4 text-zinc-550 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search machinery scanner directory..."
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 focus:outline-none rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={resetCampaignQuestProgress}
                          className="p-2 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[10px] font-mono cursor-pointer flex items-center gap-1.5 text-zinc-400 hover:text-red-500"
                          title="Override & Reset Campaign Level"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Reset Quest
                        </button>
                      </div>
                    </div>


                    {/* HIGH-FIDELITY ACTIVE SECTOR SCANNED CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredEquipments.map((eq) => {
                        const isUnlocked = unlockedEquipmentIds.has(eq.id);
                        const specDetails = ENHANCED_DETAILS[eq.id];
                        const diffMultiplier = specDetails?.difficulty || "Beginner";

                        return (
                          <motion.button
                            key={eq.id}
                            onClick={() => handleInspectMachine(eq)}
                            whileHover={{ y: -4, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 bg-zinc-950 border text-left rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[230px] group cursor-pointer ${
                              isUnlocked
                                ? "border-zinc-900 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.06)]"
                                : "border-zinc-900 hover:border-zinc-800"
                            }`}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/[0.01] rounded-full blur-xl group-hover:bg-red-500/[0.05] transition-all duration-500" />

                            {/* Upper category and Locks indicator elements */}
                            <div className="flex items-center justify-between font-mono text-[8px] tracking-widest uppercase mb-4 relative z-10">
                              <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400">
                                {eq.category}
                              </span>
                              {isUnlocked ? (
                                <span className="text-[8px] bg-green-950/40 text-green-400 border border-green-500/20 px-1 rounded-sm uppercase font-extrabold tracking-widest flex items-center gap-0.5">
                                  <CheckCircle className="w-2.5 h-2.5" /> UNLOCKED
                                </span>
                              ) : (
                                <span className="text-[8px] bg-zinc-900 text-zinc-500 px-1.5 rounded-sm uppercase tracking-widest flex items-center gap-1 font-bold">
                                  <Lock className="w-2.5 h-2.5" /> SCAN REQ
                                </span>
                              )}
                            </div>

                            {/* 2D Preview Framing Box */}
                            <div className="relative h-24 w-full rounded-xl bg-zinc-900/40 overflow-hidden mb-3 border border-zinc-900 flex items-center justify-center">
                              <img
                                src={eq.imageUrl}
                                alt={eq.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 opacity-80" />
                              <div className="absolute bottom-2 left-2 flex items-center gap-1 font-mono text-[8.5px] text-zinc-400 font-bold uppercase">
                                <Sliders className="w-3 h-3 text-red-500" /> {eq.stats.label}: {eq.stats.value}
                              </div>
                              
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Eye className="w-5 h-5 text-red-500 animate-pulse" />
                              </div>
                            </div>

                            {/* Descriptions */}
                            <div className="relative z-10 flex-grow flex flex-col justify-end">
                              <h4 className="font-display font-black text-sm uppercase text-white truncate tracking-tight group-hover:text-red-500 transition-colors">
                                {eq.name}
                              </h4>
                              <p className="font-sans text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-2 mt-1 leading-relaxed">
                                {eq.description}
                              </p>
                            </div>

                            {/* Lock action bar */}
                            <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-4 text-[9px] font-mono">
                              <span className="text-zinc-500 uppercase">RANK: {diffMultiplier}</span>
                              <span className="text-red-500 font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                {isUnlocked ? 'DIAGNOSTICS' : 'SCAN UNLOCK'} <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>

                          </motion.button>
                        );
                      })}

                      {/* EMPTY SEARCH SECTOR FALLBACK */}
                      {filteredEquipments.length === 0 && (
                        <div className="col-span-full py-16 text-center border-2 border-dashed border-zinc-900 rounded-2xl bg-zinc-950 flex flex-col items-center justify-center gap-3">
                          <Dumbbell className="w-8 h-8 text-zinc-700 animate-bounce" />
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block">No equipment discovered in this search</span>
                          <p className="font-sans text-[11px] text-zinc-500 max-w-xs mx-auto">
                            Try adjusting searching parameters or switch campaign stage sectors on the left node rail lists.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>

                </div>


                {/* -------------------------------------------------------------
                    HUD BOTTOM ACTION STRIP (PROMPTING STAY & BOOK CLINICS)
                    ------------------------------------------------------------- */}
                <div className="border-t border-zinc-900/80 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-mono text-zinc-500 text-xs">
                  <div className="flex items-center gap-1.5 uppercase font-mono text-[9px]">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    LICENSED OPERATOR SEC-9 // HUD SCANNER ACTIVE
                  </div>
                  <div className="font-mono text-[9px] text-zinc-600">
                    INTERACTIVE CAMPAIGN ACCREDITED BY SALEM PERFORMANCE LABS GROUP © 2026. ALL RIGHTS RESERVED
                  </div>
                </div>

              </div>
            )}


            {/* -------------------------------------------------------------
                C1. REVEALED DETAILED PANEL: REAL-TIME 3D RADIAL SCENERY
                ------------------------------------------------------------- */}
            <AnimatePresence>
              {selectedEquipment && onboardingCompleted && (
                <div className="fixed inset-0 w-full h-full z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="w-full max-w-5xl bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)] flex flex-col lg:flex-row h-auto max-h-[90vh]"
                  >
                    
                    {/* LEFT SPECIFICATIONS: 3D VIEWER WINDOW */}
                    <div className="w-full lg:w-1/2 bg-zinc-950 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-900 relative">
                      
                      {/* Interactive Spec selectors */}
                      <div className="flex justify-between items-center z-10 relative mb-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setViewMode("3d")}
                            className={`p-1.5 px-3 rounded-lg font-mono text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                              viewMode === "3d"
                                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                : "bg-zinc-900/60 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <RotateCw className="w-3.5 h-3.5" /> 3D Simulator
                          </button>
                          <button
                            onClick={() => setViewMode("2d")}
                            className={`p-1.5 px-3 rounded-lg font-mono text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                              viewMode === "2d"
                                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                                : "bg-zinc-900/60 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" /> 2D Frame
                          </button>
                        </div>

                        <span className="font-mono text-[9px] text-zinc-650 uppercase tracking-widest hidden sm:inline">
                          SPECS RATIO // CAL_M.103
                        </span>
                      </div>

                      {/* Display Viewport */}
                      <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-2xl bg-[#09090c] border border-zinc-900 min-h-[280px]">
                        {viewMode === "3d" ? (
                          <ThreeEquipmentViewer
                            equipmentId={selectedEquipment.id}
                            accentColor={
                              currentActiveZone.color === "cyan" ? "#0ea5e9" :
                              currentActiveZone.color === "red" ? "#ef4444" :
                              currentActiveZone.color === "amber" ? "#f59e0b" : "#10b981"
                            }
                          />
                        ) : (
                          <div className="w-full h-full min-h-[280px] relative">
                            <img
                              src={selectedEquipment.imageUrl}
                              alt={selectedEquipment.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover brightness-[0.8] transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-900/60 pt-4 mt-4 text-[10px] font-mono text-zinc-500">
                        <span>CALIBRATION METRICS: EXTREME</span>
                        <span className="text-white font-bold">{selectedEquipment.specs}</span>
                      </div>
                    </div>


                    {/* RIGHT COGNITIVE COMPONENT: PERFORMANCE PARAMETERS SPEC SHEET */}
                    <div className="w-full lg:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between gap-6">
                      
                      {/* Back handle */}
                      <div className="flex justify-between items-center border-b border-zinc-900/80 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[9px] uppercase tracking-widest font-black rounded">
                            {selectedEquipment.category}
                          </span>
                          <span className="text-zinc-600 font-mono text-[10px]">DIAGNOSTICS_MATRIX</span>
                        </div>

                        <button
                          onClick={() => setSelectedEquipment(null)}
                          className="p-1 px-3 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 rounded font-mono text-[9px] uppercase tracking-wider flex items-center gap-1 hover:text-red-500 cursor-pointer text-zinc-400 transition-colors"
                        >
                          ✕ Back to Map
                        </button>
                      </div>

                      {/* Machine Title labels */}
                      <div className="flex flex-col gap-2">
                        <span className="font-mono text-[8px] text-red-500 uppercase tracking-widest font-bold">
                          DIAGNOSTIC BLUEPRINT CORE
                        </span>
                        <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white leading-none">
                          {selectedEquipment.name}
                        </h2>
                        <p className="font-sans text-[11.5px] text-zinc-400 leading-relaxed">
                          {selectedEquipment.description}
                        </p>
                      </div>

                      {/* Performance indicators */}
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="p-3 bg-zinc-905 border border-zinc-900 rounded-xl">
                          <span className="font-mono text-[8px] text-zinc-550 block mb-0.5 uppercase font-bold">KEY PARAMETERS</span>
                          <span className="font-mono text-[10.5px] text-red-400 font-black uppercase">
                            {selectedEquipment.stats.label}: {selectedEquipment.stats.value}
                          </span>
                        </div>
                        
                        <div className="p-3 bg-zinc-905 border border-zinc-900 rounded-xl">
                          <span className="font-mono text-[8px] text-zinc-550 block mb-0.5 uppercase font-bold">MUTATION LEVEL</span>
                          <span className="font-mono text-[10.5px] text-white tracking-wider flex items-center gap-1.5 font-black uppercase">
                            <Activity className="w-3.5 h-3.5 text-red-500" />
                            {diffMultiplier}
                          </span>
                        </div>
                      </div>

                      {/* Muscle Targets */}
                      <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded bg-red-950/20 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                          <Target className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <span className="font-mono text-[8px] text-zinc-500 block font-bold">TACTICAL KINETIC CORE TARGETS</span>
                          <p className="font-sans text-xs text-zinc-200 leading-snug font-medium">
                            {specDetails?.muscleGroup || "Compound load integration patterns."}
                          </p>
                        </div>
                      </div>

                      {/* Steps alignment */}
                      <div className="flex flex-col gap-3">
                        <h4 className="font-display font-extrabold text-[10.5px] text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-red-500" /> BIOMECHANICAL ALIGNMENT ALGORITHM
                        </h4>
                        <div className="flex flex-col gap-2">
                          {(specDetails?.setupGuide || [
                            "Position body symmetric to central axes metrics.",
                            "Unpin adjustable limit pin selectors slowly safely."
                          ]).map((step, idx) => (
                            <div key={idx} className="flex gap-3 text-zinc-400 text-xs leading-relaxed bg-zinc-900/20 border border-zinc-900 p-2.5 rounded-xl">
                              <span className="font-mono text-red-500 font-bold shrink-0 text-xs">
                                0{idx + 1}.
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expert recomendations */}
                      <div className="flex flex-col gap-3">
                        <h4 className="font-display font-extrabold text-[10.5px] text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-red-500" /> ADVANCED TRAINING PARAMETERS
                        </h4>
                        <div className="flex flex-col gap-2">
                          {(specDetails?.tips || [
                            "Perform negative eccentric arcs slowly to enhance micro-tear fibers."
                          ]).map((tip, idx) => (
                            <div key={idx} className="flex gap-2.5 text-zinc-300 text-xs leading-relaxed bg-black/60 border-l-2 border-red-500 p-3 rounded-r-xl">
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coach Induction forms */}
                      <div className="border-t border-zinc-900 pt-5 mt-2">
                        {trainerInductionScheduled ? (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-4 bg-red-950/20 border border-red-500/30 rounded-2xl flex flex-col items-center justify-center gap-1.5"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500 text-green-500 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="font-display font-black text-xs uppercase tracking-widest text-white">
                              COACH INDUCTION ASSIGNED
                            </span>
                            <span className="font-sans text-[11px] text-zinc-400 mt-0.5 block">
                              Your coaching session is assigned! (+200 XP Bonus)
                            </span>
                          </motion.div>
                        ) : (
                          <form onSubmit={submitInductionQuest} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-[8px] text-red-500 font-bold uppercase tracking-widest block">
                                SECURE EQUIPMENT ACCESS
                              </span>
                              <h5 className="font-display font-bold text-xs tracking-wider text-white uppercase">
                                ASSIGN DIRECT COACH INDUCTION
                              </h5>
                              <p className="font-sans text-[10.5px] text-zinc-500 leading-relaxed">
                                Unprepared to execute load? Secure a free 1-on-1 induction with an elite coach on this machine when you start.
                              </p>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest rounded-xl font-bold transition-all shadow-lg hover:shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-red-500"
                            >
                              START TARGET INDUCTION <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        )}
                      </div>

                    </div>

                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
