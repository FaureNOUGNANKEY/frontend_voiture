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
} from "lucide-react";
import { Button } from "../ui/button";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Car,
  CalendarRange,
  Users,
  Receipt,
  Settings,
};

const sidebarLinks = [
  { id: "dashboard", label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { id: "vehicule", label: "Véhicules", href: "/admin/vehicules", icon: "Car" },
  { id: "reservations", label: "Reservations", href: "/admin/reservations", icon: "CalendarRange" },
  { id: "drivers", label: "Conducteurs", href: "/admin/drivers", icon: "Users" },
  { id: "invoices", label: "Factures", href: "/admin/invoices", icon: "Receipt" },
  { id: "settings", label: "Paramètres", href: "/admin/settings", icon: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex flex-col z-40
      bg-primary/10 border-r border-slate-400 rounded-2xl"
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
              className={`flex items-center gap-3 rounded-lg px-4 py-2 mx-2 my-1 text-sm font-semibold transition-all
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
            >
              {Icon && <Icon size={20} strokeWidth={2} />}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-6 mt-auto border-t border-slate-400">
        <Button
          type="button"
          className="w-full text-sm font-semibold py-5 rounded-lg
          flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          New Reservation
        </Button>

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