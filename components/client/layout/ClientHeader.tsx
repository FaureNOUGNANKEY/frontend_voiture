// components/layout/Header.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function ClientHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "", label: "Accueil" },
    { href: "/catalogue", label: "Catalogue" },
    { href: "#profile", label: "My Profile" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/client" className="flex items-center gap-3">
          <img
            src="/appLogo.png"
            alt="Easy Car Rental"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/client/${link.href}` }
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Desktop Icons */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button className="hidden md:block">
            <Link href="/signin">Sign Out</Link>
          </Button>

          {/* ==================== MOBILE MENU ==================== */}
          <div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden">
                <div className="flex justify-center items-center p-2 rounded-lg border border-gray-300">
                  <Menu className="h-4 w-4" />
                </div>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col h-full py-6">
                  {/* Header du menu */}
                  <div className="flex items-center justify-between mb-8 px-2">
                    <div className="font-semibold text-xl text-gray-900">
                      Menu
                    </div>
                  </div>

                  {/* Liens de navigation */}
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center px-4 py-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-all active:bg-gray-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  {/* Séparateur */}
                  <div className="my-8 border-t border-gray-200" />

                  {/* Bouton Sign Out */}
                  <div className="px-4 mt-auto">
                    <SheetClose>
                      <Button className="w-full py-6 text-base" size="lg">
                        Sign Out
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
