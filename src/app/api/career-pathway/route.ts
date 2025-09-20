// src/app/api/career-pathway/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET /api/career-pathway
// Fetch all available career pathways
export async function GET() {
  try {
    const pathways = await sql`
      SELECT id, title, description, steps 
      FROM career_pathways
      ORDER BY id ASC
    `;

    return NextResponse.json({ pathways });
  } catch (err: any) {
    console.error("Career pathway fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/career-pathway
// Add a new career pathway
export async function POST(req: Request) {
  try {
    const { title, description, steps } = await req.json();

    if (!title || !description || !steps) {
      return NextResponse.json(
        { error: "Title, description, and steps are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO career_pathways (title, description, steps)
      VALUES (${title}, ${description}, ${steps})
      RETURNING id, title, description, steps
    `;

    return NextResponse.json({ success: true, pathway: result[0] });
  } catch (err: any) {
    console.error("Career pathway insert error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
