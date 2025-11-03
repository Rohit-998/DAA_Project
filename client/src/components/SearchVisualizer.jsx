// frontend/src/components/SearchVisualizer.jsx
import React, { useState } from "react";
import axios from "axios";

export default function SearchVisualizer({ items }) {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState(null);

  const search = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/search", {
        name: query,
        items,
      });
      setFound(res.data && Object.keys(res.data).length ? res.data : null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white/5 p-3 rounded-2xl">
      <h3 className="font-semibold">Search</h3>
      <div className="flex gap-2 mt-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search by name" className="flex-1 bg-white/5 px-2 rounded" />
        <button onClick={search} className="px-3 bg-sky-600 rounded">Find</button>
      </div>

      <div className="mt-3">
        {found ? (
          <div className="p-2 bg-white/3 rounded">
            <div className="font-medium">{found.name}</div>
            <div className="text-sm">W: {found.weight} | V: {found.value}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-300">No item found</div>
        )}
      </div>
    </div>
  );
}
