"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { queryCohere } from "@/lib/cohere";

type QuestionData = {
  question: string;
  answer: string;
  feedback: string;
  score: number;
};

const STRESS_QUESTIONS = [
  "Tell me about yourself.",
  "How has your day been so far?",
];

export default function MockInterview() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [interviewStarted, setInterviewStarted] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<QuestionData[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const [stressIndex, setStressIndex] = useState(0);

  const userProfile = {
    role,
    skills: skills.split(",").map((s) => s.trim()),
    level,
  };

  // Start interview
  const startInterview = () => {
    if (!role || !skills) return;
    setInterviewStarted(true);
    setQuestion(STRESS_QUESTIONS[0]);
    setStressIndex(0);
  };

  const fetchNextQuestion = async () => {
    setLoading(true);

    try {
      // First handle stress-relief questions
      if (stressIndex < STRESS_QUESTIONS.length - 1) {
        const nextIdx = stressIndex + 1;
        setQuestion(STRESS_QUESTIONS[nextIdx]);
        setStressIndex(nextIdx);
        setAnswer("");
        setFeedback(null);
        setLoading(false);
        return;
      }

      // Then fetch normal questions from API
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: userProfile }),
      });
      const data = await res.json();
      setQuestion(data.question || "Describe a project you worked on.");
      setAnswer("");
      setFeedback(null);
    } catch (err) {
      console.error(err);
      setQuestion("Describe a project you worked on.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer) return;
    setLoading(true);

    try {
      // Skip scoring for stress-relief questions
      let score = 0;
      let feedbackText = "Relax, just a warm-up question.";

      if (stressIndex >= STRESS_QUESTIONS.length) {
        const res = await fetch("/api/mock-interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: userProfile, question, answer }),
        });
        const data = await res.json();

        feedbackText = data.feedback || "No feedback provided.";
        // Simple scoring heuristic
        score = Math.min(10, Math.floor(answer.length / 10));
      }

      const newEntry: QuestionData = {
        question,
        answer,
        feedback: feedbackText,
        score,
      };

      setHistory((prev) => [...prev, newEntry]);
      setTotalScore((prev) => prev + score);
      setFeedback(feedbackText);
    } catch (err) {
      console.error(err);
      setFeedback("❌ Failed to get feedback.");
    } finally {
      setLoading(false);
    }
  };

  if (!interviewStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-600 dark:text-blue-400">Setup Mock Interview 🧠</h1>
        <Card className="w-full max-w-lg p-8 space-y-6 shadow-xl dark:bg-gray-800 dark:text-gray-100 rounded-2xl">
          <div>
            <label className="block font-semibold mb-2 text-lg">Your Role:</label>
            <input
              type="text"
              placeholder="e.g., Full-Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-lg">Your Skills (comma separated):</label>
            <input
              type="text"
              placeholder="e.g., JavaScript, React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-lg">Difficulty Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            onClick={startInterview}
            disabled={!role || !skills}
            className="w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Interview
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 flex flex-col items-center px-4 sm:px-6 py-10 space-y-6">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">Mock Interview ({level.toUpperCase()})</h1>

      <Card className="w-full max-w-3xl p-6 flex flex-col space-y-6 shadow-xl dark:bg-gray-800 rounded-2xl">
        {/* Question */}
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <CardTitle className="text-2xl font-bold">Question:</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-xl font-medium leading-relaxed">{question}</p>
        </CardContent>

        {/* Answer input */}
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <CardTitle className="text-2xl font-bold">Your Answer:</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            rows={6}
          />
        </CardContent>

        {/* Submit */}
        <button
          onClick={submitAnswer}
          disabled={loading || !answer}
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit Answer"}
        </button>

        {/* Feedback */}
        {feedback && (
          <CardContent className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg p-4 transition-colors">
            <p className="font-bold text-lg mb-1">Mentor Feedback:</p>
            <p className="font-medium leading-relaxed">{feedback}</p>
            <p className="mt-2 font-bold text-lg">
              Score: {history.length ? history[history.length - 1].score : 0} / 10
            </p>
          </CardContent>
        )}

        {/* Next question */}
        <button
          onClick={fetchNextQuestion}
          disabled={loading}
          className="bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Next Question
        </button>
      </Card>

      {/* Total summary */}
      <Card className="w-full max-w-3xl p-6 mt-6 bg-yellow-50 dark:bg-yellow-900 shadow-xl rounded-2xl">
        <CardHeader className="border-b border-yellow-200 dark:border-yellow-700 pb-4">
          <CardTitle className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">Total Score & Feedback Summary:</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <p className="mb-4 font-bold text-xl">Total Score: {totalScore}</p>
          <div className="space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <p className="font-semibold text-lg">
                  <span className="text-blue-600 dark:text-blue-400">Q:</span> {item.question}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-green-600 dark:text-green-400">A:</span> {item.answer}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-red-600 dark:text-red-400">Feedback:</span> {item.feedback}
                </p>
                <p className="mt-1">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Score:</span> {item.score}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}