import { NextResponse } from "next/server";
import OpenAI from "openai";
import { saveMentorChat } from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { question } = await req.json();

  // Get AI response
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: question }],
  });

  const answer = completion.choices[0]?.message?.content || "No response";

  // Save to NeonDB
  await saveMentorChat(question, answer);

  return NextResponse.json({ answer });
}
