"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Cloud } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useUniverse, type UniverseMode } from "@/components/providers/UniverseProvider";

const SKY: Record<
  UniverseMode,
  { sun: [number, number, number]; fog: string; sand: string; ambient: number }
> = {
  "breaking-bad": {
    sun: [1, 0.06, -0.4],
    fog: "#3d2817",
    sand: "#9a7348",
    ambient: 0.35,
  },
  "better-call-saul": {
    sun: [0.8, 0.12, -0.3],
    fog: "#5c3d1e",
    sand: "#c4956a",
    ambient: 0.45,
  },
  "el-camino": {
    sun: [0.3, 0.2, -0.5],
    fog: "#2a2a2a",
    sand: "#6b6560",
    ambient: 0.25,
  },
};

const DUNES: [number, number, number, number, number, number][] = [
  [-5, -1.8, -6, 12, 2.2, 5],
  [4, -2.1, -8, 14, 2.5, 6],
  [0, -2.4, -11, 18, 2.8, 8],
  [-8, -1.6, -14, 10, 2, 4],
  [7, -1.9, -16, 11, 2.3, 5],
  [-2, -2.6, -20, 22, 3, 9],
];

function Dune({
  x,
  y,
  z,
  sx,
  sy,
  sz,
  color,
}: {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  color: string;
}) {
  return (
    <mesh position={[x, y, z]} scale={[sx, sy, sz]} receiveShadow>
      <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0.02} />
    </mesh>
  );
}

function Mesas({ muted }: { muted: boolean }) {
  const color = muted ? "#1a1a1a" : "#1a0f08";
  return (
    <>
      <mesh position={[-12, 1, -28]} scale={[4, 6, 2]}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-10, 2.5, -28]} scale={[2, 3, 1.5]}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[14, 0.8, -32]} scale={[6, 4, 2.5]}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[16, 2, -32]} scale={[3, 4, 2]}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

function RVSilhouette() {
  return (
    <group position={[6, -0.5, -9]} rotation={[0, -0.4, 0]}>
      <mesh scale={[2.2, 1.2, 1]}>
        <boxGeometry />
        <meshStandardMaterial color="#2a1810" roughness={1} />
      </mesh>
      <mesh position={[-1.4, 0.3, 0]} scale={[0.5, 0.8, 0.8]}>
        <boxGeometry />
        <meshStandardMaterial color="#1a1008" />
      </mesh>
    </group>
  );
}

function DustCloud({ count = 400, color }: { count?: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 8 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      pos[i * 3] += 0.012 + Math.sin(t + i) * 0.002;
      if (pos[i * 3] > 15) pos[i * 3] = -15;
      pos[i * 3 + 1] += Math.sin(t * 0.5 + i * 0.1) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={color} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function CrystalMeth({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={ref} position={[0, 1.2, -4]} scale={0.35}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.6, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.8 + mouse.current.y * 0.2, 0.02);
    camera.lookAt(0, 0.5 + Math.sin(t * 0.1) * 0.05, -8);
  });

  return null;
}

function DesertSceneContent({ hero }: { hero?: boolean }) {
  const { universe } = useUniverse();
  const cfg = SKY[universe];
  const crystalColor =
    universe === "breaking-bad" ? "#4fc3f7" : universe === "better-call-saul" ? "#f5c518" : "#888";

  return (
    <>
      <color attach="background" args={[cfg.fog]} />
      <fog attach="fog" args={[cfg.fog, 6, 38]} />
      <Sky
        distance={450000}
        sunPosition={cfg.sun}
        inclination={0.52}
        azimuth={0.22}
        mieCoefficient={0.004}
        mieDirectionalG={0.9}
        rayleigh={2}
        turbidity={8}
      />
      <ambientLight intensity={cfg.ambient} />
      <directionalLight
        position={[cfg.sun[0] * 20, cfg.sun[1] * 20 + 5, cfg.sun[2] * 20]}
        intensity={1.4}
        color="#ffaa55"
      />
      <pointLight position={[0, 3, -5]} intensity={0.4} color={crystalColor} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -8]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={cfg.sand} roughness={1} />
      </mesh>

      {DUNES.map(([x, y, z, sx, sy, sz], i) => (
        <Dune key={i} x={x} y={y} z={z} sx={sx} sy={sy} sz={sz} color={cfg.sand} />
      ))}

      <Mesas muted={universe === "el-camino"} />
      {hero && <RVSilhouette />}
      {hero && <CrystalMeth color={crystalColor} />}

      <DustCloud color={universe === "el-camino" ? "#888" : "#d4a574"} />

      {universe === "better-call-saul" && (
        <Cloud position={[-8, 4, -15]} speed={0.2} opacity={0.25} color="#f5c518" />
      )}

      <CameraRig />
    </>
  );
}

type DesertEnvironmentProps = {
  hero?: boolean;
  className?: string;
};

export function DesertEnvironment({ hero, className = "" }: DesertEnvironmentProps) {
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 1.8, 5], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <DesertSceneContent hero={hero} />
        </Suspense>
      </Canvas>
    </div>
  );
}
