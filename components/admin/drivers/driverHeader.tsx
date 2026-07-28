import { Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateDriverModal from "@/components/modals/createDriverModal";

export default function DriverHeader({ onSuccess }: { onSuccess?: () => void }) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Gestion des conducteurs
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {"Supervisez la disponibilité de vos conducteurs en temps réel."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2 p-4">
          <Filter size={18} />
          Filtres
        </Button>
        <Button onClick={() => setCreateOpen(true)} className="gap-2 p-4">
          <PlusCircle size={18} />
          Ajouter un conducteur
        </Button> 
      </div>

      {/* Modal */}
      <CreateDriverModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        // onSuccess={() => {
          
        // }}
        onSuccess={onSuccess}
      />
    </div>
  );
}
