import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata = { title: "Easter Eggs" };

export default function EasterEggsPage() {
  const dir = path.join(process.cwd(), "content", "easter-eggs");
  const eggs = fs.existsSync(dir)
    ? fs.readdirSync(dir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")))
    : [];

  return (
    <div>
      <h1 className="text-3xl font-bold">Easter Eggs</h1>
      <p className="mt-2 text-muted">References, callbacks, hidden details, visual motifs</p>
      <ul className="mt-8 space-y-4">
        {eggs.map((egg: { id: string; title: string; summary?: string }) => (
          <li key={egg.id} className="rounded-lg border border-border p-4">
            <h2 className="font-bold">{egg.title}</h2>
            {egg.summary && <p className="mt-1 text-sm text-muted">{egg.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
