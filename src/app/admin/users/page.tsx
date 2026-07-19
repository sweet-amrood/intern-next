"use client";

import { useState } from "react";
import { useAdminLive } from "@/hooks/useAdminLive";
import { Button } from "@/components/ui/Button";

export default function AdminUsersPage() {
  const { data, live, refresh } = useAdminLive();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function setAccess(userId: string, action: "grant-admin" | "revoke-admin") {
    setBusyId(userId);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, action }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Could not update role");
        return;
      }
      await refresh();
    } catch {
      setError("Could not update role");
    } finally {
      setBusyId(null);
    }
  }

  const users = data?.users ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-white/55">
          <strong className="text-white/80">Grant admin</strong> keeps student access and adds
          admin (both flags). On login/reload they choose Dashboard or Admin panel, and can switch
          from the header. <strong className="text-white/80">Remove admin</strong> leaves them as
          student only.
        </p>
        <span className={`shrink-0 text-xs font-semibold ${live ? "text-brand" : "text-white/40"}`}>
          {live ? "Live" : "Syncing…"}
        </span>
      </div>

      {error && <p className="rounded-xl bg-danger/15 px-3 py-2 text-sm text-danger">{error}</p>}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/45">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Roles</th>
              <th className="px-4 py-3">Enrollments</th>
              <th className="px-4 py-3">Auth</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const roles = Array.isArray(u.roles)
                ? u.roles
                : u.role === "admin"
                  ? ["admin"]
                  : ["student"];
              const isAdmin = roles.includes("admin");
              const both = roles.includes("admin") && roles.includes("student");
              return (
                <tr key={u.id} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{u.name}</p>
                    <p className="text-white/45">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {roles.map((r) => (
                        <span
                          key={r}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            r === "admin"
                              ? "bg-brand/20 text-brand"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {r}
                        </span>
                      ))}
                      {both && (
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/45">
                          dual
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/70">{u.enrollmentCount}</td>
                  <td className="px-4 py-3 text-white/55">{u.authProvider}</td>
                  <td className="px-4 py-3">
                    {isAdmin ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={busyId === u.id}
                        onClick={() => void setAccess(u.id, "revoke-admin")}
                      >
                        Remove admin
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        disabled={busyId === u.id}
                        onClick={() => void setAccess(u.id, "grant-admin")}
                      >
                        Grant admin
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
