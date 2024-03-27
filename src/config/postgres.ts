import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'

import Environment from "./env.js";
import * as schema from "../app/db/schema.js";

const pool = postgres(Environment.POSTGRES_URL, { max: Environment.POSTGRES_POOL_SIZE });

const db = drizzle(
  pool, 
  { schema }
);

export default db;
