// app/layout.tsx
import { Inter } from "next/font/google";
import ClientHeader from "@/components/client/layout/ClientHeader";
import ClientFooter from "@/components/client/layout/ClientFooter";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <ClientHeader />
      {children}
      <ClientFooter />
    </div>
  );
}
