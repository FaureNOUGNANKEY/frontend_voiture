"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const profileUser = {
  fullName: "Jean-Pierre Koffi",
  memberSince: "Client Premium depuis 2022",
  status: "Actif" as const,
  avatarUrl:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&h=256&fit=crop",
  email: "jp.@gmail.com",
  phone: "+228 12 34 56 78",
  city: "lome",
  address: "baguida",
};

export default function AccountDetailsForm() {
  // État local mocké — à remplacer par un vrai submit (server action / API) plus tard.
  const [form, setForm] = useState({
    fullName: profileUser.fullName,
    email: profileUser.email,
    phone: profileUser.phone,
    city: profileUser.city,
    address: profileUser.address,
  });

  return (
    <Card className="shadow-sm">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold text-slate-900">Détails du compte</h2>
          <Button variant="link" className="gap-1.5 p-0 h-auto">
            <Save size={16} />
            Enregistrer les modifications
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <Label className="text-slate-500">Nom complet</Label>
            <Input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-500">Adresse e-mail</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-500">Téléphone</Label>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-500">Ville</Label>
            <Input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-slate-500">Adresse</Label>
            <Textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}