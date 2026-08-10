"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VehicleCategory } from "@/app/(dashboard)/admin/settings/page";

interface CategoryCardProps {
  category: VehicleCategory;
  onRemove: (id: string) => void;
}

export default function CategoryCard({ category, onRemove }: CategoryCardProps) {
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
        onClick={() => onRemove(category.id)}
        className="absolute top-1.5 right-1.5 h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
        aria-label={`Supprimer la catégorie ${category.name}`}
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}