"use client";

import { motion } from "framer-motion";

const STEPS = [
  { label: "Cook", desc: "99.1% pure blue meth production" },
  { label: "Distribution", desc: "Los Pollos network, street dealers" },
  { label: "Storage", desc: "Superlab, warehouses, RV" },
  { label: "Money", desc: "Cash piles, offshore accounts" },
  { label: "Laundering", desc: "Car wash, nail salon, pest control" },
  { label: "Investment", desc: "Legitimate business fronts" },
];

export default function DrugEmpirePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Drug Empire Flow</h1>
      <p className="mt-2 text-muted">Animated supply chain from cook to investment</p>

      <div className="mx-auto mt-16 flex max-w-lg flex-col items-center gap-4">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="w-64 rounded-xl border-2 border-heisenberg bg-heisenberg/10 p-4 text-center"
            >
              <p className="text-lg font-bold">{step.label}</p>
              <p className="mt-1 text-sm text-muted">{step.desc}</p>
            </motion.div>
            {i < STEPS.length - 1 && (
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-2xl text-heisenberg"
              >
                ↓
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
