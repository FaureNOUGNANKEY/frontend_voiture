"use client";

import { useEffect, useState, ChangeEvent } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { getCarApi } from "@/api/car";
import { Car, Estimate } from "@/lib/types";
import { estimateReservationApi } from "@/api/estimate";
import { addReservationApi } from "@/api/reservation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function ReservationDetails() {
  const [driveOption, setDriveOption] = useState<"reservation" | "leasing">(
    "reservation",
  );
  const [pickupDate, setPickupDate] = useState("2024-11-20T10:00");
  const [returnDate, setReturnDate] = useState("2024-11-25T10:00");
  const [currentStep, setCurrentStep] = useState(2);
  const {id} = useParams();
  const router = useRouter();
  const { isAuthenticated, currentUser,logout } = useAuth();

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const getCar = async (id: string | number) => {
      try {
        const response = await getCarApi(String(id));
        setSelectedCar(response.data);
        console.log("Fetched car:", response.data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

  useEffect(() => {
    if (id) {
      getCar(id as string);
    }
  }, [id]);
  
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  
  const reservationData = {
    user_id: currentUser?.id ,
    car_id: selectedCar?.id,
    dateStart: pickupDate,
    dateBack: returnDate,
    type: driveOption,
  };

  const buildReservationFormData = (): FormData => {
    const data = new FormData();
    if (reservationData.car_id !== undefined) {
      data.append("car_id", String(reservationData.car_id));
    }
    data.append("user_id",String(reservationData.user_id))
    // data.append("user_id", String(currentUser?.id));
    data.append("dateStart", reservationData.dateStart);
    data.append("dateBack", reservationData.dateBack);
    data.append("type", reservationData.type);
    return data;
  };
   
  const [formData, setFormData] = useState({
    user_id: currentUser?.id ,
    car_id: "",
    driver_id: "",
    dateStart: "",
    dateBack: "",
    type: "leasing",
  });
  
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEstimate = async () => {
    try {
      const response = await estimateReservationApi(formData);
      setEstimate(response);
      console.log("estimate reçu :", response);
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        // récupèration des erreurs de validation
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /reservations/estimate:", error.response?.data || error.message);
      }
    }
  };


  useEffect(() => {
    if (selectedCar?.id && pickupDate && returnDate) {
      setFormData({
        user_id: currentUser?.id,
        car_id: String(selectedCar.id),
        driver_id: "", // ou null si pas de chauffeur
        dateStart: pickupDate,
        dateBack: returnDate,
        type: driveOption,
      });
    }
  }, [selectedCar, pickupDate, returnDate, driveOption]);


  useEffect(() => {
    if (formData.car_id && formData.dateStart && formData.dateBack) {
      fetchEstimate();
    }
  }, [formData]);
  console.log(reservationData);

  //créer la reservation 
  const handleConfirm = async () => {
    if (!currentUser) {
  toast.error("Vous devez être connecté pour réserver !");
  return;
}
    try {
      const response = await addReservationApi(buildReservationFormData());
      console.log("Réservation créée :", response);
      toast.success("Réservation en attente de comfirmation!");
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /reservations:", error.response?.data || error.message);
      }
    }
  };


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
                      onClick={() => setDriveOption("reservation")}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                        driveOption === "reservation"
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
                            driveOption === "reservation"
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {driveOption === "reservation" && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Chauffeur Professionnel */}
                    <div
                      onClick={() => setDriveOption("leasing")}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                        driveOption === "leasing"
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
                            Ajoutez un chauffeur certifié (+ {estimate?.driverDailyRate} FCFA/jour)
                          </p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            driveOption === "leasing"
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {driveOption === "leasing" && (
                            <div className="w-3 h-3 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Services additionnels */}
                {/* <Card className="p-6">
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
                        {selectedCar?.dayAmount} FCFA /jour
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
                </Card> */}
              </div>

              {/* Colonne droite - Résumé véhicule */}
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  <div className="h-64 bg-gray-100 relative">
                    <img
                      src={selectedCar?.photo_url}
                      alt={`${selectedCar?.mark} ${selectedCar?.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <div className="uppercase text-xs tracking-widest text-primary font-medium">
                      PREMIUM EXECUTIVE
                    </div>
                    <h3 className="text-2xl font-bold mt-1">
                      {selectedCar?.mark} {selectedCar?.model}
                    </h3>
                    {/* <p className="text-gray-500">
                      100% Électrique • Transmission Intégrale
                    </p> */}

                    <div className="mt-8 space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tarif journalier</span>
                        <span className="font-medium"> {selectedCar?.dayAmount} FCFA </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée</span>
                        <span className="font-medium"> {estimate?.days} jours </span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span className="text-gray-600">Assurance</span>
                        <span className="font-medium">75 000 FCFA</span>
                      </div> */}
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm text-gray-500">TOTAL ESTIMÉ</p>
                          <p className="text-4xl font-bold"> {estimate?.totalAmount} FCFA</p>
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

             
              <Button onClick={handleConfirm } size="lg" className="px-12 py-7 text-lg">
                Confirmer la réservation →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
