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
OpenTelemetry.start();

// Gracefully shut down the SDK on process exit
const { log } = console;
const shutdownEvents = ["SIGINT", "SIGTERM"];
for (const signal of shutdownEvents) {
	process.on(signal, () => {
		OpenTelemetry.shutdown()
			.then(() => log("Tracing terminated"))
			.catch((error: unknown) => log("Error terminating tracing", error))
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
import Constants from "./config/constants.js";
import Environment from "./config/env.js";
import Logger from "./utils/logger.js";

Bun.serve({
	fetch: App.fetch,
	port: Environment.PORT,
});

if (Environment.NODE_ENV === Constants.Development) {
	Logger.info(`Server running on port http://localhost:${Environment.PORT}`);
} else {
	Logger.info(`Production deployment is running on port ${Environment.PORT}`);
}
