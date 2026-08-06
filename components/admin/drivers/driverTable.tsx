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
import { Driver } from "@/lib/types";
import CreateDriverModal from "@/components/modals/createDriverModal";
import ConfirmModal from "@/components/modals/confirmModal";
import { deleteDriverApi } from "@/api/driver";
import { toast } from "sonner";


type driverStatus = "disponible" | "affecté" | "indisponible" | "inactif";

const STATUS_CLASSES: Record<driverStatus, string> = {
  "disponible": "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  "affecté": "bg-blue-100 text-blue-900 hover:bg-blue-100",
  "indisponible": "bg-red-100 text-red-900 hover:bg-red-100",
  "inactif": "bg-amber-100 text-amber-700 hover:bg-amber-100",
};

interface DriverProps {
  drivers: Driver[];
  onSuccess?: () => void;
  onEdit: (id: number) => void;
}

export default function DriversTable({ drivers, onSuccess, onEdit }: DriverProps) {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);

  const handleDelete = async () => {
    if (!driverToDelete) return;

    try {
      await deleteDriverApi(driverToDelete.id);
      toast.success("Chauffeur supprimé avec succès");

      // Fermer la modal
      setDeleteOpen(false);
      setDriverToDelete(null);

      // Rafraîchir la liste si onSuccess est fourni
      onSuccess?.();
    } catch (error: any) {
      console.error("Erreur suppression chauffeur:", error);
      toast.error("Échec de la suppression ");
    }
  };




  const filtered = drivers.filter((d) =>
    `${d.lastname} ${d.firstname} ${d.status}`.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <Card className="shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-900 self-start sm:self-auto">
          Liste des conducteurs
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
              placeholder="Rechercher par nom, prénoms, statut..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Conducteur</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">télephone</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Etat</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">Affectation actuelle</TableHead>
              {/* <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Kilométrage</TableHead> */}
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((driver) => (
              <TableRow
                key={driver.id}
              // className={`hover:bg-slate-50 transition-colors ${
              //   car.status === "En Panne" ? "bg-red-50/40" : ""
              // }`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      // className={`w-12 h-8 rounded bg-slate-100 overflow-hidden border border-slate-200 ${
                      //   car.status === "En Panne" ? "grayscale opacity-70" : ""
                      // }`}
                      className={`w-12 h-15 rounded bg-slate-100 overflow-hidden border border-slate-200 
                        "grayscale opacity-70" : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={driver.photo_url}
                        alt={driver.lastname}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{driver.lastname}</p>
                      <p className="text-xs text-slate-500">{driver.firstname}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{driver.phone}</TableCell>

                <TableCell>
                  <Badge className={`${STATUS_CLASSES[driver.status]} font-bold uppercase tracking-tight text-[10px] gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {driver.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {/* <code className="font-ono text-xs bg-slate-100 px-2 py-1 rounded">
                    {car.imatriculation}
                  </code> */}
                </TableCell>
                {/* <TableCell className="text-right font-mono text-sm text-slate-700">
                  {car.kilometrage}
                </TableCell> */}
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" onClick={() => {
                        setSelectedDriver(driver);
                        setCreateOpen(true);
                        onEdit(driver.id);
                      }}>
                        <Pencil size={18} />
                      </Button>


                    </div>
                    <div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-primary" 
                      onClick={() => {
                      setDriverToDelete(driver);
                      setDeleteOpen(true);
                    }}
                      >
                        <Trash2 size={18} />
                      </Button>


                    </div>

                    {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                      <TriangleAlert size={18} />
                    </Button>  */}
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
      </div>
      <CreateDriverModal open={createOpen}
        onOpenChange={setCreateOpen}
        initialData={selectedDriver}
        onSuccess={onSuccess}
      />

      {/* modal suppression */}
      <ConfirmModal
        message="Voulez-vous vraiment supprimer ce conducteur ?"
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={handleDelete}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />

      <div className="p-6 bg-slate-50 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Affichage de 1-{filtered.length} sur {drivers.length} conducteurs
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