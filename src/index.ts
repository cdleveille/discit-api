import log from "./services/log";
import { startServer } from "./services/server";

(async () => {
	try {
		await startServer();
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
})();
