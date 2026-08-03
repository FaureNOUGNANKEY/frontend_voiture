"use client";

import { useEffect, useState } from "react";
import { Search, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { getCarsApi } from "@/api/car";
import { Car } from "@/lib/types";

const vehicles = [
  {
    id: 1,
    name: "Luxe Elite Sedan",
    type: "Berline",
    price: 85000, // en FCFA
    places: 5,
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    badge: "Populaire",
  },
  {
    id: 2,
    name: "Titan X7 Voyager",
    type: "SUV",
    price: 120000,
    places: 7,
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1533473359334-0135d6f3e2c0",
    badge: "Nouveauté",
  },
  {
    id: 3,
    name: "E-Spark Compact",
    type: "Électrique",
    price: 65000,
    places: 4,
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1593941707882-5f0f3a5f3a0e",
  },
  {
    id: 4,
    name: "Transporter Pro Max",
    type: "Utilitaire",
    price: 95000,
    places: 3,
    transmission: "Manuelle",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
  },
  {
    id: 5,
    name: "Urban Explorer",
    type: "SUV",
    price: 110000,
    places: 5,
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1556189250-72cc5f5a5f5d",
  },
  {
    id: 6,
    name: "Premier Executive",
    type: "Berline",
    price: 150000,
    places: 5,
    transmission: "Automatique",
    image: "https://images.unsplash.com/photo-1549317666-7d1e0b3b9d2a",
  },
];

export default function CataloguePage() {
  const [priceRange, setPriceRange] = useState([30000, 500000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["SUV"]);
  const router = useRouter();

  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-FR") + " FCFA";
  };

  const handlePriceChange = (value: number | readonly number[]) => {
    const normalized = Array.isArray(value) ? value : [value, value];
    setPriceRange(normalized as number[]);
  };

  const [cars, setCars] = useState<Car[]>([]);

  const getCars = async () => {
    try {
      const response = await getCarsApi();
      setCars(response.data);
      console.log("Fetched cars:", response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      
    }
  };

  useEffect(() => {
    getCars();
  }, []);


  return (
    <div className="min-h-screen bg-white">
      <div>
        {/* Header */}
        <div className="px-10 py-10 border-b">
          <h1 className="text-4xl font-bold text-secondary">
            Catalogue Complet de nos Véhicules
          </h1>
          <p className="text-gray-600 mt-2">
            {
              "Découvrez notre flotte premium, sélectionnée pour votre confort et votre sécurité. De l'urbaine agile au SUV familial spacieux."
            }
          </p>
        </div>

        <div className="flex flex-col px-10 py-16 lg:flex-row gap-8 bg-blue-50">
          {/* Filtres */}
          <div className="lg:w-80 bg-white p-6 rounded-2xl border h-fit sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filtres</h2>
              <Button
                variant={"link"}
                className="text-sm text-secondary hover:underline"
              >
                Réinitialiser
              </Button>
            </div>

            {/* Type de véhicule */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Type de véhicule</h3>
              {["Berline", "SUV", "Utilitaire", "Électrique"].map((type) => (
                <div key={type} className="flex items-center gap-3 mb-3">
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => {
                      if (selectedTypes.includes(type)) {
                        setSelectedTypes(
                          selectedTypes.filter((t) => t !== type),
                        );
                      } else {
                        setSelectedTypes([...selectedTypes, type]);
                      }
                    }}
                  />
                  <span>{type}</span>
                </div>
              ))}
            </div>

            {/* Prix par jour */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Prix par jour (FCFA)</h3>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={500000}
                step={10000}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{priceRange[0].toLocaleString()} FCFA</span>
                <span>{priceRange[1].toLocaleString()} FCFA</span>
              </div>
            </div>

            {/* Transmission */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Transmission</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox defaultChecked />
                  <span>Automatique</span>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox />
                  <span>Manuelle</span>
                </div>
              </div>
            </div>

            <Button className="w-full h-10">Appliquer les filtres</Button>
          </div>

          {/* Liste des véhicules */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium">{cars.length} véhicules trouvés</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Trier par :</span>
                <select className="bg-white border cursor-pointer border-gray-200 rounded-lg px-4 py-2 text-sm">
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Populaire</option>
                </select>
              </div>
            </div>

            {/* Vehicules */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-3xl overflow-hidden border hover:shadow-lg transition-all group"
                >
                  <div className="relative h-52">
                    <img
                      src={car.photo_url}
                      alt={car.mark}
                      className="w-full h-full object-cover"
                    />
                    {/* {car.badge && (
                      <Badge className="absolute top-4 left-4 bg-primary">
                        {car.badge}
                      </Badge>
                    )} */}
                    <button className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
                      <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-xl">{car.mark} {car.model} </h3>
                    <Badge className="text-secondary border-0 bg-blue-100 text-xs">{car.type}</Badge>

                    <div className="flex items-center gap-4 text-sm text-gray-600 my-4">
                      <div className="flex items-center gap-1">
                        👥 {car.place} Places
                      </div>
                      <div className="flex items-center gap-1">
                        {/* ⚙️ {car.transmission} */}
                        ⚙️ 
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          {car.dayAmount.toLocaleString("fr-FR")}
                        </span>
                        <span className="text-sm text-gray-500">
                          {" "}
                          FCFA/jour
                        </span>
                      </div>
                      <Button onClick={() => router.push(`/client/reservation/${car.id}`)} className={"px-6 py-4"}>Réserver</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  ←
                </Button>
                <Button className="bg-primary">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">→</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
