"use client";

import { useState } from "react";
import { Upload, User, X } from "lucide-react";
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

interface CreateDriverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any;
}

export default function CreateDriverModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: CreateDriverModalProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || "",
    prenom: initialData?.prenom || "",
    telephone: initialData?.telephone || "",
    photo: null as File | null,
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

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value as any);
      }
    });

    try {
      const response = await fetch("/api/drivers", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        onSuccess?.();
        onOpenChange(false);
        setFormData({
          nom: "",
          prenom: "",
          telephone: "",
          photo: null,
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
            <User className="w-6 h-6" />
            {initialData ? "Modifier le chauffeur" : "Ajouter un chauffeur"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du chauffeur
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <div>
            <Label>Photo du chauffeur</Label>
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

          {/* Nom + Prénom */}
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
              <Label htmlFor="prenom">
                Prénom <span className="text-red-600">*</span>
              </Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                placeholder="Ex: Jean"
                required
              />
            </div>
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
                  : "Ajouter le chauffeur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}