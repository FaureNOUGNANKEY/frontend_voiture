"use client";

import { useEffect, useState } from "react";
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
import { Category } from "@/lib/types";
import { addCarApi, updateCarApi } from "@/api/car";
import { toast } from "sonner";

interface CarFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any; // pour l'édition
  categories: Category[];
}


export default function CreateVehiculeModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
  categories,
}: CarFormModalProps) {
  const [formData, setFormData] = useState({
    mark: initialData?.mark || "",
    model: initialData?.model || "",
    category_id: initialData?.category_id || "",
    color: initialData?.color || "",
    photo: initialData?.photo || null,
    imatriculation: initialData?.imatriculation || "",
    description: initialData?.description || "",
    dayAmount: initialData?.dayAmount || "",
    kmAmount: initialData?.kmAmount || "",
    state: initialData?.state || "Disponible",
    place: initialData?.place || "",
    door: initialData?.door || "",
    kilometrage: initialData?.kilometrage || "",
    niveauCarburant: initialData?.niveauCarburant || "Plein",
    dommage: initialData?.dommage || "",
    transmission: initialData?.transmission || "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        mark: initialData.mark || "",
        model: initialData.model || "",
        category_id: initialData.category.id || "",
        color: initialData.color || "",
        photo: null,
        imatriculation: initialData.imatriculation || "",
        description: initialData.description || "",
        dayAmount: initialData.dayAmount || "",
        kmAmount: initialData.kmAmount || "",
        state: initialData.state || "",
        place: initialData.place || "",
        door: initialData.door || "",
        kilometrage: initialData.kilometrage || "",
        niveauCarburant: initialData.niveauCarburant || "Plein",
        dommage: initialData.dommage || "",
        transmission: initialData?.transmission || "",
      });
      setPreview(initialData.photo_url || null);
      console.log("initial data : ", initialData);
    }
  }, [initialData]);


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
        await updateCarApi(initialData.id, data);
        toast.success ("Voiture mis à jour avec succès ! ")
      } else {
        await addCarApi(data);
        toast.success("Voiture ajouter avec succès ! ")
      }
      onSuccess?.();
      onOpenChange(false);
      // Reset form
      setFormData({
        mark: "",
        model: "",
        category_id: "",
        color: "",
        photo: null,
        imatriculation: "",
        description: "",
        dayAmount: "",
        kmAmount: "",
        state: "Disponible",
        place: "",
        door: "",
        kilometrage: "",
        niveauCarburant: "Plein",
        dommage: "",
        transmission: "",
      });
      setPreview(null);
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        // récupèration des erreurs de validation
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /cars :", error.response?.data || error.message);
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
            <Label>Photo du véhicule <span className="text-red-600">*</span></Label>
            <div className="mt-2">
              {preview || formData?.photo ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                  <img
                    src={preview || formData?.photo}
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
              {errors.photo && <p className="text-red-600 text-sm">{errors.photo[0]}</p>}
            </div>
          </div>

          {/* Marque + Modèle */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marque">Marque<span className="text-red-600">*</span></Label>
              <Input
                id="marque"
                value={formData.mark}
                onChange={(e) =>
                  setFormData({ ...formData, mark: e.target.value })
                }
                placeholder="Ex: Toyota"
                required
              />
              {errors.mark && <p className="text-red-600 text-sm">{errors.mark[0]}</p>}
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
              {errors.model && <p className="text-red-600 text-sm">{errors.model[0]}</p>}
            </div>
          </div>

          {/* Couleur + Immatriculation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="couleur">Couleur<span className="text-red-600">*</span></Label>
              <Input
                id="couleur"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                placeholder="Ex: Blanc"
              />
              {errors.color && <p className="text-red-600 text-sm">{errors.color[0]}</p>}
            </div>
            <div>
              <Label htmlFor="immatriculation">Immatriculation<span className="text-red-600">*</span></Label>
              <Input
                id="immatriculation"
                value={formData.imatriculation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imatriculation: e.target.value.toUpperCase(),
                  })
                }
                placeholder="Ex: AA-123-BB"
                required
              />
              {errors.imatriculation && <p className="text-red-600 text-sm">{errors.imatriculation[0]}</p>}
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
            {errors.description && <p className="text-red-600 text-sm">{errors.description[0]}</p>}
          </div>

          {/* Prix + transmission*/}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="prix_par_jour">Prix par jour (FCFA) <span className="text-red-600">*</span></Label>
              <Input
                id="prix_par_jour"
                type="number"
                value={formData.dayAmount}
                onChange={(e) =>
                  setFormData({ ...formData, dayAmount: e.target.value })
                }
                placeholder="Ex: 25000"
                required
              />
              {errors.dayAmount && <p className="text-red-600 text-sm">{errors.dayAmount[0]}</p>}
            </div>
            <div>
              <Label htmlFor="prix_au_kilometre">
                Prix au kilomètre (FCFA)<span className="text-red-600">*</span>
              </Label>
              <Input
                id="prix_au_kilometre"
                type="number"
                value={formData.kmAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kmAmount: e.target.value,
                  })
                }
                placeholder="Ex: 150"
              />
              {errors.kmAmount && <p className="text-red-600 text-sm">{errors.kmAmount[0]}</p>}
            </div>

             {/* transmission */}
            <div>
              <Label>Transmission<span className="text-red-600">*</span></Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) =>
                  setFormData({ ...formData,transmission: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatique">Automatique</SelectItem>
                  <SelectItem value="Manuelle">Manuelle</SelectItem>
                </SelectContent>
              </Select>
              {errors.transmission && <p className="text-red-600 text-sm">{errors.transmission[0]}</p>}
            </div>
      
          </div>

          {/* État + Categorie + Carburant */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>État<span className="text-red-600">*</span></Label>
              <Select
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner l'état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bon">Bon</SelectItem>
                  <SelectItem value="usée">usée</SelectItem>
                  <SelectItem value="Neuve">Neuve</SelectItem>
                  <SelectItem value="très usée">Très usée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div >
              <Label >Catégorie<span className="text-red-600">*</span></Label>
              <Select
                // defaultValue={categories.findLast((e) => e.id === formData.category_id)?.name}
                value={formData.category_id ? String(formData.category_id) : ""}
                onValueChange={(value) => setFormData({ ...formData, category_id: Number(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie...">
                    {categories.findLast((e) => e.id === formData.category_id)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && <p className="text-red-600 text-sm">{errors.category_id[0]}</p>}
            </div>

            <div>
              <Label>Niveau de carburant<span className="text-red-600">*</span></Label>
              <Select
                value={formData.niveauCarburant}
                onValueChange={(value) =>
                  setFormData({ ...formData, niveauCarburant: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Niveau de carburant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vide">Vide</SelectItem>
                  <SelectItem value="14">1/4</SelectItem>
                  <SelectItem value="1/2">1/2</SelectItem>
                  <SelectItem value="3/4">3/4</SelectItem>
                  <SelectItem value="Plein">Plein</SelectItem>
                </SelectContent>
              </Select>
              {errors.niveauCarburant && <p className="text-red-600 text-sm">{errors.niveauCarburant[0]}</p>}
            </div>
          </div>

          {/* Places + Portes + Kilométrage */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nombre_places">Nombre de places<span className="text-red-600">*</span></Label>
              <Input
                id="nombre_places"
                type="number"
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
                placeholder="5"
                required
              />
              {errors.place && <p className="text-red-600 text-sm">{errors.place[0]}</p>}
            </div>
            <div>
              <Label htmlFor="nombre_portes">Nombre de portes<span className="text-red-600">*</span></Label>
              <Input
                id="nombre_portes"
                type="number"
                value={formData.door}
                onChange={(e) =>
                  setFormData({ ...formData, door: e.target.value })
                }
                placeholder="4"
                required
              />
              {errors.door && <p className="text-red-600 text-sm">{errors.door[0]}</p>}
            </div>
            <div>
              <Label htmlFor="kilometrage">Kilométrage<span className="text-red-600">*</span></Label>
              <Input
                id="kilometrage"
                type="number"
                value={formData.kilometrage}
                onChange={(e) =>
                  setFormData({ ...formData, kilometrage: e.target.value })
                }
                placeholder="45000"
                required
              />
              {errors.kilometrage && <p className="text-red-600 text-sm">{errors.kilometrage[0]}</p>}
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
            {errors.dommage && <p className="text-red-600 text-sm">{errors.dommage[0]}</p>}
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
