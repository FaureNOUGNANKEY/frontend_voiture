"use client";

import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireClient({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      //Pas connecté → redirection vers la page de login client
      router.push("/login-client");
    } else if (currentUser?.role !== ("client" as UserRole)) {
      //Connecté mais pas client → accès interdit
      router.push("/403");
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || !currentUser) {
    return <p>Chargement...</p>;
  }

  return <>{children}</>;
}
