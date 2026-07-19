"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminSnapshot } from "@/lib/admin-data";

export function useAdminLive() {
  const [data, setData] = useState<AdminSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/overview", { credentials: "include" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to load admin data");
        return;
      }
      setData(json);
      setError(null);
    } catch {
      setError("Could not reach admin API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const es = new EventSource("/api/admin/stream");
    es.onopen = () => setLive(true);
    es.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data) as AdminSnapshot & { error?: string };
        if (json.error) return;
        if (json.stats) {
          setData(json);
          setError(null);
          setLoading(false);
        }
      } catch {
        /* ignore bad frames */
      }
    };
    es.onerror = () => {
      setLive(false);
      es.close();
    };
    return () => {
      es.close();
      setLive(false);
    };
  }, []);

  useEffect(() => {
    if (live) return;
    const id = setInterval(() => {
      void refresh();
    }, 5000);
    return () => clearInterval(id);
  }, [live, refresh]);

  return { data, error, live, loading, refresh };
}
