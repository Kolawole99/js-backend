import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../app/db/schema.js";
import Environment from "./env.js";

const pool = postgres(Environment.POSTGRES_URL, {
	max: Environment.POSTGRES_POOL_SIZE,
});

const db = drizzle(pool, { schema });

export default db;
