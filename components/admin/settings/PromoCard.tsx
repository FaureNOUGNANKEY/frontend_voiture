"use client";

import { Promotion } from "@/app/(dashboard)/admin/settings/page";
import ToggleSwitch from "./ToggleSwitch";
import { Calendar } from "lucide-react";

interface PromoCardProps {
  promotion: Promotion;
  onToggle: (id: string, active: boolean) => void;
}

export default function PromoCard({ promotion, onToggle }: PromoCardProps) {
  const isHighlight = promotion.variant === "highlight";

  return (
    <div className="bg-surface border border-outline-variant rounded-lg p-4 relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${isHighlight ? "bg-primary" : "bg-outline-variant"}`}
      />

      <div className="flex justify-between items-start mb-2 pl-2">
        <div>
          <h4 className="font-title-md text-title-md text-on-surface">
            {promotion.title}
          </h4>
          <p className="font-label-md text-label-md text-on-surface-variant">
            {promotion.subtitle}
          </p>
        </div>
        <span
          className={
            isHighlight
              ? "bg-secondary-container text-on-primary py-1 px-2 rounded-full font-label-md text-xs font-bold"
              : "bg-surface-container-high text-on-surface-variant border border-outline-variant py-1 px-2 rounded-full font-label-md text-xs font-bold"
          }
        >
          {promotion.discountLabel}
        </span>
      </div>

      <div className="pl-2 mt-3 flex items-center justify-between">
        <span className="font-body-md text-xs text-outline flex items-center gap-1">
          <Calendar size={12}/>
          {promotion.validityLabel}
        </span>
        <ToggleSwitch
          checked={promotion.active}
          onChange={(checked) => onToggle(promotion.id, checked)}
          label={`Activer ${promotion.title}`}
        />
      </div>
    </div>
  );
}
