"use client";

import { useState } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryCard from "./CategoryCard";
import AddCategoryCard from "./AddCategoryCard";
import { Category } from "@/lib/types";
import { deleteCategoryApi } from "@/api/category";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/confirmModal";
import CreateCategoryModal from "@/components/modals/createCategoryModal";

interface VehicleCategoriesSectionProps {
  categories: Category[];
  onSuccess?: () => void;
}

export default function VehicleCategoriesSection({
  categories, onSuccess,
}: VehicleCategoriesSectionProps) {
  const [createOpen, setCreateOpen] = useState(false);

  return (

    <Card className="shadow-sm">
      <div>
        {/* Modal */}
        <CreateCategoryModal
          open={createOpen}
          onOpenChange={setCreateOpen}
          onSuccess={onSuccess}
        />
      </div>

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
          onClick={() => setCreateOpen(true)}
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
              onSuccess={onSuccess}
            />
          ))}
          <AddCategoryCard onClick={() => setCreateOpen(true)} />
        </div>
      </CardContent>
    </Card>
  );
}