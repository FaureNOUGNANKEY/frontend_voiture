import { Statistics } from "@/lib/types";
import { Car, CalendarRange, Users, Wallet, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Car,
  CalendarRange,
  Users,
  Wallet,
};

const ACCENT_CLASSES: Record<Kpi["accent"], { icon: string; bar: string }> = {
  primary: { icon: "text-primary", bar: "bg-primary" },
  secondary: { icon: "text-emerald-600", bar: "bg-emerald-600" },
  tertiary: { icon: "text-amber-600", bar: "bg-amber-500" },
};

export type Kpi = {
  id: string;
  label: string;
  value: number;
  delta: string;
  trend: "up" | "down";
  icon: string; // nom d'icône lucide-react
  progress: number; // 0-100
  accent: "primary" | "secondary" | "tertiary";
};


interface StatisticProps {
  statistics: Statistics | null;
}

export default function KpiCard({ statistics}:StatisticProps ) {

  const Kpis: Kpi[] = [
    {
      id: "vehicles",
      label: "Total Véhicules",
      value: statistics?.totals.cars ??0,
      delta: "+4.2%",
      trend: "up",
      icon: "Car",
      progress: 85,
      accent: "primary",
    },
    {
      id: "reservations",
      label: "Réservations Actives",
      value: statistics?.totals.activeReservations ??0,
      delta: "+12%",
      trend: "up",
      icon: "CalendarRange",
      progress: 62,
      accent: "secondary",
    },
    {
      id: "drivers",
      label: "Chauffeurs Dispos",
      value: statistics?.totals.availableDrivers??0,
      delta: "-2.1%",
      trend: "down",
      icon: "Users",
      progress: 45,
      accent: "tertiary",
    },
    {
      id: "revenue",
      label: "Revenus Mensuels",
      value: statistics?.totals.monthlyRevenue??0,
      delta: "+8.4%",
      trend: "up",
      icon: "Wallet",
      progress: 78,
      accent: "primary",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
      {Kpis.map((kpi) => {
        const Icon = ICONS[kpi.icon];
        const accent = ACCENT_CLASSES[kpi.accent]; 
        return (
        <div key={kpi.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-1 shadow-sm">
          <div className="flex justify-between items-start">
            <span className={`p-2 bg-slate-100 rounded-lg ${accent.icon}`}>
              {Icon && <Icon size={20} />}
            </span>
            <span
              className={`text-xs font-semibold flex items-center ${
                kpi.trend === "up" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {kpi.delta}
            </span>
          </div>

          <div className="mt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {kpi.label}
            </p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">
              {kpi.value}
            </h3>
          </div>

          <div className="h-1 bg-slate-200 rounded-full mt-2">
            <div
              className={`h-full rounded-full ${accent.bar}`}
              style={{ width: `${kpi.progress}%` }}
            />
          </div>
        </div>
        );
      })}
    </div>
  );
}