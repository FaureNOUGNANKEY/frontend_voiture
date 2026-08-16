import { CheckCircle2, CalendarDays, Wrench, TrendingUp, type LucideIcon, CarIcon } from "lucide-react";
import type { Car, Statistics } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";


const ICONS: Record<string, LucideIcon> = {
  Car : CarIcon,
  CheckCircle2,
  CalendarDays,
  Wrench,
};

interface StatisticsProps {
  statistics: Statistics;
  onSuccess?: () => void;
}


export default function VehiculeKpis({ statistics,onSuccess }: StatisticsProps) {

  const total = statistics.totals.cars;
  const available = statistics.totals.availableCars;
  const rented = statistics.totals.rentedCars;
  const broken = statistics.totals.brokenCars;
  const fleetKpis = [
    {
      id: "total",
      label: "Total de véhicules",
      value: total.toString(),
      delta: "+4.2%",
      trend: "up" as const,
      icon: "Car",
    },
    {
      id: "available",
      label: "Disponibles",
      value: available.toString(),
      icon: "CheckCircle2",
    },
    {
      id: "rented",
      label: "En Location",
      value: rented.toString(),
      icon: "CalendarDays",
    },
    {
      id: "broken",
      label: "En Panne",
      value: broken.toString(),
      alert: "Attention",
      icon: "Wrench",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {fleetKpis.map((kpi) => {
        const Icon = ICONS[kpi.icon];

        return (
          <Card key={kpi.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="p-2 bg-slate-100 rounded-lg text-primary">
                  {Icon && <Icon size={20} />}
                </span>
                {kpi.delta && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                    {kpi.delta}
                    <TrendingUp size={14} />
                  </span>
                )}
                {kpi.alert && (
                  <span className="text-xs font-bold text-red-600">{kpi.alert}</span>
                )}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {kpi.label}
              </p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{kpi.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}