"use client";

import { useRef, useEffect, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Site-wide 3D backdrop. A field of wireframe primitives drifts in space;
 * as the user scrolls the page the camera dollies forward through the field
 * and the whole cluster rotates — so the site feels like it's flying through
 * a techy lattice. Renders behind all content (pointer-events-none, -z-10) on
 * a transparent canvas so the dark body background shows through.
 */

// Brand-aligned palette: red + warm orange accent + cool steel.
const RED = "#ef5350";
const ORANGE = "#f5a142";
const STEEL = "#6b7a99";
const LIGHT = "#c7cdd6";

type Shape = {
  geom: "ico" | "torus" | "knot" | "octa" | "dodeca" | "box";
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  rotSpeed: number;
};

// Hand-placed so shapes spread across depth without clustering on the text.
const SHAPES: Shape[] = [
  {
    geom: "ico",
    position: [-4.2, 2.4, -2],
    scale: 1.1,
    color: RED,
    speed: 1.4,
    rotSpeed: 0.18,
  },
  {
    geom: "torus",
    position: [4.4, 1.2, -4],
    scale: 1.0,
    color: STEEL,
    speed: 1.1,
    rotSpeed: 0.24,
  },
  {
    geom: "knot",
    position: [3.6, -2.6, -1],
    scale: 0.7,
    color: ORANGE,
    speed: 1.6,
    rotSpeed: 0.3,
  },
  {
    geom: "octa",
    position: [-3.8, -2.2, -3],
    scale: 1.0,
    color: LIGHT,
    speed: 1.2,
    rotSpeed: 0.2,
  },
  {
    geom: "dodeca",
    position: [0.4, 3.4, -6],
    scale: 1.4,
    color: STEEL,
    speed: 0.9,
    rotSpeed: 0.15,
  },
  {
    geom: "box",
    position: [-5.2, -0.4, -7],
    scale: 1.2,
    color: RED,
    speed: 1.0,
    rotSpeed: 0.22,
  },
  {
    geom: "ico",
    position: [5.4, 3.0, -9],
    scale: 1.6,
    color: ORANGE,
    speed: 0.8,
    rotSpeed: 0.16,
  },
  {
    geom: "torus",
    position: [-1.6, -3.6, -10],
    scale: 1.3,
    color: RED,
    speed: 0.85,
    rotSpeed: 0.2,
  },
  {
    geom: "octa",
    position: [2.2, 0.6, -13],
    scale: 1.8,
    color: STEEL,
    speed: 0.7,
    rotSpeed: 0.14,
  },
  {
    geom: "knot",
    position: [-3.0, 1.8, -16],
    scale: 1.0,
    color: LIGHT,
    speed: 0.6,
    rotSpeed: 0.12,
  },
];

function Geometry({ geom }: { geom: Shape["geom"] }) {
  switch (geom) {
    case "ico":
      return <icosahedronGeometry args={[1, 0]} />;
    case "torus":
      return <torusGeometry args={[0.8, 0.28, 12, 32]} />;
    case "knot":
      return <torusKnotGeometry args={[0.7, 0.22, 80, 12]} />;
    case "octa":
      return <octahedronGeometry args={[1, 0]} />;
    case "dodeca":
      return <dodecahedronGeometry args={[1, 0]} />;
    case "box":
      return <boxGeometry args={[1.4, 1.4, 1.4]} />;
  }
}

function WireShape({ shape }: { shape: Shape }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * shape.rotSpeed;
    ref.current.rotation.y = t * shape.rotSpeed * 0.7;
  });

  return (
    <Float
      speed={shape.speed}
      rotationIntensity={0.4}
      floatIntensity={0.8}
      floatingRange={[-0.25, 0.25]}
    >
      <mesh ref={ref} position={shape.position} scale={shape.scale}>
        <Geometry geom={shape.geom} />
        <meshBasicMaterial
          color={shape.color}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

function Rig({ scroll }: { scroll: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const p = scroll.current; // 0 → 1 across the whole page
    const cam = state.camera;

    // Dolly forward through the field as the page scrolls.
    const targetZ = 9 - p * 18;
    cam.position.z += (targetZ - cam.position.z) * Math.min(1, delta * 3);

    // Subtle parallax toward the pointer for a living feel.
    const tx = state.pointer.x * 1.2;
    const ty = state.pointer.y * 0.8;
    cam.position.x += (tx - cam.position.x) * Math.min(1, delta * 2);
    cam.position.y += (ty - cam.position.y) * Math.min(1, delta * 2);
    cam.lookAt(0, 0, cam.position.z - 8);

    // Slow rotation of the whole cluster tied to scroll.
    if (group.current) {
      group.current.rotation.y = p * Math.PI * 0.6;
      group.current.rotation.z = p * Math.PI * 0.15;
    }
  });

  return (
    <group ref={group}>
      {SHAPES.map((shape, i) => (
        <WireShape key={i} shape={shape} />
      ))}
    </group>
  );
}

export function ScrollScene() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const scroll = useRef(0);

  useEffect(() => {
    setMounted(true);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
    // Skip the live scene on reduced-motion or tiny screens (perf + comfort).
    if (reduce || small) {
      setEnabled(false);
      return;
    }

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!mounted || !enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Depth haze that fades distant shapes into the dark background */}
        <fog attach="fog" args={["#0f1115", 8, 26]} />
        <Rig scroll={scroll} />
      </Canvas>
    </div>
  );
}
