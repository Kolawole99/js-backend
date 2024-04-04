import { Hono } from "hono";
import { logger } from "hono/logger";
import type { StatusCode } from "hono/utils/http-status";

import { BuildSuccessResponse, HTTPResponse } from "../utils/http.js";
import adminRoutes from "./admin/index.js";
import customerRoutes from "./customer/index.js";

const app = new Hono({ strict: true }).basePath("/v1");

app.use(logger());

app.get("/", (c) => {
	c.status(HTTPResponse.Success.OK.code as StatusCode);
	return c.json(BuildSuccessResponse({ message: "App Running", payload: {} }));
});
app.route("/", adminRoutes);
app.route("/", customerRoutes);

export default app;
