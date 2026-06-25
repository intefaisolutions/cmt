import { createContext, useContext, useState, type ReactNode } from "react";

export type BusinessMode = "it" | "marketing";

interface BusinessContextValue {
  mode: BusinessMode;
  setMode: (m: BusinessMode) => void;
  label: string;
}

const BusinessContext = createContext<BusinessContextValue | undefined>(undefined);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BusinessMode>("it");
  const label = mode === "it" ? "IT Services" : "Digital Marketing";
  return (
    <BusinessContext.Provider value={{ mode, setMode, label }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error("useBusiness must be used within BusinessProvider");
  return ctx;
}
