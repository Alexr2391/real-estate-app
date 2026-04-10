import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  prepare: false,
  max: 1,
  ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
  debug: process.env.NODE_ENV === 'development',
});
export const db = drizzle(client);
