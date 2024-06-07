import { connectToDatabase, log, startServer } from "@services";

try {
	await connectToDatabase();
	startServer();
} catch (error) {
	log.error(error);
}
