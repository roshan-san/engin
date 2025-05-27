import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";
import * as schema from "./schema";

const sql = postgres(process.env.DATABASE_URL as string, { prepare: false });

export const db = drizzle(sql, { schema });
