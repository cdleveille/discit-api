import compression from "compression";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";

import { fetchDiscs } from "../db/populate";
import Config from "../helpers/config";
import { Disc } from "../models/Disc";
import cleanURL from "../middleware/cleanUrl";
import Cron from "../services/cron";
import { Database } from "../services/db";
import log from "../services/log";
import router from "../controllers";

export default class App {
	private static instance: Express;

	private static async setup() {
		App.instance = express();

		const logStream = fs.createWriteStream("combined.log", { flags: "a" });
		App.instance.use(morgan("combined", { stream: logStream }));

		App.instance.use((req: Request, res: Response, next: NextFunction) => {
			res.locals.em = Database.Manager.fork();
			next();
		});

		App.instance.use(helmet());
		App.instance.use(compression());
		App.instance.use(cors());
		App.instance.use(cleanURL());
		App.instance.use("/", router);

		App.instance.use(express.static("./public"));
		App.instance.set("view engine", "ejs");
		App.instance.set("views", "./public/views");

		App.instance.set("json spaces", 2);
		App.instance.disabled("x-powered-by");
	}

	public static async start() {
		await Database.Connect();

		await App.setup();

		App.instance.listen(Config.PORT);
		log.info(`Listening on http://${Config.HOST}:${Config.PORT}`);

		const manager = Database.Manager.fork().getRepository(Disc);
		const cron = new Cron(manager);
		cron.autoDiscMaintenance.start();

		if (Config.FETCH_DISCS) await fetchDiscs(manager);
	}
}