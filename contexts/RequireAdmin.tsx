"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser,isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.push("/login-client");
    } else if (currentUser?.role !== "admin") {
      router.push("/403");
    }
  }, [isAuthenticated, currentUser, router,isHydrated]);

  if (!isAuthenticated || !currentUser) {
    return <p>Chargement...</p>;
  }

  return <>{children}</>;
}
