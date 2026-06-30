"use client";

import { createContext, useContext, useState } from "react";

export type Audience = "kids" | "parents";

type AudienceContext = {
  audience: Audience;
  setAudience: (a: Audience) => void;
};

const Context = createContext<AudienceContext | null>(null);

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudience] = useState<Audience>("kids");
  return (
    <Context.Provider value={{ audience, setAudience }}>
      {children}
    </Context.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
