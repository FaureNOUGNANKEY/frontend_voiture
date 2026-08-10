"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AddCategoryCardProps {
  onClick: () => void;
}

export default function AddCategoryCard({ onClick }: AddCategoryCardProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed",
        "border-primary/40 bg-background p-4 transition-colors",
        "hover:border-primary hover:bg-primary/5 cursor-pointer group"
      )}
    >
      <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
        Nouvelle
      </span>
    </Button>
  );
}