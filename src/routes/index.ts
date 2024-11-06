import type { OpenAPIHono } from "@hono/zod-openapi";
import { initBagRoutes, initDiscRoutes } from "@routes";

export * from "./bag";
export * from "./disc";

export const initRoutes = (app: OpenAPIHono) => {
	initBagRoutes(app);
	initDiscRoutes(app);

	app.get("/", c => c.redirect("/reference"));
	app.get("/health", c => c.text("OK"));
};
