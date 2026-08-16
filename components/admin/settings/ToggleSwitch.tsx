"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  id = "toggle",
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
      />
      {label && (
        <Label htmlFor={id} className="text-sm font-normal cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  );
}