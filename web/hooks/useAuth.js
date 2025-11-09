"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = (route) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("wallettoken");

    if (token) {
      router.replace(`/${route}`);
    } else {
      router.replace("/");
    }
  }, []);
};
