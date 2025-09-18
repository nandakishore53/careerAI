// components/features/CareerMentor.tsx
"use client";
import { ChangeEvent } from "react"; 

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";

export default function CareerMentor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askMentor = () => {
    if (!question.trim()) {
      setAnswer("Please ask a career-related question.");
      return;
    }
    setAnswer(
      `That’s a great question! For "${question}", I recommend focusing on continuous learning, practicing interview questions, and networking with industry professionals.`
    );
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-career-accent" />
            Career Mentor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Ask your AI career mentor anything about jobs, growth, or interviews.
          </p>
          <Textarea
            placeholder="e.g., How can I prepare for my first job interview?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mb-4"
          />
          <Button onClick={askMentor} className="bg-career-accent text-white mb-6">
            Ask Mentor
          </Button>
          {answer && (
            <div className="p-4 bg-muted rounded-lg text-foreground">{answer}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
