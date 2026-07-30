// components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Bell,
  HelpCircle,
  User,
  Settings,
  LogOut,
  UserCircle,
  ChevronDown,
  Home,
  Search,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";


export default function ClientHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/client", label: "Accueil", icon: Home },
    { href: "/client/catalogue", label: "Catalogue", icon: Search },
    { href: "/client/reservation/me", label: "Réservations", icon: Calendar },
    { href: "/client/messages", label: "Messages", icon: MessageSquare },
  ];

  // Simuler un utilisateur connecté
  const user = {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop",
    initials: "JD",
  };

  return (
    <header className="shadow-lg bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/client" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="/appLogo.png"
            alt="Easy Car Rental"
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Desktop Profile */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger className={"flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-full"}>
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-700 leading-tight">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">
                      {user.email}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => router.push('/client/profile')} className="cursor-pointer">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Mon profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ==================== MOBILE MENU ==================== */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className={"md:hidden border-gray-200 hover:bg-gray-50"}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-80 sm:w-96 bg-white p-0">
              <div className="flex flex-col h-full">
                {/* Header du menu avec profil */}
                <div onClick={() => {router.push('/client/profile'); setIsOpen(false);}} className="bg-gradient-to-r cursor-pointer from-primary/10 to-primary/5 px-6 py-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Liens de navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <SheetClose key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-4 px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-primary transition-all active:bg-gray-100 group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                            <Icon className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" />
                          </div>
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                {/* Séparateur et boutons actions */}
                <div className="border-t border-gray-100 px-4 py-6 space-y-3">
                  <SheetClose>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 text-gray-600 border-gray-200 hover:bg-gray-50"
                    >
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </Button>
                  </SheetClose>
                  <SheetClose>
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-3"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
