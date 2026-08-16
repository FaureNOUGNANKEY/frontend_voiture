import { Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



export type ReservationHistoryStatus = "Terminé" | "Annulé";

export type ReservationHistoryItem = {
  id: string;
  vehicle: string;
  date: string;
  price: string;
  status: ReservationHistoryStatus;
};
 
export const reservationHistory: ReservationHistoryItem[] = [
  { id: "h1", vehicle: "Tesla Model 3", date: "12 Mai 2024", price: "145,00 €", status: "Terminé" },
  { id: "h2", vehicle: "Audi A4 Avant", date: "04 Mai 2024", price: "189,50 €", status: "Terminé" },
  { id: "h3", vehicle: "BMW iX", date: "28 Avr 2024", price: "210,00 €", status: "Annulé" },
];

const STATUS_CLASSES: Record<ReservationHistoryStatus, string> = {
  Terminé: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  Annulé: "bg-red-100 text-red-800 hover:bg-red-100",
};

export default function RecentReservations() {
  return (
    <Card className="shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-900">Réservations Récentes</h2>
        <a href="#" className="text-sm font-semibold text-primary hover:underline">
          Voir tout l&apos;historique
        </a>
      </div>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="text-xs font-semibold">Véhicule</TableHead>
                <TableHead className="text-xs font-semibold">Date</TableHead>
                <TableHead className="text-xs font-semibold">Prix</TableHead>
                <TableHead className="text-xs font-semibold">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservationHistory.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3 text-sm text-slate-900">
                      <Car size={18} className="text-primary" />
                      {item.vehicle}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">{item.date}</TableCell>
                  <TableCell className="text-sm text-slate-900">{item.price}</TableCell>
                  <TableCell>
                    <Badge className={`${STATUS_CLASSES[item.status]} text-[10px] uppercase font-bold`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}