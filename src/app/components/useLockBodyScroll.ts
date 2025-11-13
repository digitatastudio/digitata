"use client";
import { useLayoutEffect } from "react";

export default function useLockBodyScroll(lock = true) {
  useLayoutEffect(() => {
    const prev = document.body.style.overflow;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lock]);
}