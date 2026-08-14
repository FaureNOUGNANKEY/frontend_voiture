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

interface CreatePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any;
}

export default function CreatePaymentModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: CreatePaymentModalProps) {
  const [formData, setFormData] = useState({
    : initialData?.client || "",
    amount: initialData?.amount || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        client: initialData.client || "",
        amount: initialData.amount || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (initialData) {
        await updatePaymentApi(initialData.id, formData);
        toast.success("Paiement mis à jour avec succès !");
      } else {
        await addPaymentApi(formData);
        toast.success("Paiement ajouté avec succès !");
      }
      onSuccess?.();
      onOpenChange(false);
      setFormData({ client: "", amount: "" });
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
          {/* Client */}
          <div>
            <Label htmlFor="client">
              Client <span className="text-red-600">*</span>
            </Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              placeholder="Nom du client"
              required
            />
            {errors.client && <p className="text-red-600 text-sm">{errors.client[0]}</p>}
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
                  : "Ajouter le paiement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
