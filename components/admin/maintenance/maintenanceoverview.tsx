import { CarFront, Hourglass, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


export const maintenanceOverview = {
  immobilized: { value: "12", trend: "+2 par rapport à hier" },
  activeRepairs: { value: "08", capacity: "45% de la capacité atelier" },
  monthlyBudget: {
    total: "45 280 FCFA",
    urgent: "28k",
    routine: "17k",
  },
};

export default function MaintenanceOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Véhicules immobilisés */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <CarFront size={22} className="text-red-600" />
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              Critique
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">VÉHICULES IMMOBILISÉS</p>
          <h2 className="text-4xl font-bold text-slate-900">{maintenanceOverview.immobilized.value}</h2>
          <p className="text-xs text-slate-500 mt-2">{maintenanceOverview.immobilized.trend}</p>
        </CardContent>
      </Card>

      {/* Réparations actives */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <Hourglass size={22} className="text-primary" />
            <span className="text-xs font-semibold text-primary bg-blue-100 px-2 py-0.5 rounded-full">
              En cours
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500">RÉPARATIONS ACTIVES</p>
          <h2 className="text-4xl font-bold text-slate-900">{maintenanceOverview.activeRepairs.value}</h2>
          <p className="text-xs text-slate-500 mt-2">{maintenanceOverview.activeRepairs.capacity}</p>
        </CardContent>
      </Card>

      {/* Budget maintenance */}
      <Card className="shadow-sm md:col-span-2 bg-primary text-white border-primary relative overflow-hidden">
        <CardContent className="p-6 relative z-10">
          <p className="text-xs font-semibold opacity-80">BUDGET MAINTENANCE ESTIMÉ (MOIS)</p>
          <h2 className="text-4xl font-bold mb-4">{maintenanceOverview.monthlyBudget.total}</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs">Urgent: {maintenanceOverview.monthlyBudget.urgent}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-300" />
              <span className="text-xs">Routine: {maintenanceOverview.monthlyBudget.routine}</span>
            </div>
          </div>
        </CardContent>
        <Wallet size={180} className="absolute -right-8 -bottom-8 text-white/10" />
      </Card>
    </div>
  );
}