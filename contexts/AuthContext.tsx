"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthState, User } from "@/lib/types";
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (token: string, isAdmin: boolean,user?:User) => void;
  logout: () => void;
  getCurrentUser: (currentUser: User) => void;
  setLoading: (isLoading: boolean) => void;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    currentUser: null,
    isAuthenticated: false,
    isLoading: false,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userCookie = Cookies.get("user");

    if (token && userCookie) {
      try {
        const user = JSON.parse(userCookie) as User;

        setAuth({
          token: token,
          currentUser: user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        // En cas d'erreur de parsing JSON
        console.error("Erreur lors du parsing de l'utilisateur:", error);
        Cookies.remove("token");
        Cookies.remove("user");
        setAuth({
          token: null,
          currentUser: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuth({
        token: null,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
      });
      setIsHydrated(true); 
    }
  }, []);

  const login = (token: string, isAdmin: boolean,user?:User) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    if (user) {
      Cookies.set("user", JSON.stringify(user));
    }

    setAuth({
      token: token,
      currentUser: user ||null,
      isAuthenticated: true,
      isLoading: false,
    });

    if(isAdmin) {
      router.push("/admin");
    }else{
      router.push("/client");
    }
  };

  const getCurrentUser = (currentUser: User) => {

    Cookies.set("user", JSON.stringify(currentUser));

    setAuth((p) => ({
      ...p,
      currentUser: currentUser
    }));
  };

  const logout = async () => {
    Cookies.remove("token");
    Cookies.remove("user"); 

    setAuth({
      token: null,
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
    });

    // Vérifier le rôle avant de rediriger
    if (auth.currentUser?.role === "admin") {
      router.push("client");
      toast.success("Vous êtes déconnecté avec succès.");
    } else {
      router.push("client");
      toast.success("Vous êtes déconnecté avec succès.");
    }
  };


  // const logout = async () => {
  //   // await logoutAction();
  //   Cookies.remove("token");
  //   setAuth({
  //     token: null,
  //     currentUser: null,
  //     isAuthenticated: false,
  //     isLoading: false,
  //   });
  //   router.push("/login-client");
  // };

  const setLoading = (isLoading: boolean) => {
    setAuth((prevState) => ({
      ...prevState,
      isLoading: isLoading,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login,isHydrated, logout, getCurrentUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
};
