import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql);

migrate(db, { migrationsFolder: "db/migrations" });

