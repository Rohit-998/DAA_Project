// frontend/src/components/ItemCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ItemCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gradient-to-br from-white/3 to-white/2 p-3 rounded-xl border border-white/10 shadow-md"
    >
      <div className="font-semibold text-lg">{item.name}</div>
      <div className="text-sm text-gray-300">Weight: {item.weight}</div>
      <div className="text-sm text-gray-300">Value: {item.value}</div>
    </motion.div>
  );
}
