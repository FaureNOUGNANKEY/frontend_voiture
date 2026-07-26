import LoginForm from "@/components/admin/login/loginForm";
import { Car, ShieldCheck, Shield } from "lucide-react";


export default function LoginPage() {
  return (
    <div className="h-screen bg-slate-50 flex items-center justify-center p-4 md:p-0 overflow-hidden relative">
      <main className="relative w-full max-w-[440px] z-10">
        {/* Logo et branding */}
        <div className="flex flex-col items-center mb-8">
          <img src="/appLogo.png" alt="logo" width={200}/>
          <p className="text-sm text-slate-500 mt-4">Portail Administration Sécurisé</p>
        </div>

        {/* Formulaire */}
        <LoginForm />

        {/* Badges de sécurité */}
        <div className="mt-6 flex items-center justify-center gap-4 text-slate-400 opacity-70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} />
            <span className="text-xs font-semibold">Chiffrement AES-256</span>
          </div>
          <div className="w-px h-3 bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <Shield size={16} />
            <span className="text-xs font-semibold">Auth Multi-Facteurs</span>
          </div>
        </div>
      </main>

      {/* Décoration gauche */}
      <div className="hidden lg:block fixed left-12 bottom-12 max-w-xs pointer-events-none">
        <div className="flex flex-col gap-2">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-2xl font-semibold text-primary opacity-20 uppercase tracking-widest leading-none">
            Spark
            <br />
            Corporations
            <br />
          </p>
        </div>
      </div>

      {/* Décoration droite : image contextuelle */}
      <div className="hidden xl:flex fixed right-0 top-0 h-full w-[35%] items-center justify-end pr-10 pointer-events-none">
        <div className="w-full h-[80%] rounded-l-[40px] overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=1000&fit=crop"
            alt="Flotte de véhicules premium"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}