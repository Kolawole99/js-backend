import { pino } from "pino";

import Constants from "../config/constants.js";
import Environment from "../config/env.js";

const transport = pino.transport({
	targets: [
		{
			target: "pino-opentelemetry-transport",
			options: {
				resourceAttributes: {
					"service.name": Constants.SERVICE_NAME,
					"deployment.environment": Environment.APP_ENV,
				},
			},
		},
		{
			target: "pino/file",
			options: { destination: 1 }, // this writes to STDOUT
		},
	],
});

transport.on("error", (err: unknown) => {
	console.error("error caught", err);
});

export default pino(
	{
		level: Environment.NODE_ENV !== Constants.Production ? "debug" : "http",
	},
	transport,
);
