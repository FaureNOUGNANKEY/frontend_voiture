"use client";

import AdminFooter from "@/components/admin/adminFooter";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import IncidentsList from "@/components/admin/vehicules/incidentList";
import UpcomingMaintenance from "@/components/admin/vehicules/upcomingMaintenance";
import VehiculeHeader from "@/components/admin/vehicules/vehiculeHeader";
import VehiculeKpis from "@/components/admin/vehicules/vehiculeKpis";
import VehiclesTable from "@/components/admin/vehicules/vehiculeTable";
import { useEffect, useState } from "react";
import { getCarApi, getCarsApi } from "@/api/car";
import { Car, Category, Statistics } from "@/lib/types";
import { getCategoriesApi } from "@/api/category";
import { getStatisticsApi } from "@/api/statistic";

export default function VehiculesPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statistics, setStatistics] = useState<Statistics|null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const getCategories = async () => {
    try {
      const response = await getCategoriesApi();
      setCategories(response.data);
      console.log("Fetched Categories:", response.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);

    }
  }
   
  const getCars = async () => {
    try {
      const response = await getCarsApi();
      setCars(response.data);
      console.log("Fetched cars:", response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);

    }
  }

  const getStatistics = async () => {
    try {
      const response = await getStatisticsApi();
      setStatistics(response.data);
      console.log("Fetched Statistics:", response.data);
    } catch (error) {
      console.error("Error fetching Statistics:", error);

    }
  }

  const getCar = async (id: string | number) => {
    try {
      const response = await getCarApi(String(id));
      setSelectedCar(response.data);
      console.log("Fetched car:", response.data);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  useEffect(() => {
    getCars();
    getCategories();
    getStatistics();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 mx-auto">
          <VehiculeHeader categories={categories} onSuccess= {getCars}/>
          {statistics && <VehiculeKpis statistics={statistics} onSuccess={getStatistics} />}
          <VehiclesTable cars={cars} categories={categories} onEdit={(id: number | string) => getCar(id)} onSuccess={ () => {getCars();getStatistics()}}/>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IncidentsList />
            <UpcomingMaintenance />
          </div>
        </div>
      </main>
    </div>
  );
}