"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ✅ Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // ✅ Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-white">
          Welcome Back
        </h1>

        {/* ✅ Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 text-white border border-white/20 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/10 text-white border border-white/20 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
          >
            Sign In
          </button>
        </form>

        {/* ✅ Show error if login fails */}
        {error && (
          <p className="text-red-400 text-center mt-3 text-sm">{error}</p>
        )}

        <p className="text-center mt-6 text-sm text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
