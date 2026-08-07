"use client";

import { useState } from "react";
import { Search, Filter, Car, Truck, Zap, MoreVertical, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Panne } from "@/lib/types";
import ConfirmModal from "@/components/modals/confirmModal";


export type Priority = "Urgente" | "Moyenne" | "Faible";

interface PanneProps {
  pannes: Panne[],
}

export const PRIORITY_CLASSES: Record<Priority, { badge: string; dot: string; bar: string }> = {
  Urgente: { badge: "bg-red-100 text-red-700", dot: "bg-red-600 animate-pulse", bar: "bg-red-600" },
  Moyenne: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-600", bar: "bg-blue-600" },
  Faible: { badge: "bg-slate-100 text-slate-600", dot: "bg-slate-500", bar: "bg-slate-500" },
};


const ICONS: Record<string, LucideIcon> = { Car, Truck, Zap };

export default function MaintenanceTable({ pannes }: PanneProps) {
  const [search, setSearch] = useState("");

  const filtered = pannes.filter((p) =>
    `${p.car?.mark} ${p.car?.model} ${p.car?.imatriculation}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Liste des interventions</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un véhicule..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            Filtrer
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-semibold">VÉHICULE</TableHead>
              <TableHead className="text-xs font-semibold">DESCRIPTION PANNE</TableHead>
              <TableHead className="text-xs font-semibold">PRIORITÉ</TableHead>
              <TableHead className="text-xs font-semibold">COÛT ESTIMÉ</TableHead>
              <TableHead className="text-xs font-semibold">AVANCEMENT</TableHead>
              <TableHead className="text-xs font-semibold">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              // const Icon = ICONS[p.car?.photo_url];
              const priority = PRIORITY_CLASSES[p.priority];

              return (
                <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                        <img src={p.car.photo_url} alt={p.car.mark} />
                        {/* {Icon && <Icon size={20} className="text-primary" />} */}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{p.car.mark} {p.car.model} </p>
                        <p className="text-xs text-slate-500 font-mono">
                          {p.car.imatriculation} • {p.car.mark}
                          {/* {ticket.fuelType} */}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-slate-700 line-clamp-2">{p.description}</p>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit ${priority.badge}`}>
                      <span className={`w-2 h-2 rounded-full ${priority.dot}`} />
                      {p.priority}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">{p.panneAmount}</TableCell>
                  <TableCell className="min-w-[160px]">
                    {/* <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1"> */}
                    {/* <div className={`h-full ${priority.bar}`} style={{ width: `${ticket.progress}%` }} /> */}
                    <div className={`h-full `}  >{p.status} </div>
                    {/* </div> */}
                    {/* <span className="text-xs text-slate-500">{ticket.progressLabel}</span> */}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreVertical size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-slate-400">
                  Aucune intervention ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-6 border-t border-slate-200 flex justify-between items-center">
        <span className="text-sm text-slate-500">Affichage de 1-{filtered.length} sur {pannes.length} pannes</span>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft size={16} />
          </Button>
          <Button size="icon" className="h-8 w-8 bg-primary hover:bg-primary/90">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      
    </Card>
  );
}