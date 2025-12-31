/* eslint-disable react-hooks/refs */
"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, createStore } from "@/shared/store";

export default function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
