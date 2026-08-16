"use client"

import { getStatisticsApi } from "@/api/statistic";
import { getUserApi, getUsersApi } from "@/api/user";
import AdminFooter from "@/components/admin/adminFooter";
import AdminHeader from "@/components/admin/adminHeader";
import Sidebar from "@/components/admin/sidebar";
import UsersHeader from "@/components/admin/users/usersHeader";
import UsersStats from "@/components/admin/users/usersStats";
import UsersTable from "@/components/admin/users/usersTable";
import { useAuth } from "@/contexts/AuthContext";
import RequireAdmin from "@/contexts/RequireAdmin";
import { Statistics, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function UsersPage() {

  const [users, setUsers] = useState<User[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [selecteduser, setSelectedUser] = useState<User | null>(null)

// Quand un client s’inscrit :
  const handleSuccess = async (newUser?: User) => {
  if (newUser) {
    // Ajout direct au state si on reçoit un utilisateur
    setUsers((prev) => [...prev, newUser]);
  }

  // Re-fetch pour être sûr que la liste est à jour
  await getUsers();
};



  const getUsers = async () => {
    try {
      const response = await getUsersApi();
      setUsers(response.data);
      console.log("Fetched users :", response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const getStatistics = async () => {
    try {
      const response = await getStatisticsApi();
      setStatistics(response.data);
      console.log(" Fetched Statistics :", response.data);
    } catch (error){
      console.error("Error fetching Statistics:",error)
    }
  }

  const getUser = async (id: string | number) => {
    try {
      const response = await getUserApi(String(id));
      setSelectedUser(response.data);
      console.log(" Fetched User :", response.data);
    } catch (error){
      console.error("Error fetching User:",error)
    }
  }

  useEffect(() => {
    getUsers();
    getStatistics();
  },[]);


  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 max-w-7xl mx-auto space-y-8">
          <UsersHeader onSuccess={getUsers}/>
          {statistics && <UsersStats statistics={statistics}/>}
          <UsersTable users={users} onEdit={(id: number | string) => getUser(id)} onSuccess={handleSuccess}  />
        </div>
      </main>
    </div>
  );
}