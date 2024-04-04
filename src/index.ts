/**
 * Setup and Read Application Secrets By Environments
 *
 * This will enable us to read application secrtes by environments
 * This also caches the secrets in memory and exports them in the Environment
 */
import Enviroment from "./config/env.js";
Enviroment.getAndValidate();

/**
 * Setup OpenTelemetry
 *
 * This will enable us to ship logs and traces to collectors
 * for external analysis
 */
import OpenTelemetry from "./config/otel.js";
import Logger from "./utils/logger.js";
OpenTelemetry.start();

// Gracefully shut down the SDK on process exit
const shutdownEvents = ["SIGINT", "SIGTERM"];
for (const signal of shutdownEvents) {
	process.on(signal, () => {
		OpenTelemetry.shutdown()
			.then(() => Logger.info("OpenTelemetry terminated"))
			.catch((error: unknown) =>
				Logger.error(error, "Error terminating OpenTelemetry"),
			)
			.finally(() => process.exit(0));
	});
}

/**
 * Setup Datastores Connection
 *
 * This will enable us to keep a connection pool to the databstores we use
 * for faster API calls
 */
import Mongo from "./config/mongo.js";
require("./config/postgres.js");
await Mongo.connect();

import App from "./app/index.js";
import Environment from "./config/env.js";

Bun.serve({
	fetch: App.fetch,
	port: Environment.PORT,
});

Logger.info(
	`${Enviroment.APP_ENV} deployment is running on port ${Environment.PORT}`,
);
