"use client";

import { useState } from "react";
import {
  Pencil,
  User,
  History,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<string, LucideIcon> = { User, History, CreditCard };

const profileUser = {
  fullName: "Jean-Pierre Dupont",
  memberSince: "Client Premium depuis 2022",
  status: "Actif" as const,
  avatarUrl:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&h=256&fit=crop",
  email: "jp.dupont@business.fr",
  phone: "+33 6 12 34 56 78",
  city: "Paris",
  address: "15 Avenue des Champs-Élysées, 75008 Paris",
};


export const profileStats = [
  { id: "trips", label: "Trajets effectués", value: 14 },
  { id: "ongoing", label: "En cours", value: 0 },
];
 
export const profileNavItems = [
  { id: "personal", label: "Informations Personnelles", icon: "User" },
  { id: "reservations", label: "Mes Réservations", icon: "History" },
  { id: "billing", label: "Facturation", icon: "CreditCard" },
];
 
export type ReservationHistoryStatus = "Terminé" | "Annulé";

export type ReservationHistoryItem = {
  id: string;
  vehicle: string;
  date: string;
  price: string;
  status: ReservationHistoryStatus;
};

export default function ProfileCard() {
  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card className="shadow-sm">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <Avatar className="w-full h-full border-4 border-slate-100">
              <AvatarImage
                src={profileUser.avatarUrl}
                alt={profileUser.fullName}
              />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              <Pencil size={16} />
            </button>
          </div>

          <h1 className="text-xl font-semibold text-slate-900">
            {profileUser.fullName}
          </h1>
          <p className="text-sm text-slate-500">{profileUser.memberSince}</p>

          <Badge className="mt-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Statut: {profileUser.status}
          </Badge>

          <div className="mt-8 w-full space-y-1">
            {profileNavItems.map((item) => {
              const Icon = ICONS[item.icon];
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-100 text-primary"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {Icon && <Icon size={20} />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="shadow-sm bg-slate-50">
        <CardContent className="p-6 grid grid-cols-2 gap-4">
          {profileStats.map((stat, i) => (
            <div
              key={stat.id}
              className={`text-center ${i > 0 ? "border-l border-slate-200" : ""}`}
            >
              <div className="text-2xl font-semibold text-primary">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
