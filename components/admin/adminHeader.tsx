"use client";

import Link from "next/link";
import { Bell, HelpCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "Catalog", href: "/catalog" },
  { label: "Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
  { label: "Contact", href: "/contact" },
];

export default function AdminHeader() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white shadow-xl">
      <div className="flex items-center gap-4">
        <img src="/appLogo.png" alt="logo"  width={100}/>
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

      <div className="flex items-center gap-4">
        <button type="button" className="text-slate-500 hover:text-slate-900">
          <Bell size={20} />
        </button>
        <button type="button" className="text-slate-500 hover:text-slate-900">
          <HelpCircle size={20} />
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop"
            alt="Photo de profil"
            className="w-full h-full object-cover"
          />
        </div>
        <button type="button" className="text-sm font-semibold text-blue-900 hover:opacity-80">
          Sign Out
        </button>
      </div>
    </nav>
  );
}