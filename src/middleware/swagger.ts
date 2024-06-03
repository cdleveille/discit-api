import { Elysia } from "elysia";

import { swagger } from "@elysiajs/swagger";

import { name as title, version } from "../../package.json";

export const useSwagger = (app: Elysia) =>
	app.use(
		swagger({
			path: "/docs",
			documentation: {
				info: { title, version, description: "RESTful API for disc golf discs." },
				servers: [
					{ url: "https://discit-api.fly.dev", description: "production" },
					{ url: "http://localhost:5000", description: "development" }
				]
			},
			exclude: [
				"/",
				"/docs",
				"/docs/json",
				"/bag",
				"/bag/{id}",
				"/bag/create",
				"/bag/add-disc",
				"/bag/remove-disc",
				"/bag/delete/{id}"
			]
		})
	);
