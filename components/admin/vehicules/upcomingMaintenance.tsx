import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type UpcomingService = {
  id: string;
  vehicle: string;
  plate: string;
  reason: string;
  day: string;
  month: string;
};
 
export const upcomingServices: UpcomingService[] = [
  {
    id: "s1",
    vehicle: "BMW X5",
    plate: "ZZ-090-KK",
    reason: "Révision des 60 000 km",
    day: "22",
    month: "Nov",
  },
  {
    id: "s2",
    vehicle: "Citroën C4",
    plate: "RR-444-TT",
    reason: "Contrôle Technique Obligatoire",
    day: "25",
    month: "Nov",
  },
];

export default function UpcomingMaintenance() {
  return (
    <Card className="shadow-sm overflow-hidden py-0">
      <CardHeader className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold text-slate-900">
          Prochaines Révisions
        </CardTitle>
        <Button variant="link" className="text-primary p-0 h-auto">
          Planifier
        </Button>
      </CardHeader>

      <CardContent className="p-6 flex flex-col gap-3">
        {upcomingServices.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 hover:border-primary transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 flex flex-col items-center justify-center bg-slate-100 rounded text-primary border border-slate-200">
              <span className="font-bold text-base leading-none">{service.day}</span>
              <span className="text-[10px] uppercase font-bold mt-0.5">{service.month}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">
                {service.vehicle} ({service.plate})
              </p>
              <p className="text-xs text-slate-500">{service.reason}</p>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}