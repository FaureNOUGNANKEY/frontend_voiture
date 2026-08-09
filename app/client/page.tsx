"use client";

import HomeCategories from "@/components/client/home/HomeCategories";
import HomeCTA from "@/components/client/home/HomeCTA";
import HomeHero from "@/components/client/home/HomeHero";
import HomeServices from "@/components/client/home/HomeServices";
import FactureLocationModal, { FactureLocation } from "@/components/modals/factureLocationModal";
import { useState } from "react";
//import { getCarsApi } from "@/lib/api";
//import { Car } from "@/lib/types";
//import { useEffect, useState } from "react";

const factureExemple: FactureLocation = {
  id: "FAC-2026-001",
  statut: "payee", // ou "payee"
  client: {
    nom: "NOUGNANKEY",
    email: "na5yfaure@gmail.com",
    telephone: "70443691",
    adresse: "baguida",
  },
  societe: {
    titre: "Location Véhicule",
    telephone: "+228 91 45 51 51",
    adresse: "367 Rue Agodja Kodjoviakopé",
  },
  vehicule: {
    marque: "Toyota",
    modele: "Avensis",
    type: "Berline",
    etat: "Bon",
    couleur: "champagne",
    immatriculation: "0000",
    chauffeur: "avec",
    dateDebut: "15-08-2026 15:11:00",
    dateRetour: "22-08-2026 15:12:00",
  },
  paiement: {
    tarifChauffeurHT: 21000,
    reduction: 0,
    montantVehiculeHT: 154000,
    montantTotalHT: 175000,
    montantTotalTTC: 206500,
    montantTVA: 31500,
    caution: 0,
  },
};

export default function HomeClient() {
  const [open, setOpen] = useState(true);
  return (
    <main>
      <HomeHero />
      <HomeServices />
      <HomeCategories />
      <HomeCTA />

      <FactureLocationModal
      open={open}
      onOpenChange={setOpen}
      facture={factureExemple}
      onPayer={() => {
        // Appel API paiement Flooz / redirection
        console.log("Payer");
      }}
      onImprimer={() => {
        window.print();
      }}
    />
    </main>
  );
}