import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Statistics } from "@/lib/types";


interface statatisticsProps{
  statistics : Statistics | null
}

export default function DriverAvailability( {statistics}:statatisticsProps ) {
  const router = useRouter();

  const busy = statistics?.totals.busyDrivers ?? 0;
  const available = statistics?.totals.availableDrivers ?? 0;
  const unavailable = statistics?.totals.unAvailableDrivers ?? 0;
  const total = statistics?.totals.drivers ?? 0;

  const getPercent = (value: number) =>
    total > 0 ? ((value / total) * 100).toFixed(2) : "0.00";

  const driverAvailability = [
    {
      id: "on-duty",
      label: "En service",
      detail: `${busy} conducteurs en circulation`,
      percent: getPercent(busy),
      color: "bg-emerald-500",
    },
    {
      id: "standby",
      label: "En attente",
      detail: `${available} conducteurs à la base`,
      percent: getPercent(available),
      color: "bg-blue-300",
    },
    {
      id: "unavailable",
      label: "Indisponible",
      detail: `${unavailable} conducteurs en congé`,
      percent: getPercent(unavailable),
      color: "bg-red-500",
    },
  ];


  return (
    <Card className="shadow-sm hover:-translate-y-0.5 transition-transform">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold text-primary">
          Disponibilité des conducteurs
        </CardTitle>
        <Users className="text-primary" size={20} />
      </CardHeader>

      <CardContent className="space-y-4">
        {driverAvailability.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-8 rounded-full ${item.color}`} />
              <div>
                <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                <p className="text-xs text-slate-500">{item.detail}</p>
              </div>
            </div>
            <span className="font-bold text-sm">{item.percent}%</span>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full mt-2 border-primary text-primary hover:bg-blue-50"
          onClick={() => router.push('/admin/drivers')}
        >
          Gérer les équipes
        </Button>
      </CardContent>
    </Card>
  );
}