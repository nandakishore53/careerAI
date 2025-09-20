// src/app/api/career-mentor/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { saveMentorChat } from "@/lib/db";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId, question } = await req.json();
    if (!question) return NextResponse.json({ error: "Missing question" }, { status: 400 });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a career coach. Provide clear, actionable advice." },
        { role: "user", content: question },
      ],
    });

    const answer = completion?.choices?.[0]?.message?.content ?? "No response";
    await saveMentorChat(userId ?? null, question, answer);

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
