"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Printer, CreditCard, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Invoice } from "@/lib/types";

export const societe= {
    titre: "Location Véhicule",
    telephone: "+228 91 45 51 51",
    adresse: "367 Rue Agodja Kodjoviakopé",
  }

const formatFCFA = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " FCFA";

function DetailRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={cn(
          "text-sm text-right",
          bold ? "font-semibold text-slate-900" : "font-medium text-slate-800",
        )}
      >
        {value}
      </span>
    </div>
  );
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facture: Invoice;
  onPayer?: () => void;
}

export const handlePrint = () => {
    const source = document.getElementById("facture-print-area");
    const target = document.getElementById("print-root");

    if (!source || !target) {
      console.error("Zone d'impression introuvable");
      return;
    }

    // Copie le contenu de la facture dans le conteneur dédié
    target.innerHTML = source.innerHTML;

    // Laisse le navigateur peindre, puis imprime
    requestAnimationFrame(() => {
      window.print();

      // Nettoyage après impression (optionnel)
      target.innerHTML = "";
    });
  };


export default function FactureLocationModal({
  open,
  onOpenChange,
  facture,
  onPayer,
}: Props) {

  console.log("facture", facture)
  const isPayee = facture?.status === "Payé";
  const isEnAttente = facture?.status === "En attente";

  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "lg:min-w-2xl max-w-base max-h-[92vh] overflow-hidden p-0 gap-0",
          // Classes utilitaires pour le print (cachées à l'écran via CSS global)
          "print:max-w-none print:max-h-none print:overflow-visible print:shadow-none print:border-0",
        )}
      >
        {/* Conteneur d'impression — invisible à l'écran */}
        <div id="print-root" className="hidden print:block" />

        {/* ========== ZONE IMPRIMABLE ========== */}
        <div id="facture-print-area">
          {/* Header logos */}
          <div className="flex items-start justify-between gap-4 border-b bg-slate-50/80 px-6 py-5 print:bg-white print:border-slate-200">
            <div className="relative h-12 w-28">
              <Image
                src="/appLogo.png"
                alt="Easy Car Rental"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="relative h-8 w-20">
                <Image
                  src="/flooz.png"
                  alt="Flooz"
                  fill
                  className="object-contain object-right"
                />
              </div>
              <Badge
                className={cn(
                  "text-xs print:border print:border-slate-300",
                  isPayee && "bg-emerald-500 hover:bg-emerald-500",
                  isEnAttente && "bg-amber-500 hover:bg-amber-500",
                  facture?.status === "Annulée" && "bg-slate-400",
                )}
              >
                {isPayee && "Payée"}
                {isEnAttente && "En attente de paiement"}
                {/* {facture.status ===  "Annulée"} */}
              </Badge>
            </div>
          </div>

          {/* Contenu — plus de max-height / overflow en print */}
          <div className="px-6 py-5 space-y-6 overflow-y-auto max-h-[calc(92vh-180px)] print:max-h-none print:overflow-visible">
            {/* Client + Société */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-base italic tracking-tight text-slate-900 uppercase">
                  {facture?.invoiceNumber}
                </p>
                <p className="text-base font-bold tracking-tight text-slate-900 uppercase">
                  {facture?.reservation.user.lastname}
                </p>
                <p className="text-sm text-slate-600">{facture?.reservation.user.email}</p>
                <p className="text-sm text-slate-600">
                  {facture?.reservation.user.phone}
                </p>
                <p className="text-sm text-slate-500 capitalize">
                  {facture?.reservation.user.address}
                </p>
              </div>
              <div className="space-y-1 sm:text-right">
                <p className="text-base font-bold tracking-tight text-slate-900">
                  {societe.titre}
                </p>
                <p className="text-sm text-slate-600">
                  {societe.telephone}
                </p>
                <p className="text-sm text-slate-500">
                  {societe.adresse}
                </p>
              </div>
            </div>

            <Separator />

            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">
                Détails Véhicule
              </h3>
              <div className="rounded-xl border bg-slate-50/50 px-4 py-2 print:bg-white">
                <DetailRow label="Marque" value={facture.reservation.car.mark} />
                <DetailRow label="Modèle" value={facture.reservation.car.model} />
                <DetailRow label="Type" value={facture.reservation.car.category?.name ?? facture.category} />
                <DetailRow label="État" value={facture.reservation.car.state} />
                <DetailRow label="Couleur" value={facture.reservation.car.color} />
                <DetailRow
                  label="Immatriculation"
                  value={facture.reservation.car.imatriculation}
                />
                <DetailRow
                  label="Chauffeur"
                  value={facture.reservation?.driver?.lastname || "sans"}
                />
                <DetailRow
                  label="Date Début"
                  value={facture.reservation.dateStart}
                />
                <DetailRow
                  label="Date Retour"
                  value={facture.reservation.dateBack}
                />
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-900">
                Détails Paiement
              </h3>
              <div className="rounded-xl border bg-slate-50/50 px-4 py-2 print:bg-white">
                <DetailRow
                  label="Tarif Chauffeur HT"
                  value={formatFCFA(facture.driverAmount)}
                />
                <DetailRow
                  label="Montant de réduction"
                  value={formatFCFA(facture.reductionAmount)}
                />
                <DetailRow
                  label="Montant Véhicule HT"
                  value={formatFCFA(facture.amount)}
                />
                <Separator className="my-2" />
                <DetailRow
                  label="Montant total HT"
                  value={formatFCFA(facture.totalHT)}
                  bold
                />
                <DetailRow
                  label="Montant total TVA"
                  value={formatFCFA(facture.tvaAmount)}
                />
                <DetailRow
                  label="Montant total TTC"
                  value={formatFCFA(facture.totalAmount)}
                  bold
                />
                {/* <DetailRow
                  label="Caution"
                  value={formatFCFA(facture.paiement.caution)}
                /> */}
              </div>
            </section>

            <div className="flex items-center justify-between rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 print:bg-white print:border-slate-300">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary print:text-slate-900">
                Total à payer
              </span>
              <span className="text-2xl font-bold tracking-tight text-primary print:text-slate-900">
                {formatFCFA(facture.totalAmount)}
              </span>
            </div>
          </div>
        </div>
        {/* ========== FIN ZONE IMPRIMABLE ========== */}

        {/* Footer — masqué à l'impression via CSS */}
        <DialogFooter className="no-print border-t bg-white px-6 py-4 gap-2 sm:gap-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-slate-600"
          >
            <X className="mr-1.5 h-4 w-4" />
            Annuler
          </Button>

          {isPayee && (
            <Button
              variant="outline"
              onClick={handlePrint}
              className="border-slate-300"
            >
              <Printer className="mr-1.5 h-4 w-4" />
              Imprimer
            </Button>
          )}

          {isEnAttente && (
            <Button
              onClick={onPayer}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <CreditCard className="mr-1.5 h-4 w-4" />
              Payer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
