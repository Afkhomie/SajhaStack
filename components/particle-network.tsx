"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 90;
const CONNECTION_DISTANCE = 3;
const BOUNDS = 10;
// Cap drawn connections — a full N² buffer (135k floats) is wasteful since
// only a fraction of pairs are ever within CONNECTION_DISTANCE.
const MAX_LINES = PARTICLE_COUNT * 14;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 0.8;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return vel;
  }, []);

  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 6), []);

  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 6), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      for (let axis = 0; axis < 3; axis++) {
        const bound = axis === 2 ? BOUNDS * 0.4 : BOUNDS;
        if (Math.abs(posArray[i * 3 + axis]) > bound) {
          velocities[i * 3 + axis] *= -1;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    let lineIndex = 0;
    for (let i = 0; i < PARTICLE_COUNT && lineIndex < MAX_LINES; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_LINES; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;

          linePositions[lineIndex * 6] = posArray[i * 3];
          linePositions[lineIndex * 6 + 1] = posArray[i * 3 + 1];
          linePositions[lineIndex * 6 + 2] = posArray[i * 3 + 2];
          linePositions[lineIndex * 6 + 3] = posArray[j * 3];
          linePositions[lineIndex * 6 + 4] = posArray[j * 3 + 1];
          linePositions[lineIndex * 6 + 5] = posArray[j * 3 + 2];

          lineColors[lineIndex * 6] = alpha * 0.9;
          lineColors[lineIndex * 6 + 1] = alpha * 0.2;
          lineColors[lineIndex * 6 + 2] = alpha * 0.2;
          lineColors[lineIndex * 6 + 3] = alpha * 0.9;
          lineColors[lineIndex * 6 + 4] = alpha * 0.2;
          lineColors[lineIndex * 6 + 5] = alpha * 0.2;

          lineIndex++;
        }
      }
    }

    for (let i = lineIndex * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    const lineGeom = linesRef.current.geometry;
    lineGeom.attributes.position.needsUpdate = true;
    lineGeom.attributes.color.needsUpdate = true;
    lineGeom.setDrawRange(0, lineIndex * 2);

    camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.015;
    camera.position.y += (mouseRef.current.y * 0.8 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#c7cdd6"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={MAX_LINES * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={MAX_LINES * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.35} />
      </lineSegments>
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles />
    </>
  );
}

export function ParticleNetwork() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220_18%_9%)] via-[hsl(220_18%_7%)] to-[hsl(220_18%_6%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(220,38,38,0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(251,146,60,0.05)_0%,_transparent_50%)]" />

      {/* Three.js canvas — skipped when the user prefers reduced motion */}
      {!reduced && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
}
