import { Elysia } from "elysia";

import { initBagRoutes, initDiscRoutes } from "@controllers";

export const initRoutes = (app: Elysia) => {
	app.get("/", ({ set }) => {
		set.redirect = "/docs";
	});
	initDiscRoutes(app);
	initBagRoutes(app);
};

export * from "./bag";
export * from "./disc";
