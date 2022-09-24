import mongoose from "mongoose";

import Config from "../helpers/config";
import log from "./log";

export const connectToDatabase = async () => {
	try {
		log.info(`Connecting to database on ${Config.MONGO_URI} ...`);
		await mongoose.connect(Config.MONGO_URI);
		log.info(`Connected to database: ${Config.MONGO_URI}`);
	} catch (error) {
		log.error(`Error connecting to database: ${error}`);
	}
};
