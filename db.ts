import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { benefits, seniors, users } from './lib/db/schema';

const sqlite = new Database(process.env.DATABASE_URL!);
export const db = drizzle({
  client: sqlite,
  schema: {
    users,
    seniors,
    benefits,
  },
});