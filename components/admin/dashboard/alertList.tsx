import { TriangleAlert, History, Wrench, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  TriangleAlert,
  History,
  Wrench,
};

export type Alert = {
  id: string;
  type: "error" | "info" | "warning";
  icon: string;
  title: string;
  description: string;
  time: string;
};
 
export const alerts: Alert[] = [
  {
    id: "a1",
    type: "error",
    icon: "TriangleAlert",
    title: "Panne Signalée : VW Golf 8",
    description: "Problème moteur détecté par le capteur OBD-II.",
    time: "Il y a 14 min",
  },
  {
    id: "a2",
    type: "info",
    icon: "History",
    title: "Fin de contrat imminente",
    description: "Contrat #INV-2401 de M. Dupont se termine demain.",
    time: "Il y a 2h",
  },
  {
    id: "a3",
    type: "warning",
    icon: "Wrench",
    title: "Maintenance préventive",
    description: "3 véhicules nécessitent une vidange (Kilométrage atteint).",
    time: "Il y a 4h",
  },
];

const TYPE_CLASSES: Record<Alert["type"], { wrap: string; icon: string }> = {
  error: { wrap: "bg-red-50 border-red-200", icon: "text-red-600" },
  info: { wrap: "bg-slate-100 border-slate-200", icon: "text-primary" },
  warning: { wrap: "bg-amber-50 border-amber-200", icon: "text-amber-600" },
};

export default function AlertsList() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Alertes Récentes</h3>
        <button type="button" className="text-primary text-sm font-semibold">
          Tout voir
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = ICONS[alert.icon];
          const styles = TYPE_CLASSES[alert.type];

          return (
            <div
              key={alert.id}
              className={`flex gap-3 p-3 rounded-lg border ${styles.wrap}`}
            >
              {Icon && <Icon className={`mt-1 shrink-0 ${styles.icon}`} size={20} />}
              <div>
                <p className="text-sm font-bold text-slate-900">{alert.title}</p>
                <p className="text-xs text-slate-500">{alert.description}</p>
                <span className="text-[10px] text-slate-400 font-mono">
                  {alert.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}