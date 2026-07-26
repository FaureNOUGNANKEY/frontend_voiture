// components/admin/AdminHeader.tsx
"use client";

import Link from "next/link";
import { Bell, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Catalog", href: "/catalog" },
  { label: "Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
  { label: "Contact", href: "/contact" },
];

interface AdminHeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export default function AdminHeader({
  onMenuClick,
  isMobile = false,
}: AdminHeaderProps) {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 h-16 bg-white shadow-xl">
      <div className="flex items-center gap-4">
        {/* Bouton menu mobile */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden hover:bg-slate-100"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}

        <img
          src="/appLogo.png"
          alt="logo"
          width={100}
          className="hidden sm:block"
        />
        <img src="/appLogo.png" alt="logo" width={80} className="sm:hidden" />

        <div className="hidden md:flex ml-8 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-500 hover:text-blue-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button type="button" className="text-slate-500 hover:text-slate-900">
          <Bell size={20} />
        </button>
        <button
          type="button"
          className="text-slate-500 hover:text-slate-900 hidden sm:block"
        >
          <HelpCircle size={20} />
        </button>
        <div
          onClick={() => router.push("/client/profile")}
          className="h-8 w-8 rounded-full overflow-hidden bg-slate-200 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop"
            alt="Photo de profil"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-blue-900 hover:opacity-80 hidden sm:block"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
