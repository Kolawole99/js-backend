import os from "node:os";

const Constants = {
	APP_NAME: "App Name Here",
	SERVICE_NAME: "Service Name Here",
	Production: "production",
	Development: "development",
	HOSTNAME: os.hostname(),
	PID: process.pid.toString(),
};

export default Constants;
