import compression from "compression";
import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";

import router from "../controllers/index";
import { refreshDiscs } from "../db/refresh";
import Config from "../helpers/config";
import { Routes } from "../types/constants";
import Cron from "./cron";
import { connectToDatabase } from "./db";
import log from "./log";

export const startServer = async () => {
	await connectToDatabase();

	const app = express();

	const logStream = fs.createWriteStream("combined.log", { flags: "a" });
	app.use(morgan("combined", { stream: logStream }));
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
			methods: ["GET"]
		})
	);
	app.use(Routes.root, router);
	app.set("json spaces", 2);
	app.disabled("x-powered-by");

	app.listen(Config.PORT);
	log.info(`Server started - listening on http://${Config.HOST}:${Config.PORT}`);

	const cron = new Cron();
	cron.refreshDiscsNightly.start();

	if (Config.REFRESH_DISCS_START) {
		log.info("REFRESH_DISCS_START is set to true. Starting disc refresh process...");
		await refreshDiscs();
	}
};
