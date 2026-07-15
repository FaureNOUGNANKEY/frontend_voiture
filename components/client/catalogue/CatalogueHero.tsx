import { Search, MapPin, Calendar, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CatalogueHero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609521263047-f8f205293f24')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          La Mobilité Simple,
          <br />
          Sans Compromis.
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10">
          Réservez votre prochain véhicule en quelques clics. Easy Car Rental
          redéfinit les standards de la location moderne.
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-3">
            {/* Lieu */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-medium px-3 pt-2 mb-2">
                LIEU DE PRISE
              </label>
              <div className="flex items-center px-3 py-0.5 bg-gray-200 rounded-lg">
                <MapPin className="text-gray-400 mr-2" />
                <Input
                  placeholder="Paris, Lyon, M..."
                  className="border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-medium px-3 pt-2 mb-2">
                DATE DE DÉBUT
              </label>
              <div className="flex items-center px-3 py-0.5 bg-gray-200 rounded-lg">
                <Calendar className="text-gray-400 mr-2" />
                <Input
                  type="date"
                  className="border-0 focus-visible:ring-0 text-gray-900"
                />
              </div>
            </div>

            {/* Type véhicule */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-medium px-3 pt-2 mb-2">
                TYPE DE VÉHICULE
              </label>
              <Select>
                <SelectTrigger className="px-3 py-4 w-full border-0 text-black bg-gray-200">
                  <SelectValue placeholder="Berlin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="berline">Berline</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="electrique">Électrique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button size="lg" className="w-full h-12 text-base font-medium">
                <Search className="mr-2 h-5 w-5" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
