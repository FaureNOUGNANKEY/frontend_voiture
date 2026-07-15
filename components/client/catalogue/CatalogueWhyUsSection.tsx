// components/home/WhyUsSection.tsx
import { Button } from "@/components/ui/button";
import { Shield, Clock, Smartphone, Building } from "lucide-react";

export default function CatalogueWhyUsSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Pourquoi Easy Car Rental ?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Véhicules Certifiés</h3>
            <p className="text-gray-600">
              Chaque véhicule passe par 50 points de contrôle avant chaque location. Fiabilité totale garantie pour vos déplacements.
            </p>
            <div className="flex mt-6">
              <div className="bg-blue-900 text-white text-xs px-3 py-1 rounded">J</div>
              <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded">M</div>
              <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded">S</div>
              <span className="text-sm text-gray-500 ml-2">+ 2,000 clients satisfaits</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-950 text-white p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Assistance 24/7</h3>
              <p className="text-blue-100">
                Une équipe dédiée prête à intervenir partout en Europe en moins de 45 minutes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
              <Smartphone className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Gestion Mobile</h3>
            <p className="text-gray-600">
              Modifiez vos réservations et accédez à vos factures depuis notre application mobile.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-3xl relative overflow-hidden">
            <div>
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Building className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Solutions Entreprise</h3>
              <p className="text-gray-600">
                Des solutions sur mesure pour les besoins de plus de 5 véhicules. Optimisez vos coûts opérationnels dès aujourd’hui.
              </p>
            </div>
            <Button variant={"link"} className="text-blue-600 text-md font-medium mt-8 flex items-center gap-2 hover:underline">
              En savoir plus →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}