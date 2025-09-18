// components/features/CareerGuidance.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Compass } from "lucide-react";

export default function CareerGuidance() {
  const [field, setField] = useState("");
  const [guidance, setGuidance] = useState("");

  const generateGuidance = () => {
    if (!field.trim()) {
      setGuidance("Please enter a career field to get guidance.");
      return;
    }
    setGuidance(
      `Great choice! In ${field}, you should focus on building strong fundamentals, networking with professionals, and working on projects to showcase your skills.`
    );
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-career-primary" />
            Career Pathway
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Enter a career field to explore your personalized roadmap.
          </p>
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="e.g., Software Engineering"
              value={field}
              onChange={(e) => setField(e.target.value)}
            />
            <Button onClick={generateGuidance} className="bg-career-primary text-white">
              Generate
            </Button>
          </div>
          {guidance && (
            <div className="p-4 bg-muted rounded-lg text-foreground">
              <Briefcase className="w-4 h-4 inline-block mr-2 text-career-accent" />
              {guidance}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
