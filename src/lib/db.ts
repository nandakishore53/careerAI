import { neon } from "@neondatabase/serverless";

// Create a connection using your DATABASE_URL
const sql = neon(process.env.DATABASE_URL!);
export default sql;
const users = await sql`SELECT * FROM users`;
console.log(users);

