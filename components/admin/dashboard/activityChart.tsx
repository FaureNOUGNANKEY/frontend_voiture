"use client";

import { useEffect, useState } from "react";

const weeklyActivity = [
  { day: "Lun", value: 40, count: 24 },
  { day: "Mar", value: 65, count: 39 },
  { day: "Mer", value: 55, count: 33 },
  { day: "Jeu", value: 90, count: 54 },
  { day: "Ven", value: 75, count: 45 },
  { day: "Sam", value: 85, count: 51 },
  { day: "Dim", value: 60, count: 36 },
];

export default function ActivityChart() {
  // Animation d'entrée: les barres partent de 0% puis montent à leur valeur
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-slate-900">
          Activité des Réservations
        </h3>
        <select className="border-none bg-slate-100 rounded-lg text-sm font-semibold px-4 py-2 focus:ring-0">
          <option>This Week</option>
          <option>Previous Week</option>
        </select>
      </div>

      <div className="flex items-end justify-between h-64 gap-2 pt-4 px-2">
        {weeklyActivity.map((item) => (
          <div
            key={item.day}
            className="flex-1 bg-primary/20 rounded-t-lg relative group hover:bg-primary transition-[height,background-color] duration-700 ease-out"
            style={{ height: animated ? `${item.value}%` : "0%" }}
          >
            <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
              {item.count} Res
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-slate-500 text-xs font-semibold px-2">
        {weeklyActivity.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
    </div>
  );
}
