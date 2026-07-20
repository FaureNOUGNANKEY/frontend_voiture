"use client";

import HomeCategories from "@/components/client/home/HomeCategories";
import HomeCTA from "@/components/client/home/HomeCTA";
import HomeHero from "@/components/client/home/HomeHero";
import HomeServices from "@/components/client/home/HomeServices";
//import { getCarsApi } from "@/lib/api";
//import { Car } from "@/lib/types";
//import { useEffect, useState } from "react";

export default function HomeClient() {
  return (
    <main>
      <HomeHero />
      <HomeServices />
      <HomeCategories />
      <HomeCTA />
    </main>
  );
}