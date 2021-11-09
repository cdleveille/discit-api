import cluster from "cluster";

import { maintainDiscs } from "./db/populate";
import Config from "./helpers/config";
import Cron from "./services/cron";
import { Database } from "./services/db";
import log from "./services/log";
import app from "./services/server";
import { Disc } from "./models/Disc";

const start = async () => {
	try {
		await Database.Connect();

		app.listen(Config.PORT);
		log.info(`listening on http://${Config.HOST}:${Config.PORT}`);

		const manager = Database.Manager.fork().getRepository(Disc);

		const cron = new Cron(manager);

		cron.autoDiscMaintenance.start();

		await maintainDiscs(manager);
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};

if (cluster.isPrimary && Config.IS_PROD) {
	for (let i = 0; i < Config.CORES; i++) {
		cluster.fork();
	}
}
else start();
