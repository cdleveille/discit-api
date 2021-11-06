import cluster from "cluster";

import config from "./helpers/config";
import { Database } from "./services/db";
import log from "./services/log";
import app from "./services/server";

import { populateDB } from "./db/populate";

const start = async () => {
	try {
		await Database.Connect();
		app.listen(config.PORT);
		log.info(`listening on http://${config.HOST}:${config.PORT}`);
		populateDB();
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
};

if (cluster.isPrimary && config.IS_PROD) {
	for (let i = 0; i < config.CORES; i++) {
		cluster.fork();
	}
}
else start();
