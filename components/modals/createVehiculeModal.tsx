"use client";

import { useState } from "react";
import { Upload, Car, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface CarFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any; // pour l'édition
}

export default function CreateVehiculeModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: CarFormModalProps) {
  const [formData, setFormData] = useState({
    marque: initialData?.marque || "",
    model: initialData?.model || "",
    couleur: initialData?.couleur || "",
    photo: null as File | null,
    immatriculation: initialData?.immatriculation || "",
    description: initialData?.description || "",
    prix_par_jour: initialData?.prix_par_jour || "",
    prix_au_kilometre: initialData?.prix_au_kilometre || "",
    etat: initialData?.etat || "Disponible",
    nombre_places: initialData?.nombre_places || "",
    nombre_portes: initialData?.nombre_portes || "",
    kilometrage: initialData?.kilometrage || "",
    niveau_carburant: initialData?.niveau_carburant || "Plein",
    dommage: initialData?.dommage || "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Prépare FormData si tu as une photo
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value as any);
      }
    });

    try {
      // Remplace par ton vrai appel API
      const response = await fetch("/api/cars", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        onSuccess?.();
        onOpenChange(false);
        // Reset form
        setFormData({
          marque: "",
          model: "",
          couleur: "",
          photo: null,
          immatriculation: "",
          description: "",
          prix_par_jour: "",
          prix_au_kilometre: "",
          etat: "Disponible",
          nombre_places: "",
          nombre_portes: "",
          kilometrage: "",
          niveau_carburant: "Plein",
          dommage: "",
        });
        setPreview(null);
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
            <Car className="w-8 h-8" />
            {initialData ? "Modifier le véhicule" : "Ajouter un véhicule"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du véhicule
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <div>
            <Label>Photo du véhicule</Label>
            <div className="mt-2">
              {preview ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData({ ...formData, photo: null });
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Cliquez pour ajouter une photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Marque + Modèle */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marque">Marque <span className="text-red-600">*</span></Label>
              <Input
                id="marque"
                value={formData.marque}
                onChange={(e) =>
                  setFormData({ ...formData, marque: e.target.value })
                }
                placeholder="Ex: Toyota"
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Modèle <span className="text-red-600">*</span></Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                placeholder="Ex: Corolla"
                required
              />
            </div>
          </div>

          {/* Couleur + Immatriculation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="couleur">Couleur</Label>
              <Input
                id="couleur"
                value={formData.couleur}
                onChange={(e) =>
                  setFormData({ ...formData, couleur: e.target.value })
                }
                placeholder="Ex: Blanc"
              />
            </div>
            <div>
              <Label htmlFor="immatriculation">Immatriculation *</Label>
              <Input
                id="immatriculation"
                value={formData.immatriculation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    immatriculation: e.target.value.toUpperCase(),
                  })
                }
                placeholder="Ex: AA-123-BB"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description du véhicule..."
              rows={3}
            />
          </div>

          {/* Prix */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prix_par_jour">Prix par jour (FCFA) <span className="text-red-600">*</span></Label>
              <Input
                id="prix_par_jour"
                type="number"
                value={formData.prix_par_jour}
                onChange={(e) =>
                  setFormData({ ...formData, prix_par_jour: e.target.value })
                }
                placeholder="Ex: 25000"
                required
              />
            </div>
            <div>
              <Label htmlFor="prix_au_kilometre">
                Prix au kilomètre (FCFA)
              </Label>
              <Input
                id="prix_au_kilometre"
                type="number"
                value={formData.prix_au_kilometre}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prix_au_kilometre: e.target.value,
                  })
                }
                placeholder="Ex: 150"
              />
            </div>
          </div>

          {/* État + Carburant */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>État</Label>
              <Select
                value={formData.etat}
                onValueChange={(value) =>
                  setFormData({ ...formData, etat: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner l'état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponible">Disponible</SelectItem>
                  <SelectItem value="Loué">Loué</SelectItem>
                  <SelectItem value="En maintenance">En maintenance</SelectItem>
                  <SelectItem value="Hors service">Hors service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Niveau de carburant</Label>
              <Select
                value={formData.niveau_carburant}
                onValueChange={(value) =>
                  setFormData({ ...formData, niveau_carburant: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Niveau de carburant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vide">Vide</SelectItem>
                  <SelectItem value="1/4">1/4</SelectItem>
                  <SelectItem value="1/2">1/2</SelectItem>
                  <SelectItem value="3/4">3/4</SelectItem>
                  <SelectItem value="Plein">Plein</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Places + Portes + Kilométrage */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nombre_places">Nombre de places</Label>
              <Input
                id="nombre_places"
                type="number"
                value={formData.nombre_places}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_places: e.target.value })
                }
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="nombre_portes">Nombre de portes</Label>
              <Input
                id="nombre_portes"
                type="number"
                value={formData.nombre_portes}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_portes: e.target.value })
                }
                placeholder="4"
              />
            </div>
            <div>
              <Label htmlFor="kilometrage">Kilométrage</Label>
              <Input
                id="kilometrage"
                type="number"
                value={formData.kilometrage}
                onChange={(e) =>
                  setFormData({ ...formData, kilometrage: e.target.value })
                }
                placeholder="45000"
              />
            </div>
          </div>

          {/* Dommages */}
          <div>
            <Label htmlFor="dommage">Dommages / Observations</Label>
            <Textarea
              id="dommage"
              value={formData.dommage}
              onChange={(e) =>
                setFormData({ ...formData, dommage: e.target.value })
              }
              placeholder="Ex: Rayure légère sur l'aile avant gauche..."
              rows={2}
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
                  : "Ajouter le véhicule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
