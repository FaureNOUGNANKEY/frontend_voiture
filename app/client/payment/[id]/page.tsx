"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Store, Lock } from "lucide-react";
import { invoice, Reservation } from "@/lib/types";
import { getReservationApi } from "@/api/reservation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function PaymentPage() {
  const { id } = useParams();
  // const [reservation, setReservation] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<"card" | "miss by yas" | "flooz">("card");
  const [cardName, setCardName] = useState("JEAN DUPONT");
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [amount, setAmount] = useState("EX : 10000");
  const [phoneNumber, setPhoneNumber] = useState("EX : 90 00 90 00");

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [invoice, setInvoice] = useState<invoice |null>(null);

  const getReservation = async (id: string | number) => {
    try {
      const response = await getReservationApi(String(id));
      setSelectedReservation(response.data);
      setInvoice(response.data.invoice);
      console.log("Fetched reservation:", response.data);
      console.log("Facture:", response.data.invoice);
    } catch (error) {
      console.error("Error fetching reservation:", error);
    }
  };

  const formatReservationDate = (date?: string, dateFormat = "dd MMM.") =>
    date ? format(new Date(date), dateFormat, { locale: fr }) : "";

  useEffect(() => {
    if (id) {
      getReservation(id as string);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-10">

        {/* Colonne gauche - Paiement */}
        <Card className="lg:col-span-3 p-5">
          <h1 className="text-3xl font-bold mb-8">Mode de Paiement</h1>

          {/* Options */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card onClick={() => setSelectedMethod("card")} className={`p-6 cursor-pointer ${selectedMethod === "card" ? "border-primary bg-blue-50" : ""}`}>
              <div className="flex flex-col items-center">
                <CreditCard className="w-8 h-8 mb-3" />
                <p>Carte Bancaire</p>
              </div>
            </Card>
            <Card onClick={() => setSelectedMethod("miss by yas")} className={`p-6 cursor-pointer ${selectedMethod === "miss by yas" ? "border-primary bg-blue-50" : ""}`}>
              <div className="flex flex-col items-center">
                {/* <Wallet className="w-8 h-8 mb-3" />
                 */}
                 <img src="https://www.zoomtanzania.net/wp-content/uploads/2025/02/Mixx_by_Yas-860x645-1.jpg" alt="miss By Yas" className="w-8 h-8 mb-3" width={200} height={5000}/>
                <p>Miss By Yas</p>
              </div>
            </Card>
            <Card onClick={() => setSelectedMethod("flooz")} className={`p-6 cursor-pointer ${selectedMethod === "flooz" ? "border-primary bg-blue-50" : ""}`}>
              <div className="flex flex-col items-center">
                <img src="https://tse3.mm.bing.net/th/id/OIP.P4ecXGGDPnKfQC_PapWETwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Flooz" className="w-8 h-8 mb-3" width={200} height={5000}/>
                {/* <Store className="w-8 h-8 mb-3" /> */}
                <p>Flooz</p>
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
          {/* Formulaire mibile money */}
          {(selectedMethod === "miss by yas" ||selectedMethod === "flooz" )&& (
            <div>
              <div className="space-y-6">
                <div>
                  <Label>Montant</Label>
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 text-lg h-10"
                  />
                </div>

                <div>
                  <Label>Numéro de télephone</Label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-2 text-lg tracking-widest h-10"
                    maxLength={19}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sécurité */}
          <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 bg-blue-50 p-4 rounded-xl">
            <Lock className="w-5 h-5 text-primary" />
            Paiement 100% sécurisé via protocole SSL.
          </div>
        </Card>

        {/* Colonne droite - Récapitulatif */}
        <Card className="lg:col-span-2 p-8 sticky top-8">
          <h2 className="text-2xl font-semibold mb-6">Récapitulatif financier</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Location ({selectedReservation?.days} jours)</span>
              <span>{invoice?.amount} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Prix chauffeur</span>
              <span>{invoice?.driverAmount} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>TVA</span>
              <span>{invoice?.tvaAmount} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Réduction</span>
              <span>{invoice?.reductionAmount} FCFA</span>
            </div>
            <div className="border-t pt-6 mt-6 flex justify-between text-xl font-semibold">
              <span>Total à payer</span>
              <span className="text-primary">{selectedReservation?.totalAmount} FCFA</span>
            </div>
          </div>

          {/* Info véhicule */}
          <div className="mt-8 bg-gray-50 p-5 rounded-xl">
            <div className="flex gap-4">
              <img
                src={selectedReservation?.car.photo_url}
                alt="BMW Série 3"
                className="w-24 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{selectedReservation?.car.mark} {selectedReservation?.car.model} </p>
                <p className="text-sm text-gray-500">
                  {selectedReservation?.dateStart &&
                    `Du ${formatReservationDate(selectedReservation.dateStart, "dd MMM.")}`}
                  {selectedReservation?.dateBack &&
                    ` au ${formatReservationDate(selectedReservation.dateBack, "dd MMM. yyyy")}`}
                </p>
              </div>
            </div>
          </div>

          <Button className="w-full mt-8 py-7 text-lg">
            Finaliser le paiement →
          </Button>
        </Card>
      </div>
    </div>
  );
}
