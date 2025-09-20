"use client";

import { useState } from "react";

export default function MockInterview() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setLoading(true);
    setFeedback("");
    const res = await fetch("/api/mock-interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, skills }),
    });
    const data = await res.json();
    setQuestion(data.question);
    setLoading(false);
  };

  const submitAnswer = async () => {
    setLoading(true);
    const res = await fetch("/api/mock-interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, skills, answer }),
    });
    const data = await res.json();
    setFeedback(data.feedback);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mock Interview</h1>

      {!question && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job Role (e.g., Frontend Developer)"
            className="w-full border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="text"
            placeholder="Skills (e.g., React, JavaScript)"
            className="w-full border p-2 rounded"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <button
            onClick={startInterview}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      )}

      {question && (
        <div className="mt-6">
          <p className="font-semibold">Question:</p>
          <p className="mb-4">{question}</p>

          <textarea
            placeholder="Type your answer here..."
            className="w-full border p-2 rounded mb-4"
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            onClick={submitAnswer}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Answer"}
          </button>
        </div>
      )}

      {feedback && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <p className="font-semibold">Feedback:</p>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
