"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Status = "idle" | "loading" | "success";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const { login } = useAuth();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Mock : simule un appel API puis un succès, à remplacer par un vrai call auth.
  //   setStatus("loading");
  //   setTimeout(() => {
  //     setStatus("success");
  //     setTimeout(() => setStatus("idle"), 1200);
  //   }, 1500);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginApi({ email, password });
      console.log("Connexion réussie :", response.data);

      toast.success("Bienvenue ! Connexion réussie.");

      login(response.data.token, true);
    } catch (error: any) {
      if (error.response?.status === 422 && error.response.data.errors) {
        setErrors(error.response.data.errors);
        setGlobalError(null);
      } else if (error.response?.status === 401) {
        setGlobalError(error.response.data.message || "Identifiants invalides");
        setErrors({});
      }
      // else {
      //   console.error("Erreur API /login :", error.response?.data || error.message);
      //   setGlobalError("Une erreur inattendue est survenue. Réessayez plus tard.");
      //   setStatus("idle");
      // }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur border border-slate-200 p-8 rounded-xl shadow-2xl">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {globalError && (
          <p className="text-red-600 text-sm text-center mt-2">{globalError}</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="px-1 text-slate-500">
            Adresse Email Professionnelle
          </Label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@easycarrental.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <Label htmlFor="password" className="text-slate-500">
              Mot de passe
            </Label>
            <a
              href="#"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Oublié ?
            </a>
          </div>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-slate-500 font-normal cursor-pointer"
          >
            Se souvenir de cet appareil
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full py-6 text-base font-semibold gap-2 transition-all ${
            isLoading
              ? "bg-emerald-600 hover:bg-emerald-600"
              : "bg-blue-100 text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Chargement...
            </>
          ) : (   
            <>
              Se connecter
              <LogIn size={18} />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          Problème d&apos;accès ?{" "}
          <a href="#" className="text-primary font-semibold hover:underline">
            Contacter le support IT
          </a>
        </p>
      </div>
    </div>
  );
}
