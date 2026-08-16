import { CarFront, CircleGauge, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ICONS: Record<string, LucideIcon> = {
  CarFront,
  CircleGauge,
};

export type Incident = {
  id: string;
  vehicle: string;
  plate: string;
  severity: "Critique" | "Mineur";
  description: string;
  reportedOn: string;
  icon: string;
};
 
export const incidents: Incident[] = [
  {
    id: "i1",
    vehicle: "Renault Master",
    plate: "EE-789-FF",
    severity: "Critique",
    description: "Problème moteur : Surchauffe signalée par le capteur.",
    reportedOn: "14/11/2023",
    icon: "CarFront",
  },
  {
    id: "i2",
    vehicle: "Peugeot 208",
    plate: "JK-222-LL",
    severity: "Mineur",
    description: "Pneu arrière gauche : Crevaison lente suspectée.",
    reportedOn: "15/11/2023",
    icon: "CircleGauge",
  },
];

const SEVERITY_CLASSES: Record<Incident["severity"], { badge: string; icon: string }> = {
  Critique: { badge: "text-red-600", icon: "bg-red-100 text-red-600" },
  Mineur: { badge: "text-amber-600", icon: "bg-amber-100 text-amber-600" },
};

export default function IncidentsList() {
  return (
    <Card className="shadow-sm overflow-hidden py-0">
      <CardHeader className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold text-slate-900">
          Pannes en cours
        </CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">
          Voir tout
        </Button>
      </CardHeader>

      <CardContent className="p-0 divide-y divide-slate-200">
        {incidents.map((incident) => {
          const Icon = ICONS[incident.icon];
          const styles = SEVERITY_CLASSES[incident.severity];

          return (
            <div key={incident.id} className="p-4 flex gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${styles.icon}`}>
                {Icon && <Icon size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-slate-900">
                    {incident.vehicle} ({incident.plate})
                  </p>
                  <span className={`font-mono text-[11px] font-bold ${styles.badge}`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-slate-500 text-[13px] line-clamp-1">
                  {incident.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-slate-500 text-[11px]">
                    Signalé le : {incident.reportedOn}
                  </span>
                  <button
                    type="button"
                    className="text-primary text-[11px] font-bold px-3 py-1 bg-blue-100 rounded-full"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}