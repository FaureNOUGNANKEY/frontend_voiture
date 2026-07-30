import { UserCheck, CalendarDays, Wrench, TrendingUp, type LucideIcon, Users, UserX } from "lucide-react";
import type { Statistics } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";


const ICONS: Record<string, LucideIcon> = {
  Users,
  UserCheck,
  CalendarDays,
  Wrench,
  UserX,
};

interface StatisticProps {
  statistics: Statistics;
}


export default function DriversKpis({ statistics }: StatisticProps) {

  const total = statistics.totals.drivers;
  const available = statistics.totals.availableDrivers;
  const busy = statistics.totals.busyDrivers;
  const unAvailable = statistics.totals.unAvailableDrivers;
  const fleetKpis = [
    {
      id: "total",
      label: "Total de conducteurs",
      value: total.toString(),
      delta: "+4.2%",
      trend: "up" as const,
      icon: "Users",
    },
    {
      id: "available",
      label: "Disponibles",
      value: available.toString(),
      icon: "UserCheck",
    },
    {
      id: "busy",
      label: "En Course",
      value: busy.toString(),
      icon: "CalendarDays",
    },
    {
      id: "unAvailable",
      label: "Indisponibles",
      value: unAvailable.toString(),
      alert: "Attention",
      icon: "UserX",
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