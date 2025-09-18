// components/features/MockInterview.tsx
"use client";
import { ChangeEvent } from "react"; 
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MessageSquare, Clock, Star, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function MockInterview() {
  const [interviewType, setInterviewType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes per question

  const questionSets = {
    technical: [
      "Explain the difference between let, const, and var in JavaScript.",
      "How would you optimize a slow-performing React component?",
    ],
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member.",
      "How do you handle tight deadlines and pressure?",
    ],
    leadership: [
      "Describe your leadership style and give an example of when you used it.",
      "How do you handle conflicts within your team?",
    ],
  };

  const currentQuestions = questionSets[interviewType as keyof typeof questionSets] || [];

  const startInterview = () => {
    if (!interviewType) return;
    setIsInterviewStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) return;
    const newAnswers = [...answers, userAnswer];
    setAnswers(newAnswers);
    setUserAnswer("");

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(300);
    } else {
      setIsInterviewComplete(true);
    }
  };

  if (isInterviewComplete) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Interview Feedback</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You answered {answers.length} questions. Great practice!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isInterviewStarted) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Mock Interview</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {currentQuestions.length}
            </p>
          </div>
          <div className="text-right">
            <Clock className="inline w-4 h-4 mr-1" />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Interview Question</CardTitle>
            <CardDescription>{interviewType} interview</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{currentQuestions[currentQuestion]}</p>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              rows={6}
              placeholder="Write your answer here..."
              className="mb-4"
            />
            <Button onClick={submitAnswer}>
              {currentQuestion === currentQuestions.length - 1 ? "Finish Interview" : "Next Question"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Mock Interview Practice</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card
          className={`cursor-pointer ${interviewType === "technical" && "border-career-primary"}`}
          onClick={() => setInterviewType("technical")}
        >
          <CardHeader>
            <CardTitle>Technical</CardTitle>
          </CardHeader>
          <CardContent>Programming & system design</CardContent>
        </Card>
        <Card
          className={`cursor-pointer ${interviewType === "behavioral" && "border-career-primary"}`}
          onClick={() => setInterviewType("behavioral")}
        >
          <CardHeader>
            <CardTitle>Behavioral</CardTitle>
          </CardHeader>
          <CardContent>Situational & past experience</CardContent>
        </Card>
        <Card
          className={`cursor-pointer ${interviewType === "leadership" && "border-career-primary"}`}
          onClick={() => setInterviewType("leadership")}
        >
          <CardHeader>
            <CardTitle>Leadership</CardTitle>
          </CardHeader>
          <CardContent>Management & leadership</CardContent>
        </Card>
      </div>

      <Button
        onClick={startInterview}
        className="mt-6 bg-career-primary text-white"
        disabled={!interviewType}
      >
        Start Interview
      </Button>
    </div>
  );
}
