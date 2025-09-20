// src/app/api/test/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`SELECT count(*)::int as cnt FROM users`;
    const count = rows?.[0]?.cnt ?? 0;
    return NextResponse.json({ userCount: count });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
