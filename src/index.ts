import { connectToDatabase, log, startServer } from "@services";

try {
	await connectToDatabase();
	await startServer();
} catch (error) {
	log.error(error);
}
