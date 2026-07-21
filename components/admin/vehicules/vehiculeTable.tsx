"use client";

import { useState } from "react";
import { Search, Filter, PlusCircle, Pencil, TriangleAlert, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  category: string;
  plate: string;
  status: VehicleStatus;
  mileage: string;
  imageUrl: string;
};

type VehicleStatus = "Disponible" | "Loué" | "En Panne";

const STATUS_CLASSES: Record<VehicleStatus, string> = {
  Disponible: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  Loué: "bg-blue-100 text-blue-900 hover:bg-blue-100",
  "En Panne": "bg-amber-100 text-amber-700 hover:bg-amber-100",
};

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    brand: "Mercedes-Benz",
    model: "Classe C 2023",
    category: "Premium",
    plate: "AA-123-BB",
    status: "Disponible",
    mileage: "12 450 km",
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&h=140&fit=crop",
  },
  {
    id: "v2",
    brand: "Peugeot",
    model: "3008 GT",
    category: "SUV",
    plate: "CC-456-DD",
    status: "Loué",
    mileage: "45 820 km",
    imageUrl:
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=200&h=140&fit=crop",
  },
  {
    id: "v3",
    brand: "Renault",
    model: "Master L2H2",
    category: "Utilitaire",
    plate: "EE-789-FF",
    status: "En Panne",
    mileage: "102 150 km",
    imageUrl:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=200&h=140&fit=crop",
  },
  {
    id: "v4",
    brand: "Tesla",
    model: "Model 3",
    category: "Électrique",
    plate: "GG-001-HH",
    status: "Disponible",
    mileage: "5 200 km",
    imageUrl:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=200&h=140&fit=crop",
  },
];

export default function VehiclesTable() {
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter((v) =>
    `${v.brand} ${v.model} ${v.plate}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-900 self-start sm:self-auto">
          Liste du Parc Automobile
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par immatriculation..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Véhicule</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Catégorie</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Immatriculation</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">État</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Kilométrage</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                className={`hover:bg-slate-50 transition-colors ${
                  vehicle.status === "En Panne" ? "bg-red-50/40" : ""
                }`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-8 rounded bg-slate-100 overflow-hidden border border-slate-200 ${
                        vehicle.status === "En Panne" ? "grayscale opacity-70" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.brand}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{vehicle.brand}</p>
                      <p className="text-xs text-slate-500">{vehicle.model}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{vehicle.category}</TableCell>
                <TableCell>
                  <code className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                    {vehicle.plate}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge className={`${STATUS_CLASSES[vehicle.status]} font-bold uppercase tracking-tight text-[10px] gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {vehicle.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-slate-700">
                  {vehicle.mileage}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                      <Pencil size={18} />
                    </Button>
                    {vehicle.status === "En Panne" ? (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        <Eye size={18} />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                        <TriangleAlert size={18} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-slate-400">
                  Aucun véhicule ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-6 bg-slate-50 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Affichage de 1-{filtered.length} sur 128 véhicules
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft size={18} />
          </Button>
          <Button size="icon" className="h-8 w-8 bg-right hover:bg-primary/90">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}