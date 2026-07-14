"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sky, Cloud, Html, Line, OrbitControls, Stars, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { useUniverse, type UniverseMode } from "@/components/providers/UniverseProvider";
import type { Edge3D, Node3D } from "@/lib/graph/layout3d";
import type { SceneMode } from "@/components/universe3d/SceneConfigProvider";

const SKY: Record<
  UniverseMode,
  { sun: [number, number, number]; fog: string; sand: string; ambient: number; stars?: boolean }
> = {
  "breaking-bad": { sun: [1, 0.08, -0.35], fog: "#1a1008", sand: "#8a6840", ambient: 0.35 },
  "better-call-saul": { sun: [0.85, 0.14, -0.28], fog: "#3d2817", sand: "#b08858", ambient: 0.42 },
  "el-camino": { sun: [0.2, 0.15, -0.5], fog: "#1a1a1a", sand: "#5a5550", ambient: 0.18, stars: true },
};

const DUNES: [number, number, number, number, number, number][] = [
  [-6, -1.9, -7, 14, 2.4, 6],
  [5, -2.2, -9, 16, 2.7, 7],
  [0, -2.5, -12, 20, 3, 9],
  [-9, -1.7, -15, 12, 2.1, 5],
  [8, -2, -18, 13, 2.5, 6],
  [-3, -2.8, -22, 24, 3.2, 10],
  [12, -1.5, -25, 10, 1.8, 4],
  [-14, -1.4, -30, 8, 1.6, 3],
];

function Dune({ x, y, z, sx, sy, sz, color }: { x: number; y: number; z: number; sx: number; sy: number; sz: number; color: string }) {
  return (
    <mesh position={[x, y, z]} scale={[sx, sy, sz]} receiveShadow>
      <sphereGeometry args={[1, 28, 14, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
      <meshStandardMaterial color={color} roughness={0.98} metalness={0.01} />
    </mesh>
  );
}

function Highway() {
  return (
    <group position={[0, -2.48, -6]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 60]} />
        <meshStandardMaterial color="#1a1510" roughness={0.9} />
      </mesh>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[0, 0.01, -i * 3 + 10]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.15, 1.2]} />
          <meshStandardMaterial color="#ffd54a" emissive="#ffd54a" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function AlbuquerqueGlow() {
  return (
    <mesh position={[0, 0.5, -45]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 8]} />
      <meshBasicMaterial color="#ff8844" transparent opacity={0.15} />
    </mesh>
  );
}

function CitySilhouette() {
  const buildings = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        x: (i - 12) * 2.8 + (Math.random() - 0.5) * 1.5,
        h: 1.5 + Math.random() * 4,
        w: 1.2 + Math.random() * 1.5,
      })),
    [],
  );
  return (
    <group position={[0, -2.5, -42]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, 0]} scale={[b.w, b.h, 1]}>
          <boxGeometry />
          <meshStandardMaterial color="#0a0806" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function RVModel() {
  return (
    <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.15}>
      <group position={[7, -0.3, -8]} rotation={[0, -0.35, 0]}>
        <mesh scale={[2.8, 1.4, 1.1]}>
          <boxGeometry />
          <meshStandardMaterial color="#d4c4a8" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[-1.6, 0.35, 0]} scale={[0.7, 0.9, 0.85]}>
          <boxGeometry />
          <meshStandardMaterial color="#a89878" />
        </mesh>
        <mesh position={[1.2, -0.5, 0.6]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[-1.2, -0.5, 0.6]}>
          <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.85, 0]} scale={[0.4, 0.5, 0.4]}>
          <boxGeometry />
          <meshStandardMaterial color="#88ccff" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function MoneyBarrels() {
  return (
    <group position={[-5, -1.8, -10]}>
      {[0, 0.8, 1.6].map((x, i) => (
        <mesh key={i} position={[x, 0.5, i * 0.3]} rotation={[0, i * 0.4, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 1, 12]} />
          <meshStandardMaterial color="#2a5018" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PollosSign() {
  return (
    <group position={[-10, 0, -14]} rotation={[0, 0.3, 0]}>
      <mesh position={[0, 1.2, 0]} scale={[2.5, 1.2, 0.15]}>
        <boxGeometry />
        <meshStandardMaterial color="#ffd54a" emissive="#ffd54a" emissiveIntensity={0.2} />
      </mesh>
      <Text position={[0, 1.2, 0.1]} fontSize={0.35} color="#1a1008" anchorX="center" anchorY="middle">
        POLLos
      </Text>
    </group>
  );
}

function CrystalCluster({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.25;
  });
  return (
    <group ref={ref} position={[0, 1.5, -3]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.sin(i * 2) * 0.4, i * 0.2, Math.cos(i * 2) * 0.3]} scale={0.25 + i * 0.05}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.05} metalness={0.95} transparent opacity={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function DustCloud({ count = 600, color }: { count?: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = Math.random() * 10 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 35 - 8;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      pos[i * 3] += 0.015 + Math.sin(t + i) * 0.003;
      if (pos[i * 3] > 20) pos[i * 3] = -20;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color={color} transparent opacity={0.28} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function GraphNode({ node, onSelect }: { node: Node3D; onSelect: (href: string) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = node.y + Math.sin(clock.elapsedTime + node.x) * 0.08;
  });

  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.href);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.35 : 1}
      >
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 1.2 : 0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {(hovered || node.type === "character") && (
        <Html distanceFactor={12} center style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded bg-black/85 px-2 py-0.5 font-display text-xs tracking-wider text-white">
            {node.title}
          </div>
        </Html>
      )}
    </group>
  );
}

function GraphEdges({ nodes, edges }: { nodes: Node3D[]; edges: Edge3D[] }) {
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <>
      {edges.map((edge) => {
        const a = byId.get(edge.source);
        const b = byId.get(edge.target);
        if (!a || !b) return null;
        return (
          <Line
            key={edge.id}
            points={[
              [a.x, a.y, a.z],
              [b.x, b.y, b.z],
            ]}
            color={edge.animated ? "#9dff4d" : "#6b5a48"}
            lineWidth={edge.animated ? 2 : 1}
            transparent
            opacity={0.55}
          />
        );
      })}
    </>
  );
}

function OrbitNodes({ nodes, onSelect }: { nodes: Node3D[]; onSelect: (href: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -1]}>
      {nodes.map((node) => (
        <Float key={node.id} speed={1.5} floatIntensity={0.4}>
          <group position={[node.x, node.y, node.z]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(node.href);
              }}
              scale={1.2}
            >
              <sphereGeometry args={[0.35, 20, 20]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.7} roughness={0.2} metalness={0.5} />
            </mesh>
            <Html distanceFactor={8} position={[0, 0.7, 0]} center>
              <div className="cursor-pointer whitespace-nowrap rounded border border-white/20 bg-black/80 px-2 py-1 font-display text-sm tracking-wider text-white hover:border-heisenberg">
                {node.title.split(" ")[0]}
              </div>
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}

function DesertCamera() {
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
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 1.2, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.2 + mouse.current.y * 0.35, 0.025);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.5, 0.02);
    camera.lookAt(0, 0.8 + Math.sin(t * 0.08) * 0.1, -6);
  });

  return null;
}

function GraphCamera() {
  return <OrbitControls enablePan enableZoom minDistance={4} maxDistance={28} autoRotate autoRotateSpeed={0.35} />;
}

export type UniverseSceneProps = {
  mode: SceneMode;
  orbitNodes?: Node3D[];
  graphNodes?: Node3D[];
  graphEdges?: Edge3D[];
  interactive?: boolean;
};

export function UniverseSceneContent({
  mode,
  orbitNodes = [],
  graphNodes = [],
  graphEdges = [],
  interactive,
}: UniverseSceneProps) {
  const { universe } = useUniverse();
  const router = useRouter();
  const cfg = SKY[universe];
  const crystalColor = universe === "breaking-bad" ? "#4fc3f7" : universe === "better-call-saul" ? "#ffd54a" : "#aaa";
  const isGraph = mode === "graph" || mode === "world";
  const showDesert = mode !== "graph" || graphNodes.length < 5;
  const onSelect = (href: string) => router.push(href);

  return (
    <>
      <color attach="background" args={[cfg.fog]} />
      <fog attach="fog" args={[cfg.fog, isGraph ? 12 : 8, isGraph ? 55 : 45]} />

      {cfg.stars && <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={0.5} />}

      {!isGraph && (
        <Sky
          distance={450000}
          sunPosition={cfg.sun}
          inclination={0.55}
          azimuth={0.2}
          mieCoefficient={0.005}
          mieDirectionalG={0.92}
          rayleigh={2.5}
          turbidity={10}
        />
      )}

      <ambientLight intensity={cfg.ambient} />
      <directionalLight position={[cfg.sun[0] * 25, cfg.sun[1] * 25 + 8, cfg.sun[2] * 25]} intensity={1.8} color="#ffaa55" castShadow />
      <pointLight position={[0, 4, -4]} intensity={0.6} color={crystalColor} />
      <pointLight position={[-8, 2, -12]} intensity={0.3} color="#ffd54a" />

      {showDesert && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -10]} receiveShadow>
            <planeGeometry args={[120, 120]} />
            <meshStandardMaterial color={cfg.sand} roughness={1} />
          </mesh>
          {DUNES.map(([x, y, z, sx, sy, sz], i) => (
            <Dune key={i} x={x} y={y} z={z} sx={sx} sy={sy} sz={sz} color={cfg.sand} />
          ))}
          <Highway />
          <AlbuquerqueGlow />
          <CitySilhouette />
          {(mode === "home" || mode === "world") && <RVModel />}
          {(mode === "home" || mode === "world") && <MoneyBarrels />}
          {universe === "breaking-bad" && mode === "home" && <PollosSign />}
          {(mode === "home" || mode === "world") && <CrystalCluster color={crystalColor} />}
          <DustCloud color={universe === "el-camino" ? "#888" : "#e8c898"} />
          {universe === "better-call-saul" && (
            <>
              <Cloud position={[-10, 5, -18]} speed={0.15} opacity={0.35} color="#ffd54a" />
              <Cloud position={[12, 4, -22]} speed={0.1} opacity={0.2} color="#fff8eb" />
            </>
          )}
        </>
      )}

      {orbitNodes.length > 0 && (mode === "home" || mode === "world") && (
        <OrbitNodes nodes={orbitNodes} onSelect={onSelect} />
      )}

      {graphNodes.length > 0 && (mode === "graph" || mode === "world" || mode === "home") && (
        <>
          <GraphEdges nodes={graphNodes} edges={graphEdges} />
          {graphNodes.map((node) => (
            <GraphNode key={node.id} node={node} onSelect={onSelect} />
          ))}
        </>
      )}

      {isGraph || interactive ? <GraphCamera /> : <DesertCamera />}
    </>
  );
}
