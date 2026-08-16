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

import { Car, Driver, Reservation,Client, Payment } from "@/lib/types";
import CreateReservationModal from "@/components/modals/createReservationModal";
import CarBackModal from "@/components/modals/CarBackModal";
import { formatDate } from "@/app/client/payment/[id]/page";
import FactureLocationModal from "@/components/modals/factureLocationModal";


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
interface PaymentProps {
  payments: Payment[];
  onSuccess?: () => void;
  onEdit: (id: number) => void;
  onPrint: (id: number) => void;
}

export default function PaymentsTable({ payments,onEdit,onSuccess,onPrint}: PaymentProps ) {
  const [search, setSearch] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const filtered = payments.filter((p) =>
    `${p.invoice.reservation.user.lastname}  ${p.invoice.reservation.reservationNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


function getInitials(firstname: string, lastname: string) {
  return `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
}

const [open, setOpen] = useState(false);
const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);


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
            placeholder="Rechercher par client, ou numéro de reservation..."
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
              <TableHead className="text-xs font-semibold uppercase">Payements</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Reservation</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Client</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Montant</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Méthode</TableHead>
              <TableHead className="text-xs font-semibold uppercase">Date</TableHead>
              <TableHead className="text-xs font-semibold uppercase text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50 transition-colors group">
                <TableCell>
                  <span className="font-mono text-xs text-primary bg-blue-50 px-2 py-1 rounded">
                    {p.paymentNumber}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-primary bg-blue-50 px-2 py-1 rounded">
                    {p.invoice.reservation.reservationNumber}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarColor(p.invoice.reservation.user.firstname + p.invoice.reservation.user.lastname)}`}
                    >
                      {getInitials(p.invoice.reservation.user.firstname, p.invoice.reservation.user.lastname)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{p.invoice.reservation.user.lastname}</div>
                      <div className="text-[11px] text-slate-500">{p.invoice.reservation.user.firstname}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-slate-900 text-sm">{p.amount}</div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-slate-900 text-sm">{p.modePayment}</div>
                </TableCell>
                 <TableCell>
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-900">{formatDate(p.created_at, "dd MMM. yyyy")}  </span>
                    {/* <span className={`${RESERVATION_CLASSES[r.status]} text-[11px]  font-semibold `}>
                      {r.status}
                    </span> */}
                  </div>
                </TableCell>

                {/* <TableCell>
                  <div className="font-semibold text-slate-900 text-sm">{r.car.mark} {r.car.model}</div>
                  <div className="text-[11px] text-slate-500"> {r.car.category.name } {r.car.imatriculation}</div>
                </TableCell> */}

                <TableCell>

                    <div className="flex justify-center gap-1">
                    <div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" 

                      onClick={() => {
                          setOpen(true);
                          setSelectedPayment(p);
                          onPrint(p.id);
                          onSuccess?.()
                        }}
                      >
                        <Pencil size={18} />
                      </Button>


                    </div>
                    <div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Eye size={18} />
                        </Button>
                    </div>
                    
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-sm text-slate-400">
                  Aucun payement ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        
      </div>
      {/* Modal */}
        
                {selectedPayment && (
                  <FactureLocationModal
                    open={open}
                    onOpenChange={setOpen}
                    facture={selectedPayment.invoice}
                    // onImprimer={() => {
                    //   return window.print();
                    // }}
                  />
                )}
              
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-sm">
        <span className="text-slate-500">Affichage de 1 à {filtered.length} sur {payments.length} résultats</span>
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