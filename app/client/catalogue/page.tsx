"use client";

import CatalogueHero from "@/components/client/catalogue/CatalogueHero";
import CatalogueVehiclesSection from "@/components/client/catalogue/CatalogueVehiclesSection";
import CatalogueWhyUsSection from "@/components/client/catalogue/CatalogueWhyUsSection";
export default function CataloguePage() {
  return (
    <main>
      <CatalogueHero />
      <CatalogueVehiclesSection />
      <CatalogueWhyUsSection />
    </main>
  );
}