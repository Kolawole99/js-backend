import { Hono } from "hono";

const bookRoutes = new Hono();

bookRoutes.get("/", (c) => c.text("List Books")); // GET /book

bookRoutes.get("/:id", (c) => {
	// GET /book/:id
	const id = c.req.param("id");
	return c.text(`Get Book: ${id}`);
});

bookRoutes.post("/", (c) => c.text("Create Book")); // POST /book

export default bookRoutes;
