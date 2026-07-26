"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Priority = "Urgente" | "Moyenne" | "Faible";

export const vehicleOptions = [
  "Mercedes-Benz Actros (AA-123-BB)",
  "Iveco Daily (CK-982-PL)",
  "Renault Zoe E-Tech (EV-444-ZZ)",
];
 
export const priorityOptions: Priority[] = ["Faible", "Moyenne", "Urgente"];

export default function MaintenanceHeader() {
  const [open, setOpen] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock : à remplacer par la création réelle du ticket (API / server action).
    setOpen(false);
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Gestion des Pannes</h1>
        <p className="text-sm text-slate-500">
          Suivi en temps réel de l&apos;état technique de la flotte.
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => setOpen(true)}
          className="gap-2 bg-red-600 hover:bg-red-700 shadow-sm p-4"
        >
          <TriangleAlert size={18} />
          Signaler une nouvelle panne
        </Button>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Signaler une nouvelle panne</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-500">Véhicule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un véhicule..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleOptions.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-500">Priorité</Label>
                <Select defaultValue="Faible">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-500">Description de la panne</Label>
              <Textarea rows={4} placeholder="Décrivez les symptômes et circonstances..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-500">Coût estimé (€)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-500">Lieu d&apos;immobilisation</Label>
                <Input type="text" placeholder="Ville ou Atelier" />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Créer le ticket
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}