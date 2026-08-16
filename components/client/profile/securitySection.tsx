"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success";

export default function SecuritySection() {
  const [status, setStatus] = useState<Status>("idle");

  const handleUpdate = () => {
    // Mock : simule un appel API de changement de mot de passe.
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Sécurité</h2>

        <p className="text-sm text-slate-500 mb-6">
          Modifiez votre mot de passe pour assurer la sécurité de votre flotte personnelle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-slate-500">Ancien mot de passe</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-500">Nouveau mot de passe</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleUpdate}
              disabled={status !== "idle"}
              className={`w-full py-5 gap-2 transition-colors ${
                status === "success"
                  ? "bg-emerald-600 hover:bg-emerald-600"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {status === "idle" && "Mettre à jour"}
              {status === "loading" && (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Chargement...
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 size={18} />
                  Mis à jour !
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}