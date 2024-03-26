import os from "os";

const {
    APP_ENV,
    NODE_ENV,

    MONGO_TIMEOUT,
    LOCAL_MONGO_URL,

    OTEL_HOST,
    LOGS_PORT,
    METRICS_AND_TRACES_PORT,
} = process.env;

class Environment {
    public static APP_ENV: string = APP_ENV!;

    public static HOSTNAME = os.hostname();

    public static PID = process.pid.toString();

    public static NODE_ENV: string = NODE_ENV!;

    public static LOCAL_MONGO_URL: string = LOCAL_MONGO_URL!;

    public static MONGO_TIMEOUT: number = parseInt(MONGO_TIMEOUT!, 10);

    public static OTEL_HOST: string = OTEL_HOST!;

    public static LOGS_PORT: number = parseInt(LOGS_PORT!, 10);

    public static METRICS_AND_TRACES_PORT: string = METRICS_AND_TRACES_PORT!;
}

export default Environment;
