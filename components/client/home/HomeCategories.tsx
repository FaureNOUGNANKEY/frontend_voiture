// components/home/Categories.tsx
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomeCategories() {
  const router = useRouter();
  const categories = [
    {
      title: "Berlines Executives",
      desc: "Élégance et confort pour vos rendez-vous d’affaires.",
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
    },
    {
      title: "Utilitaires",
      desc: "Le partenaire idéal pour vos transports de marchandises.",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    },
    {
      title: "Électriques & Hybrides",
      desc: "La mobilité durable sans compromis sur la performance.",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    },
    {
      title: "SUV & 4x4",
      desc: "Puissance et espace pour toutes vos aventures en famille.",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold">Explorez nos Catégories</h2>
            <p className="text-gray-600">Le véhicule parfait pour chaque destination.</p>
          </div>
          <Button variant="outline"
          onClick={() => router.push("/client/catalogue/liste")}
          >VOIR TOUT LE PARC</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl h-80">
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold mb-1">{cat.title}</h3>
                <p className="text-sm opacity-90">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}