"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useUniverse } from "@/components/providers/UniverseProvider";

const PALETTE = {
  "breaking-bad": { crystal: "#4fc3f7", glow: "#7cfc00", particle: "#7cfc00" },
  "better-call-saul": { crystal: "#f5c518", glow: "#ff9800", particle: "#f5c518" },
  "el-camino": { crystal: "#a3a3a3", glow: "#e5e5e5", particle: "#737373" },
};

function Crystal({ color, position, scale }: { color: string; position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function ConnectionNodes({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const theta = (i / 12) * Math.PI * 2;
      const r = 3.5 + Math.random() * 1.5;
      pts.push([Math.cos(theta) * r, (Math.random() - 0.5) * 2, Math.sin(theta) * r - 2]);
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group}>
      {positions.map((pos, i) => (
        <Crystal key={i} color={color} position={pos} scale={0.15 + (i % 3) * 0.05} />
      ))}
    </group>
  );
}

function Scene() {
  const { universe } = useUniverse();
  const colors = PALETTE[universe];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={colors.glow} />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color={colors.crystal} />
      <Crystal color={colors.crystal} position={[0, 0, -1]} scale={0.55} />
      <ConnectionNodes color={colors.crystal} />
      <Stars radius={40} depth={30} count={800} factor={3} saturation={0.2} fade speed={0.5} />
    </>
  );
}

export function UniverseScene({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
