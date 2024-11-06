import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

import type { OpenAPIHono } from "@hono/zod-openapi";
import { serveEmojiFavicon } from "@middleware";
import { apiReference } from "@scalar/hono-api-reference";

import { name, version } from "../../package.json";

export * from "./emojiFavicon";

const openApiInfo = {
	openapi: "3.1.0",
	info: { version, title: name }
};

export const initMiddleware = (app: OpenAPIHono) => {
	app.use(cors());

	app.use(
		secureHeaders({
			contentSecurityPolicy: {
				defaultSrc: ["'self'"],
				baseUri: ["'self'"],
				childSrc: ["'self'"],
				connectSrc: ["'self'"],
				fontSrc: ["'self'", "https:", "data:"],
				formAction: ["'self'"],
				frameAncestors: ["'self'"],
				frameSrc: ["'self'"],
				imgSrc: ["'self'", "data:"],
				manifestSrc: ["'self'"],
				mediaSrc: ["'self'"],
				objectSrc: ["'none'"],
				scriptSrc: ["'self'"],
				scriptSrcAttr: ["'none'"],
				scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net/npm/@scalar/api-reference"],
				styleSrc: ["'self'", "https:", "'unsafe-inline'"],
				styleSrcAttr: ["'self'", "https:", "'unsafe-inline'"],
				styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
				upgradeInsecureRequests: [],
				workerSrc: ["'self'", "blob:"]
			}
		})
	);

	app.use(serveEmojiFavicon("🥏"));

	app.doc31("/spec", openApiInfo);
	app.getOpenAPI31Document(openApiInfo);

	app.get(
		"/reference",
		apiReference({
			spec: { url: "/spec" }
		})
	);
};
