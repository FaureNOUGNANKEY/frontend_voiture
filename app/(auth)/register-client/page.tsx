import RegisterForm from "@/components/client/auth/registerForm";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <main className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-100/50">
            <UserPlus size={28} className="text-primary" />
          </div>
          <h1 className="text-3xl font-semibold text-primary tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Renseignez vos informations pour rejoindre Easy Car Rental.
          </p>
        </div>

        <RegisterForm />

        <p className="text-center text-sm text-slate-500 mt-6">
          Vous avez déjà un compte ?{" "}
          <Link href="/login-client" className="text-primary font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </main>
    </div>
  );
}