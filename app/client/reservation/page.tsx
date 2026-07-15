"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  Shield,
  Wifi,
  ArrowLeft,
  CreditCard,
  Store,
  Wallet,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Stepper from "@/components/ui/stepper";
import { useRouter } from "next/navigation";

export default function ReservationDetails() {
  const [driveOption, setDriveOption] = useState<"self" | "professional">(
    "self",
  );
  const [pickupDate, setPickupDate] = useState("2024-11-20T10:00");
  const [returnDate, setReturnDate] = useState("2024-11-25T10:00");
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "paypal" | "agency"
  >("card");
  const [cardName, setCardName] = useState("JEAN DUPONT");
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const router = useRouter();

  const total = 489000;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stepper */}
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />

        {currentStep === 2 && (
          <div>
            <h1 className="text-4xl font-bold text-center mb-10">
              Détails de la Réservation
            </h1>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Colonne gauche */}
              <div className="lg:col-span-2 space-y-8">
                {/* Période de Location */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      Période de Location
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm text-gray-500 mb-2 block">
                        DATE ET HEURE DE PRISE EN CHARGE
                      </Label>
                      <Input
                        type="datetime-local"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="text-lg h-10 bg-gray-100"
                      />
                    </div>

                    <div>
                      <Label className="text-sm text-gray-500 mb-2 block">
                        DATE ET HEURE DE RETOUR
                      </Label>
                      <Input
                        type="datetime-local"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="text-lg h-10 bg-gray-100"
                      />
                    </div>
                  </div>
                </Card>

                {/* Préférences de Conduite */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      Préférences de Conduite
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Card Conduite Autonome */}
                    <div
                      onClick={() => setDriveOption("self")}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                        driveOption === "self"
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Conduite Autonome
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Vous serez le conducteur principal du véhicule.
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            driveOption === "self"
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {driveOption === "self" && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Chauffeur Professionnel */}
                    <div
                      onClick={() => setDriveOption("professional")}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                        driveOption === "professional"
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Chauffeur Professionnel
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Ajoutez un chauffeur certifié (+45 000 FCFA/jour)
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            driveOption === "professional"
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {driveOption === "professional" && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Services additionnels */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      Services Additionnels
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Checkbox checked className="mt-1" />
                        <div>
                          <p className="font-medium">Assurance Complète</p>
                          <p className="text-sm text-gray-600">
                            Franchise zéro en cas de dommage.
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-green-600">
                        15 000 FCFA /jour
                      </p>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Checkbox className="mt-1" />
                        <div>
                          <p className="font-medium">Hotspot Mobile</p>
                          <p className="text-sm text-gray-600">
                            Données 5G illimitées pour tous les passagers.
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">8 000 FCFA /jour</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Colonne droite - Résumé véhicule */}
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gray-100 relative">
                    <img
                      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
                      alt="Tesla Model S"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="uppercase text-xs tracking-widest text-primary font-medium">
                      PREMIUM EXECUTIVE
                    </div>
                    <h3 className="text-2xl font-bold mt-1">
                      2024 Tesla Model S
                    </h3>
                    <p className="text-gray-500">
                      100% Électrique • Transmission Intégrale
                    </p>

                    <div className="mt-8 space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tarif journalier</span>
                        <span className="font-medium">120 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-medium">5 jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assurance</span>
                        <span className="font-medium">75 000 FCFA</span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm text-gray-500">TOTAL ESTIMÉ</p>
                          <p className="text-4xl font-bold">675 000 FCFA</p>
                        </div>
                        <p className="text-sm text-gray-500">TTC</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Boutons du bas */}
            <div className="flex justify-between items-center mt-12">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                className="flex items-center gap-2 text-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour au catalogue
              </Button>

              <Button onClick={() => setCurrentStep(3)} size="lg" className="px-12 py-7 text-lg">
                Confirmer &amp; Payer
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid lg:grid-cols-5 gap-10">
                {/* Colonne Gauche - Mode de Paiement */}
                <Card className="lg:col-span-3 p-5">
                  <h1 className="text-3xl font-bold mb-8">Mode de Paiement</h1>

                  {/* Options de paiement */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <Card
                      onClick={() => setSelectedMethod("card")}
                      className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                        selectedMethod === "card"
                          ? "border-primary bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <CreditCard className="w-8 h-8 mb-3" />
                        <p className="font-medium">Carte Bancaire</p>
                      </div>
                    </Card>

                    <Card
                      onClick={() => setSelectedMethod("paypal")}
                      className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                        selectedMethod === "paypal"
                          ? "border-primary bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <Wallet className="w-8 h-8 mb-3" />
                        <p className="font-medium">PayPal</p>
                      </div>
                    </Card>

                    <Card
                      onClick={() => setSelectedMethod("agency")}
                      className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                        selectedMethod === "agency"
                          ? "border-primary bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <Store className="w-8 h-8 mb-3" />
                        <p className="font-medium">En agence</p>
                      </div>
                    </Card>
                  </div>

                  {/* Formulaire Carte Bancaire */}
                  {selectedMethod === "card" && (
                    <div>
                      <div className="space-y-6">
                        <div>
                          <Label>Nom sur la carte</Label>
                          <Input
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="mt-2 text-lg h-10"
                          />
                        </div>

                        <div>
                          <Label>Numéro de carte</Label>
                          <Input
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="mt-2 text-lg tracking-widest h-10"
                            maxLength={19}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <Label>Expiration (MM/AA)</Label>
                            <Input
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              placeholder="MM/AA"
                              className="mt-2 h-10"
                            />
                          </div>
                          <div>
                            <Label>CVV</Label>
                            <Input
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              maxLength={4}
                              className="mt-2 h-10"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={saveCard}
                            onCheckedChange={(checked) =>
                              setSaveCard(!!checked)
                            }
                          />
                          <Label className="cursor-pointer">
                            Enregistrer cette carte pour mes prochaines
                            locations
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sécurité */}
                  <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl">
                    <Lock className="w-5 h-5 text-primary" />
                    Paiement 100% sécurisé via protocole SSL. Vos données
                    bancaires sont cryptées.
                  </div>
                </Card>

                {/* Colonne Droite - Récapitulatif */}
                <div className="lg:col-span-2">
                  <Card className="p-8 sticky top-8">
                    <h2 className="text-2xl font-semibold mb-6">
                      Récapitulatif financier
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Location (5 jours)
                        </span>
                        <span>345 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assurance Premium</span>
                        <span>62 500 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">TVA (20%)</span>
                        <span>81 500 FCFA</span>
                      </div>

                      <div className="border-t pt-6 mt-6">
                        <div className="flex justify-between text-xl font-semibold">
                          <span>Total à payer</span>
                          <span className="text-primary">489 000 FCFA</span>
                        </div>
                      </div>
                    </div>

                    {/* Info véhicule */}
                    <div className="mt-8 bg-gray-50 p-5 rounded-xl">
                      <div className="flex gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
                          alt="BMW Série 3"
                          className="w-24 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">BMW Série 3</p>
                          <p className="text-sm text-gray-500">
                            Du 12 Oct. au 17 Oct. 2023
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-8 py-7 text-lg">
                      Finaliser la réservation →
                    </Button>

                    <Button onClick={() => setCurrentStep(2)} variant={"link"} className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:underline">
                      Retour au details
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
