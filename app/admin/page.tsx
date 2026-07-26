"use client";

import ActivityChart from "@/components/admin/dashboard/activityChart";
import AdminFooter from "@/components/admin/adminFooter";
import AlertsList from "@/components/admin/dashboard/alertList";
import FleetTable from "@/components/admin/dashboard/fleettable";
import KpiCard from "@/components/admin/dashboard/kpiCard";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";
import { getStatisticsApi } from "@/api/statistic";
import { Statistics } from "@/lib/types";
import { useState, useEffect } from "react";

export default function DashboardPage() {

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  
    const getStatistics = async () => {
      try {
        const response = await getStatisticsApi();
        setStatistics(response.data);
        console.log("Fetched Statistics:", response.data);
      } catch (error) {
        console.error("Error fetching Statistics:", error);
  
      }
    }
    
    useEffect(() => {
      getStatistics();
    }, []);
  
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <AdminHeader />
      <Sidebar />

      <main className="ml-64 mt-16 p-6 min-h-screen">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Bienvenue dans votre centre de gestion AutoFleet.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              type="button"
              className="px-4 py-5 border border-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 bg-white"
            >
              <CalendarDays size={18} />
              Last 30 Days
            </Button>
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <Download size={18} />
              Export Report
            </button>
          </div>
        </header>

        {/* KPI Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> */}
        <div className=" mx-auto">
          {/* {statistics &&
            kpis.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} statistics={statistics} />
            ))} */}
          {statistics && <KpiCard statistics={statistics} />}
        </div>

        {/* Chart + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {statistics && <ActivityChart statistics={statistics} />}
          <AlertsList />
        </div>

        {/* Fleet Table */}
        <FleetTable />
      </main>

      <AdminFooter />
    </div>
  );
}
