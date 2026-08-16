"use client";

import { useEffect, useState } from "react";
import { CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addPaymentApi, updatePaymentApi } from "@/api/payment";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Reservation } from "@/lib/types";

interface CreatePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  reservations: Reservation[];
  initialData?: any;
}

export default function CreatePaymentModal({
  open,
  onOpenChange,
  onSuccess,
  reservations,
  initialData,
}: CreatePaymentModalProps) {
  const [formData, setFormData] = useState({
    invoice_id: initialData?.invoice || "",
    amount: initialData?.amount || "",
    modePayment: initialData?.modePayment || "espèce",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        invoice_id: initialData?.invoice || "",
        amount: initialData?.amount || "",
        modePayment: initialData?.modePayment || "espèce",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        data.append(key, value as any);
      }
    });


    try {
      if (initialData) {
        await updatePaymentApi(initialData.id, data);
        toast.success("Paiement mis à jour avec succès !");
      } else {
        console.log("data", data)
        await addPaymentApi(data);

        toast.success("Paiement ajouté avec succès !");
      }
      onSuccess?.();
      onOpenChange(false);
      setFormData({
        invoice_id: "",
        amount: "",
        modePayment: "",
      });
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /payments :", error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            {initialData ? "Modifier le paiement" : "Ajouter un paiement"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du paiement
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* reservation */}
          <div>
            <Label htmlFor="reservation">
              Réference de la réservation <span className="text-red-600">*</span>
            </Label>
            <Select
              value={formData.invoice_id ? String(formData.invoice_id) : ""}
              onValueChange={(value) => setFormData({ ...formData, invoice_id: Number(value) })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner la réference de la reservation...">
                  {formData.invoice_id
                    ? reservations.find((r) => String(r.invoice?.id) === String(formData.invoice_id))
                      ?.reservationNumber
                    : undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {reservations
                .filter((r) => r.invoice?.id && r.invoice?.status !== "Payé")
                .map((r) => (
                  <SelectItem key={r.id} value={String(r.invoice?.id)}>
                    {r.reservationNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.invoice_id && <p className="text-red-600 text-sm">{errors.invoice_id[0]}</p>}
          </div>

          {/* Montant */}
          <div>
            <Label htmlFor="amount">
              Montant <span className="text-red-600">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Ex: 50000"
              required
            />
            {errors.amount && <p className="text-red-600 text-sm">{errors.amount[0]}</p>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Enregistrement..."
                : initialData
                  ? "Mettre à jour"
                  : "Enregistrer le paiement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
