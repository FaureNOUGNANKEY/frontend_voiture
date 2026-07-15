"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  setCurrentStep?: (step: number) => void;
}

export default function Stepper({ currentStep, setCurrentStep }: StepperProps) {
  const steps = [
    { id: 1, label: "Véhicule" },
    { id: 2, label: "Détails" },
    { id: 3, label: "Paiement" },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Ligne de connexion */}
        <div className="absolute top-5 left-0 right-0 h-[3px] bg-gray-200 -z-10" />
        <div 
          className="absolute top-5 left-0 h-[3px] bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div
              onClick={() => {
                if(step.id !== 1){
                    setCurrentStep && setCurrentStep(step.id);
                }
              }}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center border-2 text-sm font-semibold cursor-pointer transition-all",
                currentStep > step.id
                  ? "bg-primary border-primary text-white"           // Complété
                  : currentStep === step.id
                  ? "bg-primary border-primary text-white"           // Actif
                  : "bg-white border-gray-300 text-gray-400"           // À venir
              )}
            >
              {currentStep > step.id ? (
                <Check className="w-6 h-6" />
              ) : (
                step.id
              )}
            </div>
            <span
              className={cn(
                "mt-3 text-sm font-medium",
                currentStep >= step.id ? "text-gray-900" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}