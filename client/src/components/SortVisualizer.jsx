
import React, { useState } from "react";
import axios from "axios";

export default function SortVisualizer({ items }) {
  const [sorted, setSorted] = useState([]);
  const [key, setKey] = useState("value");

  const sortNow = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/sort", {
        key,
        items,
      });
      setSorted(res.data);
    } catch (e) {
      console.error("Sorting failed:", e);
      alert("Error while sorting items!");
    }
  };

  return (
    <div className="bg-white/5 p-3 rounded-2xl">
      <h3 className="font-semibold">Sort Visualizer (Merge Sort)</h3>
      <div className="flex gap-2 mt-2">
        <select
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="bg-white/5 px-2 rounded"
        >
          <option value="value">Value</option>
          <option value="weight">Weight</option>
        </select>

        <button
          onClick={sortNow}
          className="ml-auto px-3 bg-emerald-600 rounded"
        >
          Sort
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {(sorted.length ? sorted : items).map((it, i) => (
          <div key={i} className="p-2 bg-white/3 rounded">
            {it.name} — {it[key]}
          </div>
        ))}
      </div>
    </div>
  );
}
