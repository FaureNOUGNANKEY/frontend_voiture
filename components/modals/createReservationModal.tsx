"use client";

import { useEffect, useState } from "react";
import { Calendar} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addReservationApi, updateReservationApi } from "@/api/reservation";
import {User, Car, Client, Driver} from "@/lib/types";
import { toast } from "sonner";

interface CreateReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any;
  cars: Car[];      // Liste des voitures
  drivers: Driver[];  // Liste des chauffeurs
  clients: Client[];
}

export default function CreateReservationModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  clients,
  cars ,
  drivers,
}: CreateReservationModalProps) {
  const [formData, setFormData] = useState({
    user_id: initialData?.user.id || "",
    car_id: initialData?.car.id || "",
    dateStart: initialData?.dateStart|| "",
    dateBack: initialData?.dateBack || "",
    driver_id: initialData?.driver?.id || "",
    type: initialData?.type || "reservation",
    status: initialData?.status || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (initialData){
      setFormData({
      user_id: initialData?.user.id || "",
      car_id: initialData?.car.id || "",
      dateStart: initialData?.dateStart || "",
      dateBack: initialData?.dateBack || "",
      driver_id: initialData?.driver?.id || "",
      type: initialData?.type || "reservation",
      status: initialData?.status || "",
    })
    console.log("initialdata:",initialData);
    }
  },[initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    setErrors({});
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "photo") {
          if (value instanceof File) {
            data.append(key, value);
          }
        } else {
          data.append(key, value as any);
        }
      }
    });

    try {
      if (initialData) {
        await updateReservationApi(initialData.id, data);
        toast.success ("Réservation mis à jours avec succès !")
      } else {
        await addReservationApi(data);
        toast.success ("Réservation ajouter avec succès !")
      }
        onSuccess?.();
        onOpenChange(false);
        setFormData({
          user_id: "",
          car_id: "",
          dateStart: "",
          dateBack: "",
          driver_id: "",
          type:"reservation",
          status:"",
        });
      setPreview(null);
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        // récupèration des erreurs de validation
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /reservations :", error.response?.data || error.message);
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
            <Calendar className="w-6 h-6" />
            {initialData ? "Modifier la réservation" : "Nouvelle réservation"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de la réservation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* client + voiture*/}
          <div className="grid grid-cols-2 gap-4">
            <div >
              <Label >Client<span className="text-red-600">*</span></Label>
              <Select
                value={formData.user_id ? String(formData.user_id) : ""}
                onValueChange={(value) => setFormData({ ...formData, user_id: Number(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie...">
                    {clients.findLast((e) => e.id === formData.user_id)?.lastname}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.lastname} {c.firstname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.user_id && <p className="text-red-600 text-sm">{errors.user_id[0]}</p>}
            </div>
            <div >
              <Label >Voiture<span className="text-red-600">*</span></Label>
              <Select
                value={formData.car_id ? String(formData.car_id) : ""}
                onValueChange={(value) => setFormData({ ...formData, car_id: Number(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie...">
                    {cars.findLast((e) => e.id === formData.car_id)?.mark}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {cars.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.mark} {c.model} {c.imatriculation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.car_id && <p className="text-red-600 text-sm">{errors.car_id[0]}</p>}
            </div>
          </div>
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date_debut">
                Date de début <span className="text-red-600">*</span>
              </Label>
              <Input
                id="date_debut"
                type="datetime-local"
                value={formData.dateStart}
                onChange={(e) =>
                  setFormData({ ...formData, dateStart: e.target.value })
                }
                required
              />
              {errors.dateStart && <p className="text-red-600 text-sm">{errors.dateStart[0]}</p>}
            </div>
            <div>
              <Label htmlFor="date_fin">
                Date de fin <span className="text-red-600">*</span>
              </Label>
              <Input
                id="date_fin"
                type="datetime-local"
                value={formData.dateBack}
                onChange={(e) =>
                  setFormData({ ...formData, dateBack: e.target.value })
                }
                required
              />
               {errors.dateBack && <p className="text-red-600 text-sm">{errors.dateBack[0]}</p>}
            </div>
          </div>

          {/* Chauffeur */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Chauffeur</Label>
              <Select
                value={initialData?.driver?.id? String(initialData?.driver.id):formData.driver_id? String(formData.driver_id) : "none"}
    
                onValueChange={(value) => {
                if (value === "none") {
                  setFormData({ ...formData, driver_id: null, type: "reservation" });
                } else {
                  setFormData({ ...formData, driver_id: Number(value), type: "leasing" });
                }
              }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un chauffeur">
                   {formData.driver_id === null
                  ? "Sans chauffeur"
                  : `${drivers.find((e) => e.id === formData.driver_id)?.lastname ?? ""} ${drivers.find((e) => e.id === formData.driver_id)?.firstname ?? ""}`}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sans chauffeur</SelectItem>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={String(driver.id)}>
                      {driver.lastname} {driver.firstname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Statut<span className="text-red-600">*</span></Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminée">Terminée</SelectItem>
                  {/* <SelectItem value="En attente">En attente</SelectItem> */}
                  <SelectItem value="Refusée">Refusée</SelectItem>
                  <SelectItem value="Validée">Validée</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-600 text-sm">{errors.status[0]}</p>}
            </div>
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
                  : "Créer la réservation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}