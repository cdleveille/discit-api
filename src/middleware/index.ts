import { Elysia } from "elysia";

import { useCors, useHelmet, useSwagger } from "@middleware";

export const initMiddleware = (app: Elysia) => {
	useCors(app);
	useHelmet(app);
	useSwagger(app);
};

export * from "./cors";
export * from "./helmet";
export * from "./swagger";
