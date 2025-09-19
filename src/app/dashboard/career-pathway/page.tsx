"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

const pathways: Record<string, string[]> = {
  "Full-Stack Developer": [
    "Learn HTML, CSS, JavaScript",
    "Master React & Next.js",
    "Understand APIs & Databases",
    "Build full projects",
    "Prepare for system design interviews",
  ],
  "Data Scientist": [
    "Master Python & SQL",
    "Learn statistics & ML basics",
    "Work with Pandas & NumPy",
    "Build ML models",
    "Deploy AI projects",
  ],
};

export default function CareerPathway() {
  const [goal, setGoal] = useState<string>("Full-Stack Developer");
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompleted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Career Pathway</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Your Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            className="border p-2 rounded-md"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            {Object.keys(pathways).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{goal} Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {pathways[goal].map((step, index) => (
              <li
                key={index}
                onClick={() => toggleStep(index)}
                className="flex items-center gap-3 cursor-pointer"
              >
                {completed.includes(index) ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <Circle className="text-gray-400 w-5 h-5" />
                )}
                <span
                  className={`${
                    completed.includes(index)
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
