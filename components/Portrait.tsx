import type { Character } from "@/lib/schemas/entity";
import { cn } from "@/lib/utils";

type PortraitProps = {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
  xl: "h-32 w-32 text-3xl",
};

export function Portrait({ name, color = "#2d5016", size = "md", className }: PortraitProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-inner",
        sizes[size],
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -30)} 100%)`,
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function CharacterPortrait({
  character,
  size = "md",
}: {
  character: Character;
  size?: PortraitProps["size"];
}) {
  return (
    <Portrait
      name={character.name}
      color={character.portraitColor}
      size={size}
    />
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
