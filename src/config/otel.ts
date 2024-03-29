import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import * as OpenTelemetry from "@opentelemetry/sdk-node";

import { Resource } from "@opentelemetry/resources";
import {
	SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
	SEMRESATTRS_HOST_NAME,
	SEMRESATTRS_PROCESS_PID,
	SEMRESATTRS_SERVICE_NAME,
} from "@opentelemetry/semantic-conventions";

import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";

import Constants from "./constants.js";
import Environment from "./env.js";

const resource = new Resource({
	[SEMRESATTRS_PROCESS_PID]: Constants.PID,
	[SEMRESATTRS_HOST_NAME]: Constants.HOSTNAME,
	[SEMRESATTRS_SERVICE_NAME]: Constants.SERVICE_NAME,
	[SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: Environment.APP_ENV,
});

const traceExporter = new OTLPTraceExporter({
	url: `http://${Environment.OTEL_HOST}:${Environment.METRICS_AND_TRACES_PORT}`,
	headers: {},
});

const metricExporter = new OTLPMetricExporter({
	url: `http://${Environment.OTEL_HOST}:${Environment.METRICS_AND_TRACES_PORT}`,
	headers: {},
});

const sdk = new OpenTelemetry.NodeSDK({
	resource,
	traceExporter,
	metricReader: new PeriodicExportingMetricReader({
		exporter: metricExporter,
	}),
	instrumentations: [getNodeAutoInstrumentations()],
});

export default sdk;
