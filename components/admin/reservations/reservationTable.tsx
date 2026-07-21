"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, Pencil, Receipt, History, ShieldCheck, TriangleAlert, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PaymentStatus = "paid" | "pending" | "loyalty";
type ReservationTimelineState = "active" | "upcoming" | "completed";
 
type Driver = {
  name: string;
  status: "Active" | "Standby" | "Available";
};

type Reservation = {
  id: string;
  reference: string;
  client: {
    name: string;
    initials: string;
    subtitle: string;
    avatarColor: string;
  };
  vehicle: {
    name: string;
    subtitle: string;
  };
  timeline: {
    range: string;
    state: ReservationTimelineState;
    label: string;
  };
  financials: {
    amount: string;
    note: string;
    status: PaymentStatus;
  };
  driverAssignment:
    | { type: "select"; current: string; options: Driver[] }
    | { type: "unassigned"; options: Driver[] }
    | { type: "confirmed"; name: string };
};
 
const reservations: Reservation[] = [
  {
    id: "r1",
    reference: "#RES-2024-901",
    client: {
      name: "Jean Dupont",
      initials: "JD",
      subtitle: "Membre Fidélité Niv 4",
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
    vehicle: { name: "BMW X5 M-Sport", subtitle: "SUV • AB-123-XY" },
    timeline: { range: "24 Oct - 28 Oct", state: "active", label: "4 Jours (Actif)" },
    financials: { amount: "540,00 €", note: "-10% Fidélité appliqué", status: "loyalty" },
    driverAssignment: {
      type: "select",
      current: "Marc Lefebvre (Actif)",
      options: [
        { name: "Marc Lefebvre", status: "Active" },
        { name: "Sarah Benamra", status: "Standby" },
        { name: "Kevin Dubois", status: "Standby" },
      ],
    },
  },
  {
    id: "r2",
    reference: "#RES-2024-902",
    client: {
      name: "Sophie Martin",
      initials: "SM",
      subtitle: "Nouveau Client",
      avatarColor: "bg-slate-100 text-slate-600",
    },
    vehicle: { name: "Tesla Model 3", subtitle: "Électrique • EV-555-EL" },
    timeline: { range: "26 Oct - 27 Oct", state: "upcoming", label: "Demain (En attente)" },
    financials: { amount: "120,00 €", note: "En attente de paiement", status: "pending" },
    driverAssignment: {
      type: "unassigned",
      options: [
        { name: "Marc Lefebvre", status: "Standby" },
        { name: "Sarah Benamra", status: "Available" },
        { name: "Kevin Dubois", status: "Available" },
      ],
    },
  },
  {
    id: "r3",
    reference: "#RES-2024-885",
    client: {
      name: "Thomas Leroy",
      initials: "TL",
      subtitle: "Compte Entreprise",
      avatarColor: "bg-amber-100 text-amber-700",
    },
    vehicle: { name: "Peugeot 3008 Hybrid", subtitle: "SUV Compact • FR-777-GH" },
    timeline: { range: "20 Oct - 25 Oct", state: "completed", label: "Terminé" },
    financials: { amount: "1 450,00 €", note: "Payé (Stripe)", status: "paid" },
    driverAssignment: { type: "confirmed", name: "Kevin Dubois" },
  },
];

const TIMELINE_CLASSES: Record<Reservation["timeline"]["state"], string> = {
  active: "text-emerald-600",
  upcoming: "text-blue-900",
  completed: "text-slate-400",
};

const FINANCIAL_CLASSES: Record<Reservation["financials"]["status"], string> = {
  paid: "text-emerald-600",
  pending: "text-red-600 italic",
  loyalty: "text-emerald-600",
};

export default function ReservationsTable() {
  const [search, setSearch] = useState("");

  const filtered = reservations.filter((r) =>
    `${r.client.name} ${r.reference} ${r.vehicle.name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Card className="shadow-sm overflow-hidden mb-8">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50 flex-wrap">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par client, ID ou véhicule..."
            className="pl-10 bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={18} />
            Exporter CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-semibold uppercase">ID Réservation</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Client</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Véhicule</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Période</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Finances</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Chauffeur</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id} className="hover:bg-slate-50 transition-colors group">
                <TableCell>
                  <span className="font-mono text-xs text-primary bg-blue-50 px-2 py-1 rounded">
                    {r.reference}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${r.client.avatarColor}`}
                    >
                      {r.client.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{r.client.name}</div>
                      <div className="text-[11px] text-slate-500">{r.client.subtitle}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="font-semibold text-slate-900 text-sm">{r.vehicle.name}</div>
                  <div className="text-[11px] text-slate-500">{r.vehicle.subtitle}</div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-900">{r.timeline.range}</span>
                    <span className={`text-[11px] font-semibold ${TIMELINE_CLASSES[r.timeline.state]}`}>
                      {r.timeline.label}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="font-bold text-slate-900 text-sm">{r.financials.amount}</div>
                  <div className={`flex items-center gap-1 text-[11px] font-semibold ${FINANCIAL_CLASSES[r.financials.status]}`}>
                    {r.financials.status === "loyalty" && <BadgeCheck size={12} />}
                    {r.financials.note}
                  </div>
                </TableCell>

                <TableCell>
                  {r.driverAssignment.type === "select" && (
                    <Select defaultValue={r.driverAssignment.current}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {r.driverAssignment.options.map((d) => (
                          <SelectItem key={d.name} value={`${d.name} (${d.status})`}>
                            {d.name} ({d.status === "Active" ? "Actif" : d.status === "Standby" ? "En attente" : "Disponible"})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {r.driverAssignment.type === "unassigned" && (
                    <div className="relative">
                      <Select>
                        <SelectTrigger className="w-full bg-red-50 border-red-300 text-red-700 font-semibold">
                          <SelectValue placeholder="NON ASSIGNÉ" />
                        </SelectTrigger>
                        <SelectContent>
                          {r.driverAssignment.options.map((d) => (
                            <SelectItem key={d.name} value={`${d.name} (${d.status})`}>
                              {d.name} ({d.status === "Active" ? "Actif" : d.status === "Standby" ? "En attente" : "Disponible"})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <TriangleAlert size={16} className="absolute right-8 top-1/2 -translate-y-1/2 text-red-600 pointer-events-none" />
                    </div>
                  )}

                  {r.driverAssignment.type === "confirmed" && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-sm border border-slate-200 w-fit">
                      <ShieldCheck size={18} />
                      {r.driverAssignment.name}
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {r.timeline.state === "completed" ? (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Receipt size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                          <History size={18} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Eye size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                          <Pencil size={18} />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-sm text-slate-400">
                  Aucune réservation ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-sm">
        <span className="text-slate-500">Affichage de 1 à {filtered.length} sur 42 résultats</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Suivant
          </Button>
        </div>
      </div>
    </Card>
  );
}