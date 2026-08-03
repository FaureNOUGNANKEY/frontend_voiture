import { TrendingUp, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Statistics } from "@/lib/types";


export const userStats = {
  totalClients: "1,284",
  totalClientsDelta: "+12% ce mois",
  activeAdmins: "24",
  extraAdmins: "+21",
};


export const userAdminAvatars = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop",
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=64&h=64&fit=crop",
];

interface StatisticsProps{
  statistics : Statistics;
}
 

export default function UsersStats( {statistics}: StatisticsProps ) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Total Clients */}
      <Card className="shadow-sm bg-white/80 backdrop-blur">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Clients
            </p>
            <p className="text-4xl font-bold text-primary">{statistics.totals.clients}</p>
          </div>
          <div className="mt-4 flex items-center text-emerald-600 text-sm font-semibold">
            <TrendingUp size={16} />
            <span className="ml-1">{userStats.totalClientsDelta}</span>
          </div>
        </CardContent>
      </Card>

      {/* Admins actifs */}
      <Card className="shadow-sm bg-white/80 backdrop-blur">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Administrateurs Actifs
            </p>
            <p className="text-4xl font-bold text-slate-900">{statistics.totals.admins}</p>
          </div>
          <div className="mt-4 flex -space-x-2">
            {userAdminAvatars.map((src, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={src} alt="Administrateur" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white text-[10px] flex items-center justify-center font-bold">
              {userStats.extraAdmins}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sécurité & Rôles */}
      <Card className="shadow-md bg-primary text-white border-primary">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full">
            <ShieldCheck size={32} />
          </div>
          <div>
            <p className="text-base font-semibold">Sécurité &amp; Rôles</p>
            <p className="text-sm text-white/80">
              Tous les systèmes sont opérationnels. 0 alertes d&apos;accès non autorisés.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}