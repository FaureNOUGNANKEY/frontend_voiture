import { Zap, BadgeCheck, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ICONS = { BadgeCheck, Clock, Zap };

export const reductionRules = [
  { id: "loyalty", icon: "BadgeCheck", text: "Fidélité (Niv 3+) : -10% de réduction automatique." },
  { id: "duration", icon: "Clock", text: "Durée (7j+) : Surclassement gratuit en Classe Executive." },
  { id: "ev", icon: "Zap", text: "Incitatif VE : Frais de livraison gratuits pour la flotte électrique." },
];

export default function ReductionEngine() {
  return (
    <Card className="shadow-sm bg-primary text-white border-primary hover:-translate-y-0.5 transition-transform">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold text-white">
          Moteur de réduction
        </CardTitle>
        <Zap size={20} />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-white/90 mb-4">
          Règles en direct appliquées aux réservations entrantes basées sur les données historiques.
        </p>

        <ul className="space-y-3">
          {reductionRules.map((rule) => {
            const Icon = ICONS[rule.icon as keyof typeof ICONS];
            return (
              <li key={rule.id} className="flex items-start gap-2 text-sm bg-white/10 p-2 rounded">
                <Icon size={18} className="shrink-0 mt-0.5" />
                <span>{rule.text}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
          <span className="text-xs font-bold uppercase">État du système : Actif</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}