"use client";

import Link from "next/link";
import { useState } from "react";

type DeathRow = {
  id: string;
  href: string;
  title: string;
  method: string;
  killer?: { title: string; href: string };
  episode: { title: string; href: string };
};

export function DeathsDatabase({ deaths }: { deaths: DeathRow[] }) {
  const [method, setMethod] = useState("");
  const methods = [...new Set(deaths.map((d) => d.method))].sort();
  const filtered = deaths.filter((d) => !method || d.method === method);

  return (
    <div>
      <h1 className="text-3xl font-bold">Death Database</h1>
      <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-4 rounded border border-border bg-card px-3 py-2 text-sm">
        <option value="">All methods</option>
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted">
            <th className="py-2">Victim</th>
            <th>Killer</th>
            <th>Method</th>
            <th>Episode</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id} className="border-b border-border/50">
              <td className="py-2"><Link href={d.href} className="hover:text-accent">{d.title}</Link></td>
              <td>{d.killer ? <Link href={d.killer.href} className="text-accent hover:underline">{d.killer.title}</Link> : "—"}</td>
              <td>{d.method}</td>
              <td><Link href={d.episode.href} className="text-accent hover:underline">{d.episode.title}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
