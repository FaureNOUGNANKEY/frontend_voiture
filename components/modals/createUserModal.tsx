"use client";

import { useEffect, useState } from "react";
import { User, Car, Upload, X } from "lucide-react";
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
import { addUserApi, updateUserApi } from "@/api/user";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  initialData?: any;
}

export const identityDocumentTypes = [
  "Carte Nationale d'Identité",
  "Passeport",
  "Permis de conduire",
];

export const clientType =["physique", "morale"]

export const roles =['admin','client'];
export default function CreateUserModal({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    lastname: initialData?.lastname|| "",
    firstname: initialData?.firstname || "",
    type: initialData?.type || "",
    pieceType: initialData?.pieceType || "",
    pieceNumber: initialData?.pieceNumber || "",
    address: initialData?.address || "",
    photo: initialData?.photo || null,
    phone: initialData?.phone || "",
    role: initialData?.role|| "",
    email: initialData?.email || "",
    password: initialData?.password || "00000000",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    if (initialData){
      setFormData({
      lastname: initialData?.lastname|| "",
      firstname: initialData?.firstname || "",
      type: initialData?.type || "",
      pieceType: initialData?.pieceType || "",
      pieceNumber: initialData?.pieceNumber || "",
      address: initialData?.address || "",
      photo: initialData?.photo || "",
      phone: initialData?.phone || "",
      role: initialData?.role|| "",
      email: initialData?.email || "",
      password: initialData?.password || "00000000",
    });
    setPreview(initialData.photo_url || null);
    console.log("initial data : ", initialData);
    }
  },[initialData])

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
      if(initialData){
        await updateUserApi(initialData.id,data)
      }else{
         await addUserApi(data);
      }
      onSuccess?.();
      onOpenChange(false);
      setFormData({
        lastname: "",
        firstname: "",
        type: "",
        pieceType: "",
        pieceNumber:"",
        address: "",
        photo: null,
        phone: "",
        role: "",
        email: "",
        password:"00000000",
      });
      setPreview(null);
    }
    catch (error: any) {
    if (error.response && error.response.data.errors) {
        // récupèration des erreurs de validation
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /users :", error.response?.data || error.message);
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
            <User className="w-6 h-6" />
            {initialData ? "Modifier l'utilisateur" : "Nouveau utilisateur"}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de l'utilisateur
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo */}
          <div>
            <Label>Photo de l'utilisateur</Label>
            <div className="mt-2">
              {preview ||formData?.photo ?(
                <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                  <img
                    src={preview||formData?.photo }
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
          
          {/* Nom + Prénoms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">
                Nom <span className="text-red-600">*</span>
              </Label>
              <Input
                id="nom"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                placeholder="Ex: Dupont"
                required
              />
              {errors.lastname && <p className="text-red-600 text-sm">{errors.lastname[0]}</p>}
            </div>
            <div>
              <Label htmlFor="prenoms">
                Prénoms <span className="text-red-600">*</span>
              </Label>
              <Input
                id="prenoms"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                placeholder="Ex: Jean Pierre"
                required
              />
              {errors.firstname && <p className="text-red-600 text-sm">{errors.firstname[0]}</p>}
            </div>
          </div>

          {/* Type de piece + Numéro de la pièce */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                Type de piece <span className="text-red-600">*</span>
              </Label>
              <Select
                value={formData.pieceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, pieceType: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le type de pièce" />
                </SelectTrigger>
                <SelectContent>
                  {identityDocumentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="numero_piece">
                Numéro de pièce <span className="text-red-600">*</span>
              </Label>
              <Input
                id="numero_piece"
                value={formData.pieceNumber}
                onChange={(e) =>
                  setFormData({ ...formData, pieceNumber: e.target.value })
                }
                placeholder="Ex: 123456789"
                required
              />
              {errors.pieceNumber && <p className="text-red-600 text-sm">{errors.pieceNumber[0]}</p>}
            </div>
        </div>
            {/* Téléphone + email*/}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="telephone">
                    Téléphone <span className="text-red-600">*</span>
                    </Label>
                    <Input
                    id="telephone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Ex: +228 90 12 34 56"
                    required
                    />
                    {errors.phone && <p className="text-red-600 text-sm">{errors.phone[0]}</p>}
                </div>

                <div>
                    <Label htmlFor="email">
                    E-mail <span className="text-red-600">*</span>
                    </Label>
                    <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Ex: exemple@gmail.com"
                    required
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
                </div>
            </div>
            
            {/* Adresse + rôle*/}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="adresse">
                    Adresse <span className="text-red-600">*</span>
                    </Label>
                    <Input
                    id="adresse"
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Ex: Lomé, Tokoin"
                    required
                    />
                    {errors.address && <p className="text-red-600 text-sm">{errors.address[0]}</p>}
                </div>
                <div>
                    <Label>
                        Rôle <span className="text-red-600">*</span>
                    </Label>
                    <Select
                        value={formData.role}
                        onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                        }
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner le rôle" />
                        </SelectTrigger>
                        <SelectContent>
                        {roles.map((r) => (
                            <SelectItem key={r} value={r}>
                            {r}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
            </div>
            {/* Type de client + mots de passe par defaut */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <Label>
                    Type de client 
                    {/* <span className="text-red-600">*</span> */}
                </Label>
                <Select
                    value={formData.type}
                    onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                    }
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner le type client" />
                    </SelectTrigger>
                    <SelectContent>
                    {clientType.map((type) => (
                        <SelectItem key={type} value={type}>
                        {type}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                {/* <div>
                    <Label htmlFor="password">
                        Mot de passe par défaut <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="password"
                        value={formData.password}
                        onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Ex: ********"
                        required
                    />
                    {errors.password && <p className="text-red-600 text-sm">{errors.password[0]}</p>}
                    </div> */}
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
                  : "Créer l'utilisateur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}