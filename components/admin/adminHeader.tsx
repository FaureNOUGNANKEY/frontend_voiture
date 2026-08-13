// components/admin/AdminHeader.tsx
"use client";

import Link from "next/link";
import { Bell, ChevronDown, HelpCircle, LogIn, LogOut, Menu, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SheetTrigger, SheetContent, SheetClose } from "../ui/sheet";

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

  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, currentUser,logout } = useAuth();

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

        {/* <div className="hidden md:flex ml-8 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-500 hover:text-blue-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div> */}
      </div>

      {/* <div className="flex items-center gap-2 md:gap-4">
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
      </div> */}

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
          {/* <Button variant="ghost" size="icon" className="hidden md:flex">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button> */}

          {isAuthenticated && currentUser && (
            <div className="hidden md:block">
              {/* Desktop Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={
                    "flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-full"
                  }
                >
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src={currentUser.photo_url} alt={currentUser.lastname} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                     {currentUser.lastname.charAt(0).toUpperCase()}{currentUser.firstname.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-700 leading-tight">
                      {currentUser.lastname} {currentUser.firstname}
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">
                      {currentUser.email}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 hidden lg:block" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    // onClick={() => router.push("/client/profile")}
                    className="cursor-pointer"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Mon profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-red-600 hover:text-red-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) }

          {/* ==================== MOBILE MENU ==================== */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className={"md:hidden border-gray-200 hover:bg-gray-50"}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-80 sm:w-96 bg-white p-0">
              <div className="flex flex-col h-full">
                {/* Header du menu avec profil */}
                <div
                  // onClick={() => {
                  //   router.push("/client/profile");
                  //   setIsOpen(false);
                  // }}
                  className="bg-gradient-to-r cursor-pointer from-primary/10 to-primary/5 px-6 py-8"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                      <AvatarImage src={currentUser?.photo_url} alt={currentUser?.lastname} />
                      <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                        {currentUser?.lastname.charAt(0).toUpperCase()}{currentUser?.firstname.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-gray-900 truncate">
                        {currentUser?.lastname} {currentUser?.firstname}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Liens de navigation */}
                {/* <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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
                </nav> */}

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
                    onClick={logout}
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
      
    </nav>
  );
}
