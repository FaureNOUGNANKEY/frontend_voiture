// components/home/VehiclesSection.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCarsApi } from "@/api/car";
import { Car } from "@/lib/types";

const vehicles = [
  {
    name: "Mercedes Classe C",
    type: "Berline • Automatique",
    price: 25000,
    places: 5,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    badge: "Premium",
    badgeColor: "bg-amber-500",
  },
  {
    name: "Tesla Model Y",
    type: "SUV • Électrique",
    price: 150000,
    places: 5,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    badge: "Électrique",
    badgeColor: "bg-emerald-500",
  },
  {
    name: "BMW X5",
    type: "SUV • AWD",
    price: 120000,
    places: 7,
    image: "https://images.unsplash.com/photo-1556189250-72cc5f5a5f5d",
  },
  {
    name: "VW Golf 8",
    type: "Compact • Manuel",
    price: 12500,
    places: 5,
    image: "https://images.unsplash.com/photo-1549317666-7d1e0b3b9d2a",
  },
];

export default function CatalogueVehiclesSection() {
  const router = useRouter();
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold">Nos Véhicules</h2>
            <p className="text-gray-600 mt-2">Véhicules récents, entretenus et prêts pour la route.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Filtrer</Button>
            <Button variant="outline">Trier par prix</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car, i) => (
            <div key={i} className="group bg-white border rounded-3xl overflow-hidden hover:shadow-xl transition-all">
              <div className="relative h-52">
                <img src={car.photo_url} alt={car.mark} className="w-full h-full object-cover" />
                {/* {car.badge && (
                  <Badge className={`absolute top-4 left-4 ${car.badgeColor}`}>
                    {car.badge}
                  </Badge>
                )} */}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-xl">{car.mark} {car.model}</h3>
                <p className="text-gray-500 text-sm mt-1">{car.type}</p>

                <div className="flex justify-between items-end mt-6">
                  <div>
                    <span className="text-xl font-bold">{car.dayAmount} FCFA</span>
                    <span className="text-sm text-gray-500">/jour</span>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {car.place} Places
                  </div>
                </div>

                <Button onClick={() => router.push("/client/reservation")} className="w-full mt-5">Réserver Maintenant</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button onClick={() => router.push("catalogue/liste")} variant="outline" className="p-6">
            Voir Tout le Catalogue (42 véhicules)
          </Button>
        </div>
      </div>
    </section>
  );
}