"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("wallettoken");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, []);
};
