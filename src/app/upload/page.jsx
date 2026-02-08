"use client";
import { useEffect, useState } from "react";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  const [exists, setExists] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((d) => setExists(d.exists));
  }, []);

  const setup = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, confirmPassword: confirm }),
    });
    setLoading(false);
    if (res.ok) setAuthed(true);
    else alert("Setup failed");
  };

  const login = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) setAuthed(true);
    else alert("Wrong password");
  };

  if (exists === null) return null;

  return (
    <div className="min-h-screen bg-liner-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 sm:p-8">
        {!authed ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                🔐 Admin Access
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {exists
                  ? "Enter your password to manage uploads"
                  : "Create a one-time admin password"}
              </p>
            </div>

            {!exists ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Create password
                  </label>
                  <input
                    type="password"
                    placeholder="Create password"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>

                <button
                  onClick={setup}
                  disabled={loading}
                  className="w-full mt-2 rounded-lg bg-black text-white py-2.5 font-medium hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Admin Password"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  onClick={login}
                  disabled={loading}
                  className="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            )}
          </>
        ) : (
          <UploadForm />
        )}
      </div>
    </div>
  );
}
