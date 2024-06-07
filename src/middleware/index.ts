import { Elysia } from "elysia";

import { useCors, useErrorHandler, useHelmet, useSwagger } from "@middleware";

export const initMiddleware = (app: Elysia) => {
	useCors(app);
	useErrorHandler(app);
	useHelmet(app);
	useSwagger(app);
};

export * from "./cors";
export * from "./errorHandler";
export * from "./helmet";
export * from "./swagger";
