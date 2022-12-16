import { connectToDatabase } from "./services/db";
import log from "./services/log";
import { startServer } from "./services/server";

(async () => {
	try {
		await connectToDatabase();
		await startServer();
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
})();
