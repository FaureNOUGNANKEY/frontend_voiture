"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type FleetStatus = "Disponible" | "Loué" | "Maintenance";

export type FleetVehicle = {
  id: string;
  model: string;
  year: string;
  plate: string;
  imageUrl: string;
  status: FleetStatus;
  user: string | null;
  userAvatar?: string;
  mileage: string;
  nextService: string;
};

export const fleet: FleetVehicle[] = [
  {
    id: "v1",
    model: "VW Golf 8",
    year: "2024",
    plate: "ABC-123-XY",
    imageUrl:
      "https://images.unsplash.com/photo-1471479917193-f00955256257?w=200&h=140&fit=crop",
    status: "Disponible",
    user: null,
    mileage: "12 450 km",
    nextService: "15 Oct 2024",
  },
  {
    id: "v2",
    model: "BMW Série 3",
    year: "2023",
    plate: "EFG-456-ZZ",
    imageUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=140&fit=crop",
    status: "Loué",
    user: "Jean Dupont",
    userAvatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop",
    mileage: "45 890 km",
    nextService: "02 Sep 2024",
  },
  {
    id: "v3",
    model: "Peugeot 3008",
    year: "2022",
    plate: "HIJ-789-AA",
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=140&fit=crop",
    status: "Maintenance",
    user: null,
    mileage: "78 210 km",
    nextService: "28 Aoû 2024",
  },
];

const STATUS_CLASSES: Record<FleetStatus, string> = {
  Disponible: "bg-emerald-100 text-emerald-700",
  Loué: "bg-blue-100 text-blue-900",
  Maintenance: "bg-amber-100 text-amber-700",
};

export default function FleetTable() {
  const [search, setSearch] = useState("");

  const filtered = fleet.filter((v) =>
    `${v.model} ${v.plate}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 flex justify-between items-center border-b border-slate-200 bg-white">
        <h3 className="text-lg font-semibold text-slate-900">
          Suivi de la Flotte Active
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un véhicule..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white w-64
              focus:ring-1 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <button
            type="button"
            className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-tight">
              <th className="px-6 py-4">Véhicule</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Utilisateur</th>
              <th className="px-6 py-4">Kilométrage</th>
              <th className="px-6 py-4">Prochaine Révision</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 bg-slate-100 rounded overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {vehicle.model} ({vehicle.year})
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {vehicle.plate}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold ${STATUS_CLASSES[vehicle.status]}`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {vehicle.user ? (
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={vehicle.userAvatar}
                          alt={vehicle.user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-slate-900">{vehicle.user}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">-</p>
                  )}
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-500">
                  {vehicle.mileage}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  {vehicle.nextService}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      className="text-primary/40 hover:text-primary"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-900"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-sm text-slate-400"
                >
                  Aucun véhicule ne correspond à votre recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
        <span className="text-sm text-slate-500">
          Affichage 1-{filtered.length} sur 142 véhicules
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            className="p-1 border border-slate-200 rounded hover:bg-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-primary bg-primary text-white rounded text-sm font-semibold"
          >
            1
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-slate-200 hover:bg-white rounded text-sm font-semibold"
          >
            2
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-slate-200 hover:bg-white rounded text-sm font-semibold"
          >
            3
          </button>
          <button
            type="button"
            className="p-1 border border-slate-200 rounded hover:bg-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
