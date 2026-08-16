import { CheckCircle2, AlertTriangle, PhoneCall } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export type ActivityLogItem = {
  id: string;
  type: "success" | "alert";
  title: string;
  meta: string;
  time: string;
};
 
export const activityLog: ActivityLogItem[] = [
  {
    id: "l1",
    type: "success",
    title: "Vidange & Filtres terminée - Volvo FH16",
    meta: "Mécanicien: Jean Dupont • Coût final: 420 €",
    time: "Il y a 2h",
  },
  {
    id: "l2",
    type: "alert",
    title: "Nouvelle panne signalée - Scania R450",
    meta: "Signalé par: Chauffeur Marc L. • Problème boîte de vitesse.",
    time: "Il y a 5h",
  },
];

export default function MaintenanceActivityAndSupport() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
      {/* Journal des interventions récentes */}
      <Card className="shadow-sm lg:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Journal des interventions récentes
          </h3>

          <div className="space-y-4">
            {activityLog.map((item) => (
              <div key={item.id} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  {item.type === "success" ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : (
                    <AlertTriangle size={18} className="text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <span className="text-xs text-slate-400 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-500">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support technique */}
      <Card className="shadow-sm bg-blue-100 text-primary border-blue-100">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold mb-2">Besoin d&apos;assistance technique ?</h3>
            <p className="text-sm opacity-90 mb-6">
              Contactez directement notre réseau de partenaires agréés pour une intervention rapide.
            </p>
          </div>
          <Button className="w-full gap-2 p-4 text-white hover:bg-primary/90">
            <PhoneCall size={18} />
            Appeler l&apos;assistance
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}