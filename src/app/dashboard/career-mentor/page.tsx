"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "mentor"; content: string };

const exampleQuestions = [
  "How do I become a Full-Stack Developer?",
  "What skills are required for Data Science?",
  "How can I prepare for a product management role?",
  "Tips to switch careers into AI/ML?"
];

export default function CareerMentor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/career-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const reply: string = data.reply || "❌ Mentor is unavailable. Try again.";

      setMessages((prev) => [...prev, { role: "mentor", content: reply }]);
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "mentor", content: "❌ Failed to get response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    sendMessage(input);
    setInput("");
  };

  const handleExampleClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className={`${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-100 text-gray-900"} min-h-screen px-4 sm:px-6 py-12 flex flex-col items-center transition-colors duration-500`}>
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">Career Mentor 🧠</h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-3 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {/* Example Questions */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-3xl">
        {exampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleExampleClick(q)}
            className={`${darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} px-4 py-2 rounded-full font-medium transition-colors transform hover:scale-105`}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Card */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} flex-1 w-full max-w-3xl flex flex-col shadow-lg rounded-2xl`}>
        <CardContent className="flex-1 overflow-y-auto space-y-4 p-6 flex flex-col">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 p-4 rounded-xl max-w-[85%] ${
                  msg.role === "user"
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center text-sm font-bold shadow-md">
                  {msg.role === "user" ? "🧑‍🎓" : "🤖"}
                </div>
                <div className="flex-1 font-medium">{msg.content}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex items-center text-gray-500 dark:text-gray-400 mt-4 px-4 py-2">
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              <span className="font-medium italic">Mentor is typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </CardContent>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex mt-4 gap-3 p-6 border-t border-gray-200 dark:border-gray-700"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a career question..."
            className={`${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-400" : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500 focus:ring-blue-500"} flex-1 border px-5 py-3 rounded-full focus:outline-none focus:ring-2 transition-colors`}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </Card>
    </div>
  );
}