import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const client = postgres(process.env.POSTGRES_URL as string, { max: 1 });

const db = drizzle(client);

const main = async () => {
	try {
		await migrate(
            db, 
            { migrationsFolder: "src/app/db/migrations" }
        );

		console.log("Migration successful");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();
