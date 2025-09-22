// src/app/api/career-mentor/route.ts
import { NextResponse } from "next/server";
import { queryCohere } from "@/lib/cohere";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Call Cohere API
    const reply = await queryCohere(
      `You are a career mentor. Answer this query: ${message}`
    );

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Career mentor API error:", err);
    // Fallback response if API fails
    const fallback = `
1. Learn basics of your field
2. Build small projects
3. Network with professionals
4. Apply for internships
`;
    return NextResponse.json({ reply: fallback }, { status: 200 });
  }
}
