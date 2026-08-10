"use client";

import { useState } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryCard from "./CategoryCard";
import AddCategoryCard from "./AddCategoryCard";
import { VehicleCategory } from "@/app/(dashboard)/admin/settings/page";

interface VehicleCategoriesSectionProps {
  initialCategories: VehicleCategory[];
}

export default function VehicleCategoriesSection({
  initialCategories,
}: VehicleCategoriesSectionProps) {
  const [categories, setCategories] =
    useState<VehicleCategory[]>(initialCategories);

  const handleRemove = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAdd = () => {
    const name = window.prompt("Nom de la nouvelle catégorie");
    if (!name?.trim()) return;
    setCategories((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: name.trim() },
    ]);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
        <div className="flex items-center gap-3">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">
            Catégories de Véhicules
          </CardTitle>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Ajouter une catégorie
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onRemove={handleRemove}
            />
          ))}
          <AddCategoryCard onClick={handleAdd} />
        </div>
      </CardContent>
    </Card>
  );
}