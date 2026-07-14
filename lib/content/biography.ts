import fs from "fs";
import path from "path";

export function getBiography(slug: string): string | null {
  const file = path.join(process.cwd(), "content", "biographies", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf-8");
}
