"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, Pencil, Receipt, History, ShieldCheck, TriangleAlert, BadgeCheck, X, Car as CarIcon, Loader} from "lucide-react";
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

import { Car, Driver, Reservation,Client } from "@/lib/types";
import CreateReservationModal from "@/components/modals/createReservationModal";
import CarBackModal from "@/components/modals/CarBackModal";
import { formatDate } from "@/app/client/payment/[id]/page";


// 1. Définir les états possibles
type ReservationStatus = "En cours" | "Terminée" | "Annulée" | "En attente" | "Refusée"| "Validée";

// 2. Associer chaque état à une couleur (classes Tailwind)
const RESERVATION_CLASSES: Record<ReservationStatus, string> = {
  "En attente": "bg-orange-100 text-orange-700 hover:bg-orange-200",
  "En cours": "bg-green-100 text-green-700 hover:bg-green-200",
  "Annulée": "bg-red-100 text-red-700 hover:bg-red-200",
  "Refusée": "bg-red-100 text-red-700 hover:bg-red-200",
  "Terminée": "bg-blue-100 text-blue-700 hover:bg-blue-200",
  "Validée": "bg-blue-100 text-blue-700 hover:bg-blue-200",
};
const AVATAR_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-slate-100 text-slate-600",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
];

//calculer et etribution des couleurs au avatar dinamiquement 
function getAvatarColor(userName: string) {
  const hash = userName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
interface ReservationProps {
  reservations: Reservation[];
  drivers: Driver[];
  clients:Client[];
  cars:Car[];
  onSuccess?: () => void;
  onEdit: (id: number) => void;
}

export default function ReservationsTable({ reservations, drivers,onEdit,onSuccess,cars,clients}: ReservationProps ) {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const [carBackOpen, setcarBackOpen] = useState(false);

  const filtered = reservations.filter((r) =>
    `${r.user.lastname}  ${r.car.mark}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


function getInitials(firstname: string, lastname: string) {
  return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
}


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
              <TableHead className="text-xs font-semibold uppercase">Réservation</TableHead>
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
                    {r.reservationNumber}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarColor(r.user.firstname + r.user.lastname)}`}
                    >
                      {getInitials(r.user.firstname, r.user.lastname)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{r.user.lastname}</div>
                      <div className="text-[11px] text-slate-500">{r.user.firstname}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="font-semibold text-slate-900 text-sm">{r.car.mark} {r.car.model}</div>
                  <div className="text-[11px] text-slate-500"> {r.car.category.name } {r.car.imatriculation}</div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-900">{formatDate(r.dateStart, "dd MMM. yyyy")} au {formatDate(r.dateBack, "dd MMM. yyyy")} </span>
                    <span className={`${RESERVATION_CLASSES[r.status]} text-[11px]  font-semibold `}>
                      {r.status}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {/* <div className="font-bold text-slate-900 text-sm">{r.financials.amount}</div>
                  <div className={`flex items-center gap-1 text-[11px] font-semibold ${FINANCIAL_CLASSES[r.financials.status]}`}>
                    {r.financials.status === "loyalty" && <BadgeCheck size={12} />}
                    {r.financials.note}
                  </div> */}
                  <div className="font-bold text-slate-900 text-sm">{r.totalAmount}</div>
                  {/* <div className={`flex items-center gap-1 text-[11px] font-semibold ${FINANCIAL_CLASSES[r.financials.status]}`}>
                    {r.financials.status === "loyalty" && <BadgeCheck size={12} />}
                    {r.financials.note}
                  </div> */}
                </TableCell>

                <TableCell>
                  <div className="font-semibold text-slate-900 text-sm">{r.driver?.lastname}</div>
                  <div className="text-[11px] text-slate-500"> {r.driver?.firstname } </div>

                  {/* {r.driverAssignment.type === "select" && (
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
                  )} */}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-1 opacity-100 transition-opacity">
                    {r.status === "Terminée" ? (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" 
                        >
                          <Receipt size={18} />
                        </Button>
            
                      </>
                    ) : ["Annulée","Refusée"].includes(r.status?.toLowerCase()) ? (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" 
                        >
                          <X size={18} />
                        </Button>
                        
                      </>
                    ) : r.status === "Validée"  && !["En cours", "Terminée","A venir"].includes(r.computed_status?.toLowerCase())? (
                      <>
                        <Button variant="ghost" size="icon" 
                        className={ `h-8 w-8 text-red-600 ${r.driverAmount != 0 && r.driver == null && !["Annulée", "Refusée"].includes(r.status?.toLowerCase()) ? "bg-red-300 animate-pulse" : "h-8 w-8 text-primary"}}`}

                        onClick={() => {
                          setcarBackOpen(true);
                          setSelectedReservation(r);
                          onSuccess?.()
                        }}
                        >
                          <CarIcon size={18} />
                        </Button>

                        
                      </>
                    ) : r.computed_status=== "En cours" && r.status === "Validée" ? (
                      <>
                        <Button variant="ghost" size="icon" 
                        className={ `h-8 w-8 text-red-600 ${r.driverAmount != 0 && r.driver == null && !["Annulée", "Refusée"].includes(r.status?.toLowerCase()) ? "bg-red-300 animate-pulse" : "h-8 w-8 text-green-800"}}`}
                        // className=  "h-8 w-8 text-green-800"

                        onClick={() => {
                          setcarBackOpen(true);
                          setSelectedReservation(r);
                          onSuccess?.()
                        }}
                        >
                          <Loader size={18} />
                        </Button>

                        
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"
                        onClick={() => {
                          setCreateOpen(true);
                          setSelectedReservation(r);
                          onEdit(r.id);
                          onSuccess?.()
                        }}
                        >
                          <Pencil size={18} />
                        </Button>

                        
                      </>)}

                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Eye size={18} />
                        </Button>
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
      {/* Modal */}
        <CreateReservationModal 
          open={createOpen}
          onOpenChange={setCreateOpen}
          initialData={selectedReservation}
          onSuccess={onSuccess} cars={cars} drivers={drivers} clients={clients}/>
      {/* Modal */}
        <CarBackModal 
        open={carBackOpen}
        onOpenChange={setcarBackOpen}
        initialData={selectedReservation} reservationId={""} 
        onSuccess={onSuccess}
                 />

      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-sm">
        <span className="text-slate-500">Affichage de 1 à {filtered.length} sur {reservations.length} résultats</span>
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