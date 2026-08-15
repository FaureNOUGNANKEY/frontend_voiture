"use client";

import { getCategoriesApi } from "@/api/category";
import PricingTaxSection from "@/components/admin/settings/PricingTaxSection";
import PromotionsSection from "@/components/admin/settings/PromotionsSection";
import VehicleCategoriesSection from "@/components/admin/settings/VehicleCategoriesSection";
import { Category } from "@/lib/types";
import { Building, Calendar, Infinity } from "lucide-react";
import { useEffect, useState } from "react";

export type DriverPayType = "fixed" | "percentage";

export interface PricingSettings {
  driverPayType: DriverPayType;
  driverPayValue: number;
  vatRate: number;
  autoApplyVat: boolean;
}



export type PromoVariant = "highlight" | "neutral";

export interface Promotion {
  id: string;
  title: string;
  subtitle: string; // e.g. "Code: SUMMER24" or "Automatique"
  discountLabel: string; // e.g. "-15%"
  validityLabel: string; // e.g. "Jusqu'au 31 Août"
//   validityIcon: any; //icon
  variant: PromoVariant;
  active: boolean;
}

export const defaultPricingSettings: PricingSettings = {
  driverPayType: "fixed",
  driverPayValue: 45,
  vatRate: 20,
  autoApplyVat: true,
};



export const defaultPromotions: Promotion[] = [
  {
    id: "summer24",
    title: "Promo Été 2024",
    subtitle: "Code: SUMMER24",
    discountLabel: "-15%",
    validityLabel: "Jusqu'au 31 Août",
    variant: "highlight",
    active: true,
  },
  {
    id: "longue-duree",
    title: "Longue Durée (>14j)",
    subtitle: "Automatique",
    discountLabel: "-10%",
    validityLabel: "Permanent",
    variant: "neutral",
    active: false,
  },
  {
    id: "b2b-pro",
    title: "B2B Partenaires",
    subtitle: "Code: B2BPRO",
    discountLabel: "-20%",
    validityLabel: "Comptes Pro",
    variant: "highlight",
    active: true,
  },
];

export default function ParametresPage() {

  const [categories,setCategories] = useState<Category[]>([]);
  const getCategories = async () => {
    try {
      const response = await getCategoriesApi();
      setCategories(response.data);
      console.log(" Fetched Categories :", response.data);
    } catch (error){
      console.error("Error fetching Categories:",error)
    }
  }

  useEffect(() => {
    getCategories();
  },[]);

  const handleSavePricing = (settings: PricingSettings) => {
    // TODO: brancher sur l'API (ex: fetch("/api/settings/pricing", { method: "POST", body: ... }))
    console.log("Sauvegarde des tarifs", settings);
  };

  const handleAddPromotion = () => {
    // TODO: ouvrir une modale / formulaire de création d'offre
    console.log("Ajouter une nouvelle offre");
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Paramètres du Système
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gérez la tarification, les promotions et les catégories de véhicules de votre flotte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <PricingTaxSection
              initialSettings={defaultPricingSettings}
              onSave={handleSavePricing}
            />
            <VehicleCategoriesSection
              categories={categories}
              onSuccess={() =>{getCategories()}}
            />
          </div>

          {/* Colonne latérale */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <PromotionsSection
              initialPromotions={defaultPromotions}
              onAddPromotion={handleAddPromotion}
            />
          </div>
        </div>

        <div className="h-16" />
      </main>
    </div>
  );
}
