"use client";

import { useEffect, useState } from "react";
import { Search, Filter, PlusCircle, Pencil, TriangleAlert, Eye, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car, Category } from "@/lib/types";
import CreateVehiculeModal from "@/components/modals/createVehiculeModal";
import ConfirmModal from "@/components/modals/confirmModal";
import { deleteCarApi } from "@/api/car";
import { toast } from "sonner";

type carStatus = "disponible" | "loué" | "en maintenance" | "en panne";

const STATUS_CLASSES: Record<carStatus, string> = {
  disponible: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  loué: "bg-blue-100 text-blue-900 hover:bg-blue-100",
  "en maintenance": "bg-blue-100 text-blue-900 hover:bg-blue-100",
  "en panne": "bg-amber-100 text-amber-700 hover:bg-amber-100",
};


interface CarProps {
  cars: Car[];
  categories: Category[];
  onSuccess?: () => void;
  onEdit: (id: number) => void;
}

export default function VehiclesTable({ cars, categories,onSuccess,onEdit }: CarProps) {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const handleDelete = async () => {
    if (!carToDelete) return;

    try {
      await deleteCarApi(carToDelete.id);
      toast.success("Voiture supprimée avec succès");

      // Fermer la modal
      setDeleteOpen(false);
      setCarToDelete(null);

      // Rafraîchir la liste si onSuccess est fourni
      if (onSuccess) onSuccess();
    } catch (error: any) {
      // console.error("Erreur suppression voiture:", error);
      const msg = error.response?.data?.message || "Erreur lors de la suppression";
      toast.error(msg);
      console.log("Suppression échouée:", msg);
    }
  };


  const filtered = cars.filter((c) =>
    `${c.mark} ${c.model} ${c.imatriculation}`.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <Card className="shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-900 self-start sm:self-auto">
          Liste du Parc Automobile
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par immatriculation..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Véhicule</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Catégorie</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Immatriculation</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">État</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Kilométrage</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((car) => (
              <TableRow
                key={car.id}
                className={`hover:bg-slate-50 transition-colors ${car.status === "en panne" ? "bg-red-50/40" : ""
                  }`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-8 rounded bg-slate-100 overflow-hidden border border-slate-200 ${car.status === "en panne" ? "grayscale opacity-70" : ""
                        }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={car.photo_url}
                        alt={car.imatriculation}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{car.imatriculation}</p>
                      <p className="text-xs text-slate-500"> {car.mark} {car.model}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{car.category.name}</TableCell>
                <TableCell>
                  <code className="font-ono text-xs bg-slate-100 px-2 py-1 rounded">
                    {car.imatriculation}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge className={`${STATUS_CLASSES[car.status]} font-bold uppercase tracking-tight text-[10px] gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {car.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-slate-700">
                  {car.kilometrage}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" onClick={() => {
                        setSelectedCar(car);
                        setCreateOpen(true);
                        onEdit(car.id);
                      }} >
                        <Pencil size={18} />
                      </Button >

                    </div>
                    <div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600"
                      onClick={() => {
                        setCarToDelete(car);
                        setDeleteOpen(true);
                      }} >
                        <Trash2 size={18} />
                      </Button >

                    </div>
                    {car.status === "en panne" ? (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-600 animate-pulse">
                        <TriangleAlert size={18} />
                      </Button>
                      
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                        {/* <Eye size={18} /> */}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-slate-400">
                  Aucun véhicule ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Modal */}
        <CreateVehiculeModal
          open={createOpen}
          onOpenChange={setCreateOpen}
          categories={categories} 
          initialData={selectedCar}
          onSuccess={onSuccess}
        />
        {/* modal suppression */}
      <ConfirmModal
        message="Voulez-vous vraiment supprimer cet utilisateur ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDelete}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
      </div>

      <div className="p-6 bg-slate-50 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Affichage de 1-{filtered.length} sur {cars.length} véhicules
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft size={18} />
          </Button>
          <Button size="icon" className="h-8 w-8 bg-right hover:bg-primary/90">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}