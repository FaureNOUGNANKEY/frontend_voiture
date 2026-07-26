// app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AdminHeader from "@/components/admin/adminHeader";
import Sidebar from "@/components/admin/sidebar";
import AdminFooter from "@/components/admin/adminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header avec bouton menu */}
      <AdminHeader onMenuClick={toggleMobileMenu} isMobile={isMobile} />

      {/* Overlay mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-64px)] z-40 transition-transform duration-300 ease-in-out",
          isMobile && !isMobileMenuOpen && "-translate-x-full",
          isMobile && isMobileMenuOpen && "translate-x-0",
          !isMobile && "translate-x-0",
        )}
      >
        <Sidebar mobile={isMobile} onClose={closeMobileMenu} />
      </div>

      {/* Contenu principal */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 pt-16 flex flex-col",
          !isMobile ? "ml-64" : "ml-0",
        )}
      >
        <div className="flex-1">{children}</div>
        <AdminFooter />
      </main>
    </div>
  );
}
