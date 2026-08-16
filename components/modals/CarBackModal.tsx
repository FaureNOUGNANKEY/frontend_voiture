"use client";

import { useEffect, useState } from "react";
import { CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addCarBackApi, updateCarBackApi } from "@/api/carBack";

interface CarBackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  reservationId: number | string;
  initialData?: any;
}

const STATES = [
  { value: "Bon état", label: "Bon état" },
  { value: "Rayures", label: "Rayures" },
  { value: "Dommages", label: "Dommages" },
  { value: "Accidenté", label: "Accidenté" },
];

export default function CarBackModal({
  open,
  onOpenChange,
  onSuccess,
  reservationId,
  initialData,
}: CarBackModalProps) {
  const [formData, setFormData] = useState({
    reservation_id: initialData?.id,
    returnKm: initialData?.returnKm ?? "",
    fluelLevel: initialData?.fuelLevel || "",
    state: initialData?.state || "",
    domage: initialData?.domage || "",
    returnDate:"",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        reservation_id: initialData?.id,
        returnKm: initialData?.returnKm ?? "",
        fluelLevel: initialData?.fuelLevel || "",
        state: initialData?.state || "",
        domage: initialData?.domage || "",
        returnDate : ""
      });
    }
  }, [initialData, reservationId]);

  const isDamaged = formData.state === "Rayures" || formData.state === "Dommages" || formData.state === "Accidenté";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        data.append(key, value as any);
      }
    });

    try {
      if (initialData) { 
        await addCarBackApi(data);
        toast.success("État de retour enregistré avec succès !");
      }
      onSuccess?.();
      onOpenChange(false);
      setFormData({
        reservation_id: reservationId,
        returnKm: "",
        fluelLevel: "",
        state: "",
        domage: "",
        returnDate: ""
      });
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /car-backs :", error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            <CarFront className="w-6 h-6" />
             État de retour du véhicule
            {/* {initialData ? "Modifier l'état de retour" : "État de retour du véhicule"} */}
          </DialogTitle>
          <DialogDescription>
            Renseignez l&apos;état du véhicule au moment de sa restitution
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kilométrage + Niveau de carburant */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="returnKm">
                Kilométrage au retour <span className="text-red-600">*</span>
              </Label>
              <Input
                id="returnKm"
                type="number"
                min={0}
                value={formData.returnKm}
                onChange={(e) =>
                  setFormData({ ...formData, returnKm: e.target.value })
                }
                placeholder="Ex: 45200"
                required
              />
              {errors.returnKm && (
                <p className="text-red-600 text-sm">{errors.returnKm[0]}</p>
              )}
            </div>

            <div>
              <Label>
                Niveau de carburant <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.fluelLevel}
                onValueChange={(value) =>
                  setFormData({ ...formData, fluelLevel: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vide">Vide</SelectItem>
                  <SelectItem value="1/4">1/4</SelectItem>
                  <SelectItem value="1/2">1/2</SelectItem>
                  <SelectItem value="3/4">3/4</SelectItem>
                  <SelectItem value="Plein">Plein</SelectItem>
                </SelectContent>
              </Select>
              {errors.fluelLevel && (
                <p className="text-red-600 text-sm">{errors.fluelLevel[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="date_fin">
                Date de retour<span className="text-red-600"></span>
              </Label>
              <Input
                id="date_fin"
                type="datetime-local"
                value={formData.returnDate}
                onChange={(e) =>
                  setFormData({ ...formData, returnDate: e.target.value })
                }
                required
              />
               {errors.returnDate && <p className="text-red-600 text-sm">{errors.returnDate[0]}</p>}
            </div>
          </div>

          {/* État général */}
          <div>
            <Label>
              État général du véhicule <span className="text-red-600">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  state: value,
                  domage: value === "Bon état" ? "" : formData.domage,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner l'état" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-600 text-sm">{errors.state[0]}</p>
            )}
          </div>

          {/* Description des dommages, uniquement si l'état l'exige */}
          {isDamaged && (
            <div>
              <Label htmlFor="domage">
                Description des dommages <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="domage"
                value={formData.domage}
                onChange={(e) =>
                  setFormData({ ...formData, domage: e.target.value })
                }
                placeholder="Décrivez la nature et la localisation des dommages constatés..."
                rows={4}
                required={isDamaged}
              />
              {errors.domage && (
                <p className="text-red-600 text-sm">{errors.domage[0]}</p>
              )}
            </div>
          )}

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
                // : initialData
                //   ? "Mettre à jour"
                  : "Enregistrer le retour"
                }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}