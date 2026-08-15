import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmModal from "@/components/modals/confirmModal";
import { useState } from "react";
import { formatDate } from "@/app/client/payment/[id]/page";
import { handlePrint } from "@/components/modals/factureLocationModal";

export type MyReservationStatus = "A venir" | "En cours" | "Terminée" | "Annulée";
export type Status = "validé";


export const STATUS_CLASSES: Record<MyReservationStatus, string> = {
  "A venir": "bg-blue-100 text-blue-800",
  "En cours": "bg-emerald-100 text-emerald-800",
  "Terminée": "bg-slate-100 text-slate-600",
  "Annulée": "bg-red-100 text-red-700",
};

export default function ReservationCard({ reservation, onCancel }: { reservation: Reservation, onCancel: (id: number) => void }) {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0 flex flex-col sm:flex-row">
          <div className="sm:w-48 h-40 sm:h-auto shrink-0 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={reservation.car.photo_url}
              alt={reservation.car.mark + " " + reservation.car.model}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs font-mono text-slate-400">RES-000000{reservation.id}</p>
                  <h3 className="text-base font-semibold text-slate-900">
                    {reservation.car.mark} {reservation.car.model}
                  </h3>
                  <p className="text-xs text-slate-500">{reservation.car.category?.name}</p>
                </div>
                <Badge className={`${STATUS_CLASSES[reservation.computed_status]} hover:${STATUS_CLASSES[reservation.computed_status]} shrink-0`}>
                  {reservation.status}
                </Badge>
              </div>

              <div className="flex flex-col gap-1.5 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-slate-400" />
                  {formatDate(reservation.dateStart, "dd MMM. yyyy")} - {formatDate(reservation.dateBack, "dd MMM. yyyy")}
                </div>
                {/* <div className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" />
                {reservation.car.place}
              </div> */}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-base font-semibold text-slate-900">{reservation.totalAmount}</span>
              {/* <div className="flex gap-2">
              {reservation.computed_status === "à venir" && (
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => onCancel(reservation.id)}
                >
                  Annuler
                </Button>

              
              )}
              <Button size="sm" variant="outline">
                Détails
              </Button>
            </div> */}

              <div className="flex gap-2">
                {/* Cas : réservation à venir → uniquement Annuler */}
                {reservation.computed_status === "A venir" || reservation.status != "Validée" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-100 text-red-700"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Annuler
                  </Button>
                )}

                {/* Cas : réservation validée → Annuler + Payer si facture non payée */}
                {reservation.status === ("Validée" as Reservation["status"]) && (
                  <>{reservation.invoice?.status !== "Payé" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-100 text-red-700"
                      onClick={() => setDeleteOpen(true)}
                    >
                      Annuler
                    </Button>
                  ):( <> </>) }
                    {reservation.invoice?.status !== "Payé" ? (
                      <Button
                        onClick={() => router.push(`/client/payment/${reservation.id}`)}
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Payer
                      </Button>
                    ) : (
                      <Button
                        // onClick={() => router.push(`/client/invoice/${reservation.invoice.id}/download`)}
                        variant="outline"
                        // onClick={handlePrint}
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Télécharger
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* modal suppression */}
      <ConfirmModal
        message="Voulez-vous vraiment annulé cette réservation ?"
        confirmText="oui"
        cancelText="Annuler"
        onConfirm={() => onCancel(reservation.id)}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>


  );
}