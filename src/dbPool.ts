import { Pool } from "pg";

export const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});
