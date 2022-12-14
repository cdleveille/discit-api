import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";

import router from "../controllers/index";
import { fetchDiscs } from "../db/populate";
import Config from "../helpers/config";
import { Routes } from "../types/constants";
import Cron from "./cron";
import { connectToDatabase } from "./db";
import log from "./log";

export default class App {
	private static instance: Express;

	private static async setup() {
		App.instance = express();

		const logStream = fs.createWriteStream("combined.log", { flags: "a" });
		App.instance.use(morgan("combined", { stream: logStream }));

		App.instance.use(
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
		App.instance.use(compression());
		App.instance.use(
			cors({
				origin: "*",
				methods: ["GET"]
			})
		);
		App.instance.use(Routes.root, router);
		App.instance.set("json spaces", 2);
		App.instance.disabled("x-powered-by");
	}

	public static async start() {
		await connectToDatabase();
		await App.setup();

		App.instance.listen(Config.PORT);
		log.info(`Server started - listening on http://${Config.HOST}:${Config.PORT}`);

		const cron = new Cron();
		cron.autoDiscMaintenance.start();

		if (Config.FETCH_DISCS_START) await fetchDiscs();
	}
}
