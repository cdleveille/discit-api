import { Elysia } from "elysia";

import { initBagRoutes, initDiscRoutes, initUserRoutes } from "@controllers";

export const initRoutes = (app: Elysia) => {
	app.get("/", ({ set }) => {
		set.redirect = "/docs";
	});
	initDiscRoutes(app);
	initUserRoutes(app);
	initBagRoutes(app);
};

export * from "./bag";
export * from "./disc";
export * from "./user";
