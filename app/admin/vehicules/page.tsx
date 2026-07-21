import AdminFooter from "@/components/admin/adminFooter";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import IncidentsList from "@/components/admin/vehicules/incidentList";
import UpcomingMaintenance from "@/components/admin/vehicules/upcomingMaintenance";
import VehiculeHeader from "@/components/admin/vehicules/vehiculeHeader";
import VehiculeKpis from "@/components/admin/vehicules/vehiculeKpis";
import VehiclesTable from "@/components/admin/vehicules/vehiculeTable";

export default function VehiculesPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <AdminHeader />
      <Sidebar />

      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-6 mx-auto">
          <VehiculeHeader />
          <VehiculeKpis />
          <VehiclesTable />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IncidentsList />
            <UpcomingMaintenance />
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}