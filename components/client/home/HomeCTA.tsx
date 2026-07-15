// components/home/CTA.tsx
import { Button } from "@/components/ui/button";

export default function HomeCTA() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Prêt à prendre la route ?</h2>
        <p className="text-xl mb-8">
          Créez votre compte en quelques secondes et accédez à notre plateforme de réservation temps réel.
          <br />
          <span className="font-medium">Première location ? Profitez de 15% de réduction avec le code DRIVE15</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="xl" variant="secondary" className="text-primary font-bold text-lg px-10">
            Créer un compte
          </Button>
          <Button size="xl" variant="outline" className="text-lg px-10 border-white text-white hover:bg-white">
            Aide & Support
          </Button>
        </div>
      </div>
    </section>
  );
}