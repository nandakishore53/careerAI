import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sql } from "@/lib/db";

export async function GET() {
  // Prisma query
  const prismaUser = await prisma.user.findFirst();

  // Raw SQL query
  const rawUsers = await sql`SELECT COUNT(*) FROM users`;

  return NextResponse.json({
    firstUser: prismaUser,
    userCount: rawUsers[0].count,
  });
}
