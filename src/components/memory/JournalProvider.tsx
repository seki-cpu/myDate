"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import type { JournalMemory } from "../../types/domain";
import { isBackendConfigured, supabase } from "../../lib/supabase";
import { MemoryService } from "../../lib/services/memories";

type JournalContext = {
  user: User | null;
  loading: boolean;
  memories: JournalMemory[];
  error: boolean;
  refresh: () => Promise<void>;
};
const Context = createContext<JournalContext>({
  user: null,
  loading: true,
  memories: [],
  error: false,
  refresh: async () => {},
});
export const useJournal = () => useContext(Context);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [memories, setMemories] = useState<JournalMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const identity = useRef<string | null>(null);
  const generation = useRef(0);
  const refresh = useCallback(async () => {
    const owner = identity.current;
    if (!owner) return;
    const request = ++generation.current;
    try {
      const result = await MemoryService.list();
      if (owner === identity.current && request === generation.current) {
        setMemories(result);
        setError(false);
      }
    } catch {
      if (owner === identity.current && request === generation.current)
        setError(true);
    }
  }, []);

  useEffect(() => {
    if (!isBackendConfigured()) {
      setLoading(false);
      return;
    }
    let alive = true;
    const { data } = supabase().auth.onAuthStateChange((_event, session) => {
      if (!alive) return;
      const next = session?.user ?? null;
      if (identity.current !== (next?.id ?? null)) {
        ++generation.current;
        setMemories([]);
        setError(false);
      }
      identity.current = next?.id ?? null;
      setUser(next);
      setLoading(false);
      // Leave the auth callback before invoking another Supabase operation.
      if (next)
        setTimeout(() => {
          if (alive) void refresh();
        }, 0);
    });
    return () => {
      alive = false;
      data.subscription.unsubscribe();
    };
  }, [refresh]);
  return (
    <Context.Provider value={{ user, memories, loading, error, refresh }}>
      {children}
    </Context.Provider>
  );
}
