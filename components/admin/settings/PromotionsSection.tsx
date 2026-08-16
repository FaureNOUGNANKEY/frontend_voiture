"use client";

import { useState } from "react";
import { Plus, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PromoCard from "./PromoCard";
import { Promotion } from "@/app/(dashboard)/admin/settings/page";

interface PromotionsSectionProps {
  initialPromotions: Promotion[];
  onAddPromotion?: () => void;
}

export default function PromotionsSection({
  initialPromotions,
  onAddPromotion,
}: PromotionsSectionProps) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);

  const handleToggle = (id: string, active: boolean) => {
    setPromotions((prev) =>
      prev.map((promo) => (promo.id === id ? { ...promo, active } : promo))
    );
  };

  return (
    <Card className="flex-1 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
        <div className="flex items-center gap-3">
          <BadgePercent className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">
            Offres & Réductions
          </CardTitle>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onAddPromotion}
          aria-label="Ajouter une offre"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {promotions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Aucune offre pour le moment.
          </p>
        ) : (
          promotions.map((promotion) => (
            <PromoCard
              key={promotion.id}
              promotion={promotion}
              onToggle={handleToggle}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}