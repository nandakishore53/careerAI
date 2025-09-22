"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, Book, Code, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CareerPathway() {
  const [name, setName] = useState("");
  const [roadmap, setRoadmap] = useState<string[] | null>(null);
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
      if (data.roadmap) {
        const steps = data.roadmap.split(/\n\d*\.\s*/).filter(Boolean);
        setRoadmap(steps);
      } else {
        setRoadmap(["❌ Failed to generate roadmap."]);
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setRoadmap(["❌ Failed to generate roadmap."]);
    } finally {
      setLoading(false);
    }
  };

  const icons = [Book, Code, Users, CheckCircle];
  const colors = ["bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-600", "bg-green-100 border-green-400 dark:bg-green-900 dark:border-green-600", "bg-purple-100 border-purple-400 dark:bg-purple-900 dark:border-purple-600", "bg-blue-100 border-blue-400 dark:bg-blue-900 dark:border-blue-600"];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600 dark:text-blue-400">Career Pathway Planner 🚀</h1>

      <Card className="max-w-xl w-full mx-auto mb-8 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-2xl font-bold">Enter Your Career Goal</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="e.g. Full-Stack Developer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Generate"}
            </button>
          </form>
        </CardContent>
      </Card>

      {roadmap && (
        <Card className="max-w-xl w-full mx-auto shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-2xl font-bold">Generated Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ol className="space-y-4">
              <AnimatePresence>
                {roadmap.map((step, idx) => {
                  const Icon = icons[idx % icons.length];
                  const color = colors[idx % colors.length];
                  return (
                    <motion.li
                      key={idx}
                      className={`flex items-start p-4 rounded-xl border-l-4 shadow-md ${color}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                    >
                      <Icon className="w-6 h-6 mr-4 mt-1 text-gray-700 dark:text-gray-300 flex-shrink-0" />
                      <span className="flex-1 text-base font-medium leading-relaxed">{step}</span>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}