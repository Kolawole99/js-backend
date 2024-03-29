import { Hono } from "hono";

import bookRoutes from "./books/routes.js";

const customerRoutes = new Hono({ strict: true });

customerRoutes.route("/books", bookRoutes);

export default customerRoutes;
