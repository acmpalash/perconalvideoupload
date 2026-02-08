"use client";
import { useState, useEffect } from "react";

export default function AppGate({ children }) {
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);

  // useEffect(() => {
  //   const saved = localStorage.getItem("app_auth");
  //   if (saved === "true") setOk(true);
  // }, []);

  const submit = () => {
    if (password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
      // localStorage.setItem("app_auth", "true");
      setOk(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">🔐 Enter Password</h1>
          <input
            type="password"
            placeholder="App password"
            className="w-full rounded-lg border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={submit}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
