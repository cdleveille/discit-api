import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

export const useHelmet = (app: Elysia) =>
	app.use(
		helmet({
			contentSecurityPolicy: {
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
					styleSrcAttr: ["none"],
					styleSrcElem: ["'self'", "https:", "'unsafe-inline'"],
					upgradeInsecureRequests: [],
					workerSrc: ["'self'", "blob:"]
				}
			}
		})
	);
