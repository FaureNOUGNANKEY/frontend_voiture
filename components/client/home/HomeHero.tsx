"use client";
// components/home/Hero.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="bg-white pt-16 pb-10">
      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            SOLUTION Easy Car Rental
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Location de véhicules
            <br />
            <span className="text-primary">professionnelle et particulier</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg">
            Découvrez une expérience de mobilité supérieure avec Easy Car
            Rental. Large choix de modèles récents, maintenance rigoureuse, avec
            ou sans chauffeur.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => router.push("/client/catalogue")}
              className="text-lg p-6 bg-primary text-white"
            >
              Parcourir le catalogue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="text-lg p-6" variant="outline">
              Nos solutions Fleet
            </Button>
          </div>
        </div>

        {/* Image Hero */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
            alt="Tesla Model S Plaid"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              DISPONIBLE MAINTENANT
            </p>
            <p className="text-xl font-semibold">Tesla Model S Plaid</p>
            <p className="text-green-600 font-medium">70 000 FCFA / jour</p>
          </div>
        </div>
      </div>

      {/* Stat section */}
      <div className="max-w-7xl mx-auto px-6 py-8 mt-10">
        <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Flotte Active */}
          <div>
            <div className="text-4xl font-bold text-primary mb-1">450+</div>
            <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
              FLOTTE ACTIVE
            </div>
          </div>

          {/* Clients Satisfaits */}
          <div>
            <div className="text-4xl font-bold text-primary mb-1">12k</div>
            <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
              CLIENTS SATISFAITS
            </div>
          </div>

          {/* Villes Couvertes */}
          <div>
            <div className="text-4xl font-bold text-primary mb-1">24</div>
            <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
              VILLES COUVERTES
            </div>
          </div>

          {/* Note Service */}
          <div>
            <div className="flex items-center justify-center gap-1 text-4xl font-bold text-primary mb-1">
              4.9
              <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
              NOTE SERVICE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
