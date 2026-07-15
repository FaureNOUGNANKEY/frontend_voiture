"use client";

import HomeCategories from "@/components/client/home/HomeCategories";
import HomeCTA from "@/components/client/home/HomeCTA";
import HomeHero from "@/components/client/home/HomeHero";
import HomeServices from "@/components/client/home/HomeServices";

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