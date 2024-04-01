import { Hono } from "hono";

const adminRoutes = new Hono({ strict: true }).basePath("/admin");

export default adminRoutes;
