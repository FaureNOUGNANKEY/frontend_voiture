import AdminFooter from "@/components/admin/adminFooter";
import AdminHeader from "@/components/admin/adminHeader";
import Sidebar from "@/components/admin/sidebar";
import UsersHeader from "@/components/admin/users/usersHeader";
import UsersStats from "@/components/admin/users/usersStats";
import UsersTable from "@/components/admin/users/usersTable";


export default function UsersPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 max-w-7xl mx-auto space-y-8">
          <UsersHeader />
          <UsersStats />
          <UsersTable />
        </div>
      </main>
    </div>
  );
}