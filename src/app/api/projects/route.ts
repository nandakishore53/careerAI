import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// ✅ Get all projects for a user
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const projects = await sql`
      SELECT id, title, description, created_at
      FROM projects
      WHERE user_id = ${userId}
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ projects });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Add a new project
export async function PUT(req: Request) {
  try {
    const { userId, title, description } = await req.json();

    if (!userId || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newProject = await sql`
      INSERT INTO projects (user_id, title, description)
      VALUES (${userId}, ${title}, ${description})
      RETURNING id, title, description, created_at;
    `;

    return NextResponse.json({ project: newProject[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
