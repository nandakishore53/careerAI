import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { profile } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a career coach. Generate a step-by-step roadmap." },
      { role: "user", content: JSON.stringify(profile) },
    ],
  });

  const roadmap = completion.choices[0].message?.content || "No roadmap generated";

  await prisma.careerPathway.create({
    data: {
      name: profile.name,
      roadmap,
    },
  });

  return NextResponse.json({ roadmap });
}
