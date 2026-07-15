// components/home/Services.tsx
import { Clock, User, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Clock,
    title: "Courte/Longue Durée",
    desc: "Louez pour un weekend ou plusieurs mois avec des tarifs dégressifs et une flexibilité totale sur le kilométrage.",
    button: "EN SAVOIR PLUS",
  },
  {
    icon: User,
    title: "Chauffeurs Privés",
    desc: "Profitez d’un trajet serein avec nos chauffeurs professionnels multilingues pour vos déplacements business ou VIP.",
    button: "RÉSERVER UN CHAUFFEUR",
  },
  {
    icon: Briefcase,
    title: "Solutions Business",
    desc: "Portail dédié pour les entreprises avec facturation centralisée et gestion optimisée des réservations collaborateurs.",
    button: "ACCÈS PRO",
  },
];

export default function HomeServices() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Nos Services Mobilité</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des solutions flexibles adaptées à chaque profil, de la location
            ponctuelle à la gestion de flotte d’entreprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm hover:shadow-2xl transition-all"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full items-start">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.desc}</p>
                </div>
                <Button
                  variant={"link"}
                  className="text-primary font-medium gap-2"
                >
                  {service.button} <ArrowRight />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
