"use client";

import {
  Filter,
  Download,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@base-ui/react";
import { useState } from "react";

export type UserRole = "Client Premium" | "Client Standard" | "Gestionnaire";

export type AppUser = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  clientId: string;
  email: string;
  role: UserRole;
  joinedAt: string;
};

export const users: AppUser[] = [
  {
    id: "u1",
    name: "Jean Dupont",
    initials: "JD",
    avatarColor: "bg-blue-100 text-primary",
    clientId: "#49201",
    email: "jean.dupont@email.com",
    role: "Client Premium",
    joinedAt: "12 Oct 2023",
  },
  {
    id: "u2",
    name: "Marie Laurent",
    initials: "ML",
    avatarColor: "bg-slate-200 text-slate-700",
    clientId: "#49188",
    email: "m.laurent@agence.fr",
    role: "Client Standard",
    joinedAt: "05 Nov 2023",
  },
  {
    id: "u3",
    name: "Ahmed Said",
    initials: "AS",
    avatarColor: "bg-indigo-100 text-indigo-800",
    clientId: "#49150",
    email: "a.said@logix.com",
    role: "Gestionnaire",
    joinedAt: "28 Sept 2023",
  },
  {
    id: "u4",
    name: "Catherine Leroy",
    initials: "CL",
    avatarColor: "bg-blue-100 text-primary",
    clientId: "#49022",
    email: "cleroy@transp.net",
    role: "Client Premium",
    joinedAt: "15 Juil 2023",
  },
];

export const ROLE_CLASSES: Record<UserRole, string> = {
  "Client Premium": "bg-blue-100 text-blue-800",
  "Client Standard": "bg-slate-100 text-slate-600",
  Gestionnaire: "bg-indigo-100 text-indigo-800",
};

const clients = users.filter((u) => u.role !== "Gestionnaire");
const admins = users.filter((u) => u.role === "Gestionnaire");

function UsersRows({ data }: { data: typeof users }) {
  return (
    <TableBody>
      {data.map((user) => (
        <TableRow
          key={user.id}
          className="hover:bg-slate-50 transition-colors group"
        >
          <TableCell>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${user.avatarColor}`}
              >
                {user.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">ID: {user.clientId}</p>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-sm text-slate-600">{user.email}</TableCell>
          <TableCell>
            <Badge
              className={`${ROLE_CLASSES[user.role]} font-bold hover:${ROLE_CLASSES[user.role]}`}
            >
              {user.role}
            </Badge>
          </TableCell>
          <TableCell className="text-sm text-slate-600">
            {user.joinedAt}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-blue-900"
              >
                <Pencil size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
      {data.length === 0 && (
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center py-8 text-sm text-slate-400"
          >
            Aucun utilisateur dans cette catégorie.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default function UsersTable() {
  const [search, setSearch] = useState("");

  return (
    <Tabs defaultValue="clients">
      <TabsList
        variant="default"
        className="border-b border-slate-200 rounded-none w-full justify-start h-auto p-0 bg-transparent"
      >
        <TabsTrigger
          value="clients"
          className="rounded-none border-b-2 border-transparent data-active:border-primary data-active:bg-transparent data-active:text-primary px-4 py-3 text-sm font-semibold hover:text-foreground transition-colors"
        >
          Clients ({clients.length})
        </TabsTrigger>
        <TabsTrigger
          value="admins"
          className="rounded-none border-b-2 border-transparent data-active:border-primary data-active:bg-transparent data-active:text-primary px-4 py-3 text-sm font-semibold hover:text-foreground transition-colors"
        >
          Administrateurs ({admins.length})
        </TabsTrigger>
      </TabsList>
      {(["clients", "admins"] as const).map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-4">
          <Card className="shadow-sm overflow-hidden">
            {/* tab content header */}
            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900 self-start sm:self-auto">
                Liste des utilisateurs
              </h2>
              <div className="flex gap-2 w-full sm:w-auto border rounded-xl ">
                <div className="relative w-full sm:w-72">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher par nom, prénoms, statut..."
                    className="pl-10 w-full rounded-xl py-2"
                  />
                </div>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="text-xs font-semibold uppercase">
                      Nom de l&apos;utilisateur
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase">
                      Email
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase">
                      Rôle
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase">
                      Date d&apos;inscription
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <UsersRows data={tab === "clients" ? clients : admins} />
              </Table>
            </div>

            <div className="p-4 flex justify-between items-center bg-slate-50 border-t border-slate-200">
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  size="icon"
                  className="h-8 w-8 bg-primary hover:bg-primary/90"
                >
                  1
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  3
                </Button>
                <span className="px-2 py-1 text-slate-400 text-sm">...</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  129
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
