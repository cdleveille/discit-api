import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

export * from "./errorHandler";
export * from "./notFound";

export const initMiddleware = (app: Express) => {
	app.use(express.json({ limit: "10mb" }));

	app.use(compression());

	app.use(cors());

	app.use(
		helmet.contentSecurityPolicy({
			directives: {
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
				scriptSrcElem: ["'self'"],
				styleSrc: ["'self'", "https:", "'unsafe-inline'"],
				styleSrcAttr: ["'none'"],
				styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
				upgradeInsecureRequests: [],
				workerSrc: ["'self'", "blob:"]
			}
		})
	);

	app.set("json spaces", 2);

	app.disable("x-powered-by");
};
