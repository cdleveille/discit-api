import { connectToDatabase, log, startServer } from "@services";

(async () => {
	try {
		await connectToDatabase();
		await startServer();
	} catch (error) {
		log.error(error);
	}
})();
