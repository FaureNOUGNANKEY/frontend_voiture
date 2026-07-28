import UserLoginForm from "@/components/client/auth/userLoginForm";
import { Car } from "lucide-react";
import Link from "next/link";

export default function UserLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <main className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          {/* Logo et branding */}
          <div className="flex flex-col items-center mb-4">
            <img src="/appLogo.png" alt="logo" width={200} />
          </div>

          <p className="text-sm text-slate-500 mt-1">
            Connectez-vous à votre espace
          </p>
        </div>

        <UserLoginForm />

        <p className="text-center text-sm text-slate-500 mt-6">
          Pas encore de compte ?{" "}
          <Link
            href="/register-client"
            className="text-primary font-semibold hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </main>
    </div>
  );
}
