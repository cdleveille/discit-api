import { Elysia } from "elysia";

import { initCors, initJwt } from "@middleware";

export const initMiddleware = (app: Elysia) => {
	initCors(app);
	initJwt(app);
};

export * from "./cors";
export * from "./jwt";
