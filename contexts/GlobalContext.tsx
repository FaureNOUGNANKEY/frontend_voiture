"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface GlobalContextType {
  currentPath: string;
  updatePath: (path: string) => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined); 

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const router = useRouter();

  // Source de vérité unique : l'URL réelle du navigateur.
  // Se met à jour automatiquement lors de tout changement de route
  // (navigation, rafraîchissement, retour/avance navigateur).
  const currentPath = usePathname();

  const updatePath = (path: string) => {
    router.push(path);
    setGlobalSearch("");
  };

  return (
    <GlobalContext.Provider
      value={{
        currentPath,
        updatePath,
        globalSearch,
        setGlobalSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Hook personnalisé pour utiliser l'auth partout
export const useGlobalData = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalData doit être utilisé dans AuthProvider");
  return context;
};
