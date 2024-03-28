import os from "node:os";

const Constants = {
	APP_NAME: "Bun Hono Template",
	SERVICE_NAME: "Backend 1",
	Production: "production",
	Development: "development",
	HOSTNAME: os.hostname(),
	PID: process.pid.toString(),
};

export default Constants;
