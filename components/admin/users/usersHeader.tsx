import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsersHeader() {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-semibold text-slate-900">
          Gestion des Utilisateurs
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Supervisez et gérez les comptes de votre flotte et de votre équipe
          administrative.
        </p>
      </div>
      <Button className="gap-2 p-4 shadow-sm">
        <UserPlus size={18} />
        Ajouter un utilisateur
      </Button>
    </div>
  );
}
