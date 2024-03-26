import OpenTelemetry from "./config/otel.js";

/**
 * Setup and Read Application Secrets By Environments
 * 
 * This will enable us to read application secrtes by environments
 * This also caches the secrets in memory
*/


/**
 * Setup OpenTelemetry
 * 
 * This will enable us to ship logs and traces to collectors
 * for external analysis
*/
OpenTelemetry.start();

// Gracefully shut down the SDK on process exit
["SIGINT", "SIGTERM"].forEach(signal => {
    const { log } = console;

    process.on(signal, () => {
        OpenTelemetry.shutdown()
            .then(() => log("Tracing terminated"))
            .catch((error: unknown) => log("Error terminating tracing", error))
            .finally(() => process.exit(0));
    });
});

/**
 * Setup Datastores Connection
 * 
 * This will enable us to keep a connection pool to the databstores we use
 * for faster API calls
*/
import Mongo from "./config/mongo.js";
// import Postgres from "./config/postgres.js";

await Promise.all([
  Mongo.connect(),
  // Postgres.connect()
]); 


import App from './app/app.js'

Bun.serve({
  fetch: App.fetch,
  port: process.env.PORT || 3000
})
