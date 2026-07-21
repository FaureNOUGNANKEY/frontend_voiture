import { Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const driverAvailability = [
  { id: "on-duty", label: "En service", detail: "14 conducteurs en circulation", percent: 65, color: "bg-emerald-500" },
  { id: "standby", label: "En attente", detail: "6 conducteurs à la base", percent: 28, color: "bg-blue-300" },
  { id: "unavailable", label: "Indisponible", detail: "2 conducteurs en congé", percent: 7, color: "bg-red-500" },
];

export default function DriverAvailability() {
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
        >
          Gérer les équipes
        </Button>
      </CardContent>
    </Card>
  );
}