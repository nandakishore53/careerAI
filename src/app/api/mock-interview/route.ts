// src/app/api/mock-interview/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    // Get AI feedback
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an HR interviewer. Score the answer and give feedback.",
        },
        { role: "user", content: `Q: ${question}\nA: ${answer}` },
      ],
    });

    const feedback =
      completion.choices[0].message?.content || "No feedback generated";

    // Save result to Neon
    const result = await sql`
      INSERT INTO mock_interviews (question, answer, feedback)
      VALUES (${question}, ${answer}, ${feedback})
      RETURNING id, question, answer, feedback
    `;

    return NextResponse.json({ success: true, interview: result[0] });
  } catch (err: any) {
    console.error("Mock interview error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
