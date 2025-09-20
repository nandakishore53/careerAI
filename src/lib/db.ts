// src/lib/db.ts
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment");
}

// create and export named sql
export const sql = neon(process.env.DATABASE_URL);

// Example helpers

export async function findUserByEmail(email: string) {
  // parameterized query prevents injection
  const rows = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  return rows[0] || null;
}

export async function createUser(email: string, passwordHash: string) {
  const rows = await sql`
    INSERT INTO users (email, password_hash, created_at)
    VALUES (${email}, ${passwordHash}, now())
    RETURNING *;
  `;
  return rows[0];
}

export async function saveMentorChat(userId: string | null, question: string, answer: string) {
  const rows = await sql`
    INSERT INTO mentor_chat (user_id, question, answer, created_at)
    VALUES (${userId}, ${question}, ${answer}, now())
    RETURNING *;
  `;
  return rows[0];
}
