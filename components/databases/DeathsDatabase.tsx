"use client";

import Link from "next/link";
import { entityHref, type Death } from "@/lib/schemas/entity";
import { EntityLinkById } from "@/components/EntityLinkById";
import { useState } from "react";

export function DeathsDatabase({ deaths }: { deaths: Death[] }) {
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
              <td className="py-2"><Link href={entityHref(d)} className="hover:text-accent">{d.title}</Link></td>
              <td>{d.killerId ? <EntityLinkById id={d.killerId} /> : "—"}</td>
              <td>{d.method}</td>
              <td><EntityLinkById id={d.episodeId} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
