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

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const { login, getCurrentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginApi({ email, password });
      console.log("Connexion réussie :", response.data);

      toast.success("Bienvenue ! Vous êtes connecté avec succès.");

      login(response.data.token, false);
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
    <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {globalError && (
          <p className="text-red-600 text-sm text-center mt-2">{globalError}</p>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-500">
            Adresse e-mail
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
              placeholder="vous@email.com"
              className="pl-10"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-slate-500">
              Mot de passe
            </Label>
            <a
              href="#"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Mot de passe oublié ?
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-slate-500 font-normal cursor-pointer"
          >
            Rester connecté
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full py-6 text-base font-semibold gap-2 transition-colors ${
            isLoading
              ? "bg-emerald-600 hover:bg-emerald-600"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Connexion...
            </>
          ) : (
            <>
              Se connecter
              <LogIn size={18} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
