import MaintenanceActivityAndSupport from "@/components/admin/maintenance/maintenanceActivityandSupport";
import MaintenanceHeader from "@/components/admin/maintenance/maintenanceheader";
import MaintenanceOverview from "@/components/admin/maintenance/maintenanceoverview";
import MaintenanceTable from "@/components/admin/maintenance/maintenancetable";



export default function MaintenancePage() {
  return (
    <div className="bg-slate-50 text-slate-900 p-6 mx-auto">
      <MaintenanceHeader />
      <MaintenanceOverview />
      <MaintenanceTable />
      <MaintenanceActivityAndSupport />
    </div>
  );
}