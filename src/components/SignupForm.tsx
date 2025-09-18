"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      alert(`✅ Account created for ${data.user.email}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-white">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
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
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-center mt-3 text-sm">{error}</p>
        )}

        <p className="text-center mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </main>
  );
}
