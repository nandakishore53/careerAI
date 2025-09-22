import { NextResponse } from "next/server";
import { queryCohere } from "@/lib/cohere";

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();

    if (!profile?.name) {
      return NextResponse.json({ error: "Profile name is required" }, { status: 400 });
    }

    // Generate AI roadmap
    const roadmap = await queryCohere(
      `Generate a detailed career roadmap for: ${profile.name}. Include clear steps, milestones, and resources.`
    );

    return NextResponse.json({ roadmap });
  } catch (err) {
    console.error("Career pathway API error:", err);

    // Fallback roadmap
    return NextResponse.json({
      roadmap: `
1. Learn the basics of the field.
2. Build small projects to practice.
3. Contribute to open source or community projects.
4. Apply for internships or freelance work.
`
    }, { status: 500 });
  }
}
