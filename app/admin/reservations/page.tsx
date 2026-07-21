import AdminFooter from "@/components/admin/adminFooter";
import DriverAvailability from "@/components/admin/reservations/driverAvailability";
import ReductionEngine from "@/components/admin/reservations/reductionEngin";
import ReservationsHeader from "@/components/admin/reservations/reservationHeader";
import ReservationsTable from "@/components/admin/reservations/reservationTable";
import SystemActivities from "@/components/admin/reservations/systemActivities";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";


export default function ReservationsPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <AdminHeader />
      <Sidebar />

      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-6 mx-auto">
          <ReservationsHeader />
          <ReservationsTable />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DriverAvailability />
            <ReductionEngine />
            <SystemActivities />
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}