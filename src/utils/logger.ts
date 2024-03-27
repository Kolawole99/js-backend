import { createLogger, format, transports } from "winston";
const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");

import Constants from "../config/constants.js";
import Environment from "../config/env.js";

const levels: { [key: string]: number } = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
	silly: 6,
};

let loggerTransports = [];
if (Environment.NODE_ENV === Constants.Production) {
	loggerTransports = [
		new LogstashTransport({
			port: Environment.LOGS_PORT,
			node_name: Constants.HOSTNAME,
			host: Environment.OTEL_HOST,
			codec: "json_lines",
			max_connect_retries: -1,
		}),
	];
} else {
	loggerTransports = [new transports.Console()];
}

const Logger = createLogger({
	level: Environment.NODE_ENV !== Constants.Production ? "debug" : "http",
	format: format.combine(
		format.timestamp(),
		format.printf(
			({
				span_id,
				trace_id,
				trace_flags,
				hostname,
				pid,
				timestamp,
				level,
				message,
				resource,
				env,
				...meta
			}) => {
				const humanTime = new Date(timestamp).toLocaleString();
				const data = Object.keys(meta).length > 0 ? { body: meta } : {};

				return JSON.stringify(
					{
						span_id,
						trace_id,
						trace_flags,
						pid,
						env,
						hostname,
						resource,
						level,
						levelNumber: levels[level],
						timestamp,
						humanTime,
						message,
						...data,
					},
					null,
					2,
				);
			},
		),
	),
	exitOnError: false,
	defaultMeta: {
		pid: Constants.PID,
		env: Environment.APP_ENV,
		hostname: Constants.HOSTNAME,
		resource: Constants.SERVICE_NAME,
	},
	transports: loggerTransports,
});

export default Logger;
