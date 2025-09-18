import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { question } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: question }],
  });

  const answer = completion.choices[0].message?.content || "No response";

  // Save to NeonDB
  await prisma.mentorChat.create({
    data: { question, answer },
  });

  return NextResponse.json({ answer });
}
