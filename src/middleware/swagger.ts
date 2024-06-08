import { Elysia } from "elysia";

import { swagger } from "@elysiajs/swagger";
import { Config } from "@helpers";

import { name as title, version } from "../../package.json";

export const useSwagger = (app: Elysia) =>
	app.use(
		swagger({
			path: "/docs",
			documentation: {
				info: { title, version, description: "RESTful API for disc golf discs." },
				servers: [
					...(!Config.IS_PROD && [{ url: `http://localhost:${Config.PORT}`, description: "development" }]),
					{ url: "https://discit-api.fly.dev", description: "production" }
				]
			},
			exclude: ["/", /^\/(docs|bag)/i]
		})
	);
