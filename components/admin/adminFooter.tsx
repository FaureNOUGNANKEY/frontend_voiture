// components/admin/AdminFooter.tsx
"use client";

import { cn } from "@/lib/utils";

interface AdminFooterProps {
  className?: string;
}

export default function AdminFooter({ className }: AdminFooterProps) {
  return (
    <footer
      className={cn(
        "py-6 px-6 flex flex-col md:flex-row justify-between items-center",
        "bg-slate-100 border-t border-slate-200",
        className
      )}
    >
      <div className="mb-4 md:mb-0">
        <img src="/appLogo.png" alt="logo" width={100} />
        <p className="text-sm text-slate-500 mt-2">
          © 2024 Easy Car Rental. All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {["Privacy Policy", "Terms of Service", "FAQ", "Support"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm text-slate-500 hover:text-primary hover:underline"
          >
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}