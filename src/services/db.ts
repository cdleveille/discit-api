import mongoose from "mongoose";

import { Config } from "@helpers";
import { log } from "@services";

export const connectToDatabase = async () => {
	log.info(`Connecting to database on ${Config.MONGO_URI}...`);
	await mongoose.connect(Config.MONGO_URI);
	log.info("Connected to database successfully.");
};
