import { Elysia } from "elysia";

import { useCors, useErrorHandler, useHelmet, useLogger, useSwagger } from "@middleware";

export const initMiddleware = (app: Elysia) => {
	useErrorHandler(app);
	useLogger(app);
	useCors(app);
	useHelmet(app);
	useSwagger(app);
};

export * from "./cors";
export * from "./errorHandler";
export * from "./helmet";
export * from "./logger";
export * from "./swagger";
