import { type Express } from "express";

import { registerBagEndpoints, registerDiscEndpoints } from "@endpoints";

export * from "./bag";
export * from "./disc";

export const initEndpoints = (app: Express) => {
	app.get("/", (_req, res) => res.redirect("/disc"));

	const { discRouter } = registerDiscEndpoints();
	app.use("/disc", discRouter);

	const { bagRouter } = registerBagEndpoints();
	app.use("/bag", bagRouter);
};
