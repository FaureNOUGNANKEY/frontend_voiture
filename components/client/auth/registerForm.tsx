"use client";

import { useState, useRef } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  IdCard,
  ImagePlus,
  Loader2,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "loading" | "success";

export const identityDocumentTypes = [
  "Carte Nationale d'Identité",
  "Passeport",
  "Permis de conduire",
];
 
export const userRoles = ["Client", "Chauffeur", "Agent"];

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock : à remplacer par un vrai appel API de création de compte.
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 1500);
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Photo */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-24 h-24 border-4 border-slate-100">
            <AvatarImage src={photoPreview ?? undefined} alt="Photo de profil" />
            <AvatarFallback className="bg-slate-100 text-slate-400">
              <User size={32} />
            </AvatarFallback>
          </Avatar>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus size={16} />
            {photoPreview ? "Changer la photo" : "Ajouter une photo"}
          </Button>
        </div>

        {/* Nom / Prénoms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-slate-500">
              Nom
            </Label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input id="lastName" required placeholder="Dupont" className="pl-10" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-slate-500">
              Prénoms
            </Label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input id="firstName" required placeholder="Jean Pierre" className="pl-10" />
            </div>
          </div>
        </div>

        {/* Email / Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-500">
              E-mail
            </Label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input id="email" type="email" required placeholder="jean.dupont@email.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-slate-500">
              Téléphone
            </Label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input id="phone" type="tel" required placeholder="+33 6 12 34 56 78" className="pl-10" />
            </div>
          </div>
        </div>

        {/* Mot de passe */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-slate-500">
            Mot de passe
          </Label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Pièce d'identité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-slate-500">Type de pièce d&apos;identité</Label>
            <Select required>
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Sélectionner un type..." />
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
          <div className="space-y-1.5">
            <Label htmlFor="documentNumber" className="text-slate-500">
              Numéro de la pièce
            </Label>
            <div className="relative">
              <IdCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input id="documentNumber" required placeholder="Ex: 123456789" className="pl-10" />
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="space-y-1.5">
          <Label htmlFor="address" className="text-slate-500">
            Adresse
          </Label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-slate-400" />
            <Textarea
              id="address"
              required
              rows={2}
              placeholder="15 Avenue des Champs-Élysées, 75008 Paris"
              className="pl-10"
            />
          </div>
        </div>

        {/* Rôle */}
        <div className="space-y-1.5">
          <Label className="text-slate-500">Rôle</Label>
          <Select required>
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Sélectionner un rôle..." />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={status !== "idle"}
          className={`w-full py-6 text-base font-semibold gap-2 mt-2 transition-colors ${
            status === "success"
              ? "bg-emerald-600 hover:bg-emerald-600"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {status === "idle" && (
            <>
              <UserPlus size={18} />
              Créer le compte
            </>
          )}
          {status === "loading" && (
            <>
              <Loader2 size={18} className="animate-spin" />
              Création en cours...
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 size={18} />
              Compte créé !
            </>
          )}
        </Button>
      </form>
    </div>
  );
}