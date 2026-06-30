"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Prefs = {
  reduceMotion: boolean;
  readable: boolean;
  largeText: boolean;
};

type A11yContext = Prefs & {
  toggle: (key: keyof Prefs) => void;
  ready: boolean;
};

const defaultPrefs: Prefs = {
  reduceMotion: false,
  readable: false,
  largeText: false,
};

const Context = createContext<A11yContext | null>(null);

const STORAGE_KEY = "mt-a11y";

const classMap: Record<keyof Prefs, string> = {
  reduceMotion: "a11y-reduce",
  readable: "a11y-readable",
  largeText: "a11y-large",
};

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [ready, setReady] = useState(false);

  // One-time, hydration-safe read of persisted prefs after mount. We
  // intentionally start from defaults on the server/first client render to
  // avoid a hydration mismatch, then sync from localStorage once mounted.
  useEffect(() => {
    let initial = defaultPrefs;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) initial = { ...defaultPrefs, ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    (Object.keys(classMap) as (keyof Prefs)[]).forEach((key) => {
      root.classList.toggle(classMap[key], prefs[key]);
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs, ready]);

  const toggle = useCallback((key: keyof Prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }, []);

  return (
    <Context.Provider value={{ ...prefs, toggle, ready }}>
      {children}
    </Context.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useA11y must be used within AccessibilityProvider");
  return ctx;
}
