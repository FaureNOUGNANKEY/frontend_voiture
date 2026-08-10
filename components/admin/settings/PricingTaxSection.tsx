"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PricingSettings } from "@/app/(dashboard)/admin/settings/page";

interface PricingTaxSectionProps {
  initialSettings: PricingSettings;
  onSave?: (settings: PricingSettings) => void;
}

export default function PricingTaxSection({
  initialSettings,
  onSave,
}: PricingTaxSectionProps) {
  const [settings, setSettings] = useState<PricingSettings>(initialSettings);

  const update = <K extends keyof PricingSettings>(
    key: K,
    value: PricingSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 border-b pb-4">
        <Wallet className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg font-semibold">
          Tarification & Fiscalité
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Chauffeur */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driverPayType">
                Type de rémunération chauffeur
              </Label>
              <Select
                value={settings.driverPayType}
                onValueChange={(v) =>
                  update("driverPayType", v as PricingSettings["driverPayType"])
                }
              >
                <SelectTrigger id="driverPayType" className={"w-full"}>
                  <SelectValue placeholder="Choisir…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Montant fixe (par jour)</SelectItem>
                  <SelectItem value="percentage">
                    Pourcentage (par course)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverPayValue">
                Valeur de la rémunération
              </Label>
              <div className="relative">
                <Input
                  id="driverPayValue"
                  type="number"
                  value={settings.driverPayValue}
                  onChange={(e) =>
                    update("driverPayValue", Number(e.target.value))
                  }
                  className="pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {settings.driverPayType === "percentage" ? "%" : "CFA"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Montant par défaut appliqué aux nouveaux contrats.
              </p>
            </div>
          </div>

          {/* TVA */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vatRate">Taux de TVA par défaut (%)</Label>
              <div className="relative">
                <Input
                  id="vatRate"
                  type="number"
                  step="0.1"
                  value={settings.vatRate}
                  onChange={(e) => update("vatRate", Number(e.target.value))}
                  className="pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="autoApplyVat"
                checked={settings.autoApplyVat}
                onCheckedChange={(checked) =>
                  update("autoApplyVat", checked === true)
                }
              />
              <Label
                htmlFor="autoApplyVat"
                className="text-sm font-normal cursor-pointer leading-snug"
              >
                Appliquer la TVA automatiquement sur les devis
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={() => onSave?.(settings)}>
            Sauvegarder les tarifs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}