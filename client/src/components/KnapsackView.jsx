// frontend/src/components/KnapsackView.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function KnapsackView({ items, capacity, setCapacity }) {
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  const runKnap = async () => {
    setRunning(true);
    try {
      const res = await axios.post("http://localhost:5000/api/knapsack", {
        capacity: parseInt(capacity, 10),
        items,
      });
      setResult(res.data);

      // quick gsap pop animation for result
      gsap.fromTo(
        ".knap-result",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Knapsack Optimizer</h3>
      <div className="flex items-center gap-2 mt-2">
        <label className="text-sm">Capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="w-24 bg-white/5 rounded px-2 py-1"
        />
        <button
          onClick={runKnap}
          disabled={running}
          className="ml-2 px-3 py-1 bg-purple-600 rounded hover:brightness-110"
        >
          {running ? "Running..." : "Optimize"}
        </button>
      </div>

      {result && (
        <motion.div
          layout
          className="knap-result mt-4 p-3 bg-white/6 rounded"
        >
          <div className="font-medium">Total value: {result.total_value}</div>
          <div className="text-sm">Total weight: {result.total_weight}</div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {result.items.map((it, idx) => (
              <div key={idx} className="p-2 bg-white/3 rounded">
                {it.name} — w:{it.weight} v:{it.value}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
