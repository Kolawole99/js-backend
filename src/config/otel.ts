import * as OpenTelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_PROCESS_PID, SEMRESATTRS_HOST_NAME, SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_DEPLOYMENT_ENVIRONMENT } from "@opentelemetry/semantic-conventions";

import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from "@opentelemetry/sdk-metrics";

import Environment from "./env.js";
import Constants from "./constants.js";

let sdk: OpenTelemetry.NodeSDK;

let traceExporter: OpenTelemetry.node.SpanExporter | undefined;
let metricExporter: OpenTelemetry.metrics.PushMetricExporter;
const resource = new Resource({
    [SEMRESATTRS_PROCESS_PID]: Environment.PID,
    [SEMRESATTRS_HOST_NAME]: Environment.HOSTNAME,
    [SEMRESATTRS_SERVICE_NAME]: Constants.SERVICE_NAME,
    [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: Environment.APP_ENV
});

if (Environment.NODE_ENV === Constants.Production) {
    traceExporter = new OTLPTraceExporter({
        url: `http://${Environment.OTEL_HOST}:${Environment.METRICS_AND_TRACES_PORT}/v1/traces`,
        headers: {}
    });

    metricExporter = new OTLPMetricExporter({
        url: `http://${Environment.OTEL_HOST}:${Environment.METRICS_AND_TRACES_PORT}/v1/metrics`,
        headers: {}
    });
 
    sdk = new OpenTelemetry.NodeSDK({
        resource,
        traceExporter,
        metricReader: new PeriodicExportingMetricReader({
            exporter: metricExporter
        }),
        instrumentations: [getNodeAutoInstrumentations()]
    });
} else {
    traceExporter = new ConsoleSpanExporter();
    metricExporter = new ConsoleMetricExporter();

    sdk = new OpenTelemetry.NodeSDK({
        resource,
        traceExporter,
        metricReader: new PeriodicExportingMetricReader({
            exporter: metricExporter
        }),
        instrumentations: [getNodeAutoInstrumentations()]
    });
}

export default sdk;
