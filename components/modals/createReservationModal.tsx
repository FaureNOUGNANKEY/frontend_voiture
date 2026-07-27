"use client";

import { useState } from "react";
import { Calendar, User, Car } from "lucide-react";
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

interface CreateReservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any;
  cars?: { id: string; label: string }[];      // Liste des voitures
  drivers?: { id: string; label: string }[];  // Liste des chauffeurs
}

export default function CreateReservationModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  cars = [],
  drivers = [],
}: CreateReservationModalProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || "",
    prenoms: initialData?.prenoms || "",
    voiture_id: initialData?.voiture_id || "",
    date_debut: initialData?.date_debut || "",
    date_fin: initialData?.date_fin || "",
    chauffeur_id: initialData?.chauffeur_id || "",
    type_piece: initialData?.type_piece || "",
    numero_piece: initialData?.numero_piece || "",
    adresse: initialData?.adresse || "",
    telephone: initialData?.telephone || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess?.();
        onOpenChange(false);
        setFormData({
          nom: "",
          prenoms: "",
          voiture_id: "",
          date_debut: "",
          date_fin: "",
          chauffeur_id: "",
          type_piece: "",
          numero_piece: "",
          adresse: "",
          telephone: "",
        });
      }
    } catch (error) {
      console.error(error);
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
          {/* Nom + Prénoms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">
                Nom <span className="text-red-600">*</span>
              </Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
                placeholder="Ex: Dupont"
                required
              />
            </div>
            <div>
              <Label htmlFor="prenoms">
                Prénoms <span className="text-red-600">*</span>
              </Label>
              <Input
                id="prenoms"
                value={formData.prenoms}
                onChange={(e) =>
                  setFormData({ ...formData, prenoms: e.target.value })
                }
                placeholder="Ex: Jean Pierre"
                required
              />
            </div>
          </div>

          {/* Voiture + Chauffeur */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                Voiture <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.voiture_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, voiture_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une voiture" />
                </SelectTrigger>
                <SelectContent>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Chauffeur</Label>
              <Select
                value={formData.chauffeur_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, chauffeur_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sans chauffeur</SelectItem>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                value={formData.date_debut}
                onChange={(e) =>
                  setFormData({ ...formData, date_debut: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="date_fin">
                Date de fin <span className="text-red-600">*</span>
              </Label>
              <Input
                id="date_fin"
                type="datetime-local"
                value={formData.date_fin}
                onChange={(e) =>
                  setFormData({ ...formData, date_fin: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Type + Numéro de pièce */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                {"Type de pièce d'identité"} <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.type_piece}
                onValueChange={(value) =>
                  setFormData({ ...formData, type_piece: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CNI">{"Carte Nationale d'Identité"}</SelectItem>
                  <SelectItem value="Passeport">Passeport</SelectItem>
                  <SelectItem value="Permis">Permis de conduire</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="numero_piece">
                Numéro de pièce <span className="text-red-600">*</span>
              </Label>
              <Input
                id="numero_piece"
                value={formData.numero_piece}
                onChange={(e) =>
                  setFormData({ ...formData, numero_piece: e.target.value })
                }
                placeholder="Ex: 123456789"
                required
              />
            </div>
          </div>

          {/* Adresse */}
          <div>
            <Label htmlFor="adresse">
              Adresse <span className="text-red-600">*</span>
            </Label>
            <Input
              id="adresse"
              value={formData.adresse}
              onChange={(e) =>
                setFormData({ ...formData, adresse: e.target.value })
              }
              placeholder="Ex: Lomé, Tokoin"
              required
            />
          </div>

          {/* Téléphone */}
          <div>
            <Label htmlFor="telephone">
              Téléphone <span className="text-red-600">*</span>
            </Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
              placeholder="Ex: +228 90 12 34 56"
              required
            />
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