import { UserPlus, CreditCard, Wrench, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ICONS: Record<string, LucideIcon> = {
  UserPlus,
  CreditCard,
  Wrench,
};

export type ActivityItem = {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
};
 
export const systemActivities: ActivityItem[] = [
  {
    id: "a1",
    icon: "UserPlus",
    iconBg: "bg-slate-100",
    iconColor: "text-primary",
    title: "Nouveau client inscrit",
    description: "Sophie Martin s'est inscrite via le Web.",
    time: "Il y a 2 min",
  },
  {
    id: "a2",
    icon: "CreditCard",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    title: "Paiement reçu",
    description: "1 450,00 € confirmé pour #RES-2024-885.",
    time: "Il y a 15 min",
  },
  {
    id: "a3",
    icon: "Wrench",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    title: "Alerte entretien véhicule",
    description: "Ford Transit (TR-999-RT) signalé pour révision.",
    time: "Il y a 1 heure",
  },
];

export default function SystemActivities() {
  return (
    <Card className="shadow-sm hover:-translate-y-0.5 transition-transform">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          Activités système
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
        {systemActivities.map((activity) => {
          const Icon = ICONS[activity.icon];

          return (
            <div key={activity.id} className="flex gap-3">
              <div className={`p-2 rounded-lg h-fit ${activity.iconBg}`}>
                {Icon && <Icon size={20} className={activity.iconColor} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                <p className="text-xs text-slate-500">{activity.description}</p>
                <p className="text-[10px] text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}