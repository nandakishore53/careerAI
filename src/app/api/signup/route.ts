import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const result = await sql`
      INSERT INTO users (email, password) 
      VALUES (${email}, ${hashedPassword})
      RETURNING id, email
    `;

    return NextResponse.json({
      success: true,
      user: result[0], // returns the saved user
    });
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
