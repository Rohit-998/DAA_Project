// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./components/ItemCard";
import KnapsackView from "./components/KnapsackView";
import SortVisualizer from "./components/SortVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";

export default function App() {
  const [items, setItems] = useState([]);
  const [capacity, setCapacity] = useState(10);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setItems(res.data);
      } catch (e) {
        console.error("err loading items", e);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎒 Game Inventory Optimizer</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">Items</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.map((it, idx) => (
                <ItemCard key={idx} item={it} />
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl">
            <KnapsackView items={items} capacity={capacity} setCapacity={setCapacity} />
          </div>
        </div>

        <div className="space-y-4">
          <SortVisualizer items={items} />
          <SearchVisualizer items={items} />
        </div>
      </section>
    </div>
  );
}
