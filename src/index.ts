import Config from "./helpers/config";
import cluster from "cluster";

import log from "./services/log";
import app from "./services/server";

process.on("uncaughtException", (error) => {
	log.error(error);
});

(async () => {
	try {
		const cpus = Config.IS_PROD ? Config.CORES : 1;
		if (cluster.isPrimary) {
			for (let i = 0; i < cpus; i++) {
				cluster.fork();
			}
		}
		else await app.start();
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
})();