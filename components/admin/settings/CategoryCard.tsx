"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/types";
import { useState } from "react";
import { deleteCategoryApi } from "@/api/category";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/confirmModal";


interface CategoryCardProps {
  category: Category;
  onSuccess?: () => void;
}

export default function CategoryCard({ category,onSuccess}: CategoryCardProps) {

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleDeleteCategory = async () => {
  if (!categoryToDelete) return;

  try {
    await deleteCategoryApi(categoryToDelete.id);
    toast.success("Catégorie supprimée avec succès");

    setDeleteOpen(false);
    setCategoryToDelete(null);

    if (onSuccess) onSuccess();
  } catch (error: any) {
    const msg = error.response?.data?.message || "Erreur lors de la suppression";
    toast.error(msg);
    console.error("Suppression échouée:", msg);
  }
};
  return (
    
    <div
      className={cn(
        "group relative flex h-24 flex-col items-center justify-center gap-2 rounded-lg border bg-card p-4",
        "transition-colors hover:bg-accent/50 cursor-default"
      )}
    >
      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
        {category.name}
      </span>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() =>{ setCategoryToDelete(category);setDeleteOpen(true);}}
        className="absolute top-1.5 right-1.5 h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
        aria-label={`Supprimer la catégorie ${category.name}`}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
      <div>{/* modal suppression */}
            <ConfirmModal
              message="Voulez-vous vraiment supprimer cette catégory ?"
              confirmText="Supprimer"
              cancelText="Annuler"
              onConfirm={handleDeleteCategory}
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
            /></div>
    </div>
  );
}