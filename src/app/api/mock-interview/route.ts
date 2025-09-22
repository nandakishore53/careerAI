// src/app/api/mock-interview/route.ts
import { NextResponse } from "next/server";
import { queryCohere } from "@/lib/cohere";

export async function POST(req: Request) {
  try {
    const { profile, answer } = await req.json();

    if (!profile) {
      return NextResponse.json(
        { error: "User profile is required." },
        { status: 400 }
      );
    }

    // Step 1: Generate a question based on user profile
    const questionPrompt = `
You are an interviewer. The user profile is:
${JSON.stringify(profile)}
Generate 1 relevant interview question for this user.
Return only the question text.
`;
    const question = await queryCohere(questionPrompt);

    // Step 2: If the user has provided an answer, evaluate it
    let feedback = "";
    if (answer) {
      const feedbackPrompt = `
Question: ${question}
Answer: ${answer}
Provide feedback and score (1-10) for the answer.
Format as: Feedback: ... Score: ...
`;
      feedback = await queryCohere(feedbackPrompt);
    }

    return NextResponse.json({ question, feedback });
  } catch (err: any) {
    console.error("Mock interview error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate question." },
      { status: 500 }
    );
  }
}
