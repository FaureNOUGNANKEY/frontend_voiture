// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CalendarRange,
  Users,
  Receipt,
  Settings,
  Plus,
  HelpCircle,
  LogOut,
  type LucideIcon,
  UsersRound,
  CarTaxiFront,
  Wrench,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CreateReservationModal from "../modals/createReservationModal";
import { useState } from "react";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Car,
  CalendarRange,
  Users,
  CarTaxiFront,
  UsersRound,
  Receipt,
  Settings,
  Wrench,
};

const sidebarLinks = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  { id: "vehicule", label: "Véhicules", href: "/admin/vehicules", icon: "Car" },
  {
    id: "reservations",
    label: "Reservations",
    href: "/admin/reservations",
    icon: "CalendarRange",
  },
  {
    id: "drivers",
    label: "Conducteurs",
    href: "/admin/drivers",
    icon: "CarTaxiFront",
  },
  {
    id: "users",
    label: "Utilisateurs",
    href: "/admin/users",
    icon: "UsersRound",
  },
  {
    id: "maintenance",
    label: "Maintenance (Panne)",
    href: "/admin/maintenance",
    icon: "Wrench",
  },
  {
    id: "invoices",
    label: "Factures",
    href: "/admin/invoices",
    icon: "Receipt",
  },
  {
    id: "settings",
    label: "Paramètres",
    href: "/admin/settings",
    icon: "Settings",
  },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  if (pathname.includes("login")) return;

  return (
    <aside
      className={cn(
        "w-64 h-full flex flex-col border-r border-slate-400",
        !mobile && "rounded-2xl bg-primary/10",
        mobile && "rounded-r-2xl bg-white",
      )}
    >
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-1">
          Admin Central
        </h2>
        <p className="text-xs font-semibold tracking-wide text-slate-500">
          Fleet Management
        </p>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = ICONS[link.icon];
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 mx-2 my-1 text-sm font-semibold transition-all",
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-200",
              )}
            >
              {Icon && <Icon size={20} strokeWidth={2} />}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-6 mt-auto border-t border-slate-400">
        <div className="space-y-2">
          <Link
            href="/help"
            className="flex items-center gap-3 text-slate-600 hover:text-primary py-1 text-sm font-semibold transition-colors"
          >
            <HelpCircle size={18} />
            Help Center
          </Link>
          <button
            type="button"
            className="flex items-center gap-3 text-red-600 hover:opacity-80 py-1 text-sm font-semibold transition-opacity"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>

    </aside>
  );
}
