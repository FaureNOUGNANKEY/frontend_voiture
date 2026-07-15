"use client";

import { useRouter } from "next/navigation";
import HomeClient from "./client/page";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/client")
  }, []);
}
