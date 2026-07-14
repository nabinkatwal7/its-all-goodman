"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type ExploreItem = {
  href: string;
  label: string;
  tag: string;
  color: string;
};

function TiltCard({ item }: { item: ExploreItem }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
      <Link
        ref={ref}
        href={item.href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="explore-tile universe-card group relative block overflow-hidden rounded-lg p-5"
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}22, transparent 70%)` }}
        />
        <span
          className="font-display text-3xl"
          style={{ color: item.color }}
        >
          {item.tag}
        </span>
        <p className="mt-2 font-medium text-foreground">{item.label}</p>
        <p className="mt-1 text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
          enter →
        </p>
      </Link>
    </motion.div>
  );
}

export function ExploreGrid({ items }: { items: ExploreItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <TiltCard key={item.href} item={item} />
      ))}
    </div>
  );
}

export function FloatingCharacterOrbit({
  characters,
}: {
  characters: { slug: string; name: string; color: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative mx-auto h-64 w-full max-w-md">
      {characters.map((c, i) => {
        const angle = ((i - active) / characters.length) * Math.PI * 2;
        const x = Math.sin(angle) * 120;
        const z = Math.cos(angle) * 40;
        const scale = 0.7 + (Math.cos(angle) + 1) * 0.25;
        const opacity = 0.4 + (Math.cos(angle) + 1) * 0.3;

        return (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}`}
            onMouseEnter={() => setActive(i)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${z * 0.3}px)) scale(${scale})`,
              opacity,
              zIndex: Math.round(scale * 10),
            }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 font-display text-xl text-white shadow-lg"
              style={{
                borderColor: c.color,
                background: `linear-gradient(135deg, ${c.color}, ${c.color}88)`,
                boxShadow: `0 0 20px ${c.color}55`,
              }}
            >
              {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <p className="mt-1 text-center text-xs font-medium">{c.name.split(" ")[0]}</p>
          </Link>
        );
      })}
    </div>
  );
}
