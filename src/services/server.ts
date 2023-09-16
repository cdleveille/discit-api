import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import router from "@controllers";
import { Config } from "@helpers";
import { errorHandler } from "@middleware";
import { Cron, log, refreshDiscs } from "@services";
import { Routes } from "@types";

export const startServer = async () => {
	const app = express();
	app.use(express.json());
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				"default-src": ["'self'"],
				"object-src": ["'none'"],
				"script-src": ["'self'", "'unsafe-inline'", "code.jquery.com", "cdnjs.cloudflare.com"],
				"style-src": ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
				"font-src": ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
				"img-src": ["'self' blob: data:"]
			}
		})
	);
	app.use(compression());
	app.use(
		cors({
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE"]
		})
	);
	app.use(Routes.root, router);
	app.set("json spaces", 2);
	app.disable("x-powered-by");

	app.listen(Config.PORT);
	log.info(`Server started in ${Config.IS_PROD ? "production" : "development"} mode on port ${Config.PORT}.`);

	app.use(errorHandler);

	const cron = new Cron();
	cron.refreshDiscsNightly.start();

	if (Config.REFRESH_DISCS_START) {
		log.info("REFRESH_DISCS_START is set to true. Starting disc refresh process...");
		await refreshDiscs();
	}
};
