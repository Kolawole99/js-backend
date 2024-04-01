import { Hono } from "hono";

import usersRoutes from "./users/routes.js";

const customerRoutes = new Hono({ strict: true }).basePath("/customer");

customerRoutes.route("/users", usersRoutes);

export default customerRoutes;
