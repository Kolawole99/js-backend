import { Hono } from "hono";
import { logger } from "hono/logger";

import { BuildSuccessResponse } from "../utils/http.js";
import adminRoutes from "./admin/index.js";
import customerRoutes from "./customer/index.js";

const app = new Hono({ strict: true });

app.use(logger());

app.get("/", (c) => {
	return c.json(BuildSuccessResponse({ message: "App Running", payload: {} }));
});
app.route("/admin", adminRoutes);
app.route("/customer", customerRoutes);

export default app;
