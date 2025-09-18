import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { question, answer } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an HR interviewer. Score and give feedback." },
      { role: "user", content: `Q: ${question}\nA: ${answer}` },
    ],
  });

  const feedback = completion.choices[0].message?.content || "No feedback";

  await prisma.mockInterview.create({
    data: { question, answer, feedback },
  });

  return NextResponse.json({ feedback });
}
