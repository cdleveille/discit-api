import { Elysia } from "elysia";

import { useCors, useHelmet, useJwt, useSwagger } from "@middleware";

export const initMiddleware = (app: Elysia) => {
	useCors(app);
	useHelmet(app);
	useJwt(app);
	useSwagger(app);
};

export * from "./cors";
export * from "./helmet";
export * from "./jwt";
export * from "./swagger";
