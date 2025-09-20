"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CareerPathway() {
  const [name, setName] = useState("");
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);

    try {
      const res = await fetch("/api/career-pathway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: { name } }),
      });

      const data = await res.json();
      setRoadmap(data.roadmap);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setRoadmap("❌ Failed to generate roadmap. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Career Pathway</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Your Career Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. Full-Stack Developer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate"}
            </button>
          </form>
        </CardContent>
      </Card>

      {roadmap && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{roadmap}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
