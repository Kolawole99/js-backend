import * as z from "zod";

const zodEnv = z.object({
	APP_ENV: z.string(),
	NODE_ENV: z.string(),
	PORT: z.string(),
	POSTGRES_URL: z.string(),
	POSTGRES_POOL_SIZE: z.number(),
	MONGO_URL: z.string(),
	MONGO_TIMEOUT: z.number(),
	OTEL_HOST: z.string(),
	LOGS_PORT: z.number(),
	METRICS_AND_TRACES_PORT: z.string(),
});
type EnvironmentType = z.infer<typeof zodEnv>;

const Environment: EnvironmentType & { getAndValidate: () => void } = {
	getAndValidate: () => {
		try {
			zodEnv.parse(process.env);
		} catch (err) {
			if (err instanceof z.ZodError) {
				const { fieldErrors } = err.flatten();
				const errorMessage = Object.entries(fieldErrors)
					.map(([field, errors]) =>
						errors ? `${field}: ${errors.join(", ")}` : field,
					)
					.join("\n  ");
				throw new Error(`Missing environment variables:\n  ${errorMessage}`);
			}
		}
	},
	APP_ENV: process.env.APP_ENV as string,
	NODE_ENV: process.env.NODE_ENV as string,
	PORT: process.env.PORT as string,
	POSTGRES_URL: process.env.POSTGRES_URL as string,
	POSTGRES_POOL_SIZE: Number.parseInt(
		process.env.POSTGRES_POOL_SIZE as string,
		10,
	),
	MONGO_URL: process.env.MONGO_URL as string,
	MONGO_TIMEOUT: Number.parseInt(process.env.MONGO_TIMEOUT as string, 10),
	OTEL_HOST: process.env.OTEL_HOST as string,
	LOGS_PORT: Number.parseInt(process.env.LOGS_PORT as string, 10),
	METRICS_AND_TRACES_PORT: process.env.METRICS_AND_TRACES_PORT as string,
};

export default Environment;
