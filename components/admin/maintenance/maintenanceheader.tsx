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
import { Car, Statistics } from "@/lib/types";
import { addPanneApi } from "@/api/panne";

interface CarProps {
  cars: Car[];
  onSuccess?: () => void;
}

export type Priority = "Urgente" | "Moyenne" | "Faible";
 
export const priorityOptions: Priority[] = ["Faible", "Moyenne", "Urgente"];

export default function MaintenanceHeader( {cars, onSuccess} : CarProps ) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const [formData, setFormData] = useState<{
    car_id: number;
    priority: Priority;
    description: string;
    panneAmount: number;
  }>({
    car_id: 0,
    priority: "Faible",
    description: "",
    panneAmount: 0,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addPanneApi(formData);
      console.log("Panne créée:", response);
      setOpen(false);
      onSuccess?.();
      setFormData({
        car_id: 0,
        priority: "Faible",
        description: "",
        panneAmount: 0,
      });
    }catch (error: any) {
    if (error.response && error.response.data.errors) {
        // récupèration des erreurs de validation
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur API /pannes :", error.response?.data || error.message);
      }
    }
    // } finally {
    //   setIsLoading(false);
    // }
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
                <Select value={formData.car_id ? String(formData.car_id) : ""}
                  onValueChange={(val) => setFormData({ ...formData, car_id: Number(val) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un véhicule..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.mark}-{c.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-500">Priorité</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(val) =>
                    setFormData({
                      ...formData,
                      priority: (val as Priority) || "Faible",
                    })
                  }
                >
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
              <Textarea rows={4} placeholder="Décrivez les symptômes et circonstances..." 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              />
               {errors.description && <p className="text-red-600 text-sm">{errors.description[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-500">Coût estimé (CFA)</Label>
                <Input type="number" placeholder="0.00" 
                onChange={(e) =>
                setFormData({ ...formData, panneAmount: parseFloat(e.target.value) ||0})
              }
              required
              />
               {errors.panneAmount && <p className="text-red-600 text-sm">{errors.panneAmount[0]}</p>}
              </div>
              {/* <div className="space-y-1.5">
                <Label className="text-slate-500">Lieu d&apos;immobilisation</Label>
                <Input type="text" placeholder="Ville ou Atelier" />
              </div> */}
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