import "dotenv/config";
import os from "os";
import path from "path";

import { Env, Host } from "../types/constants";

const Config = {
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	IS_PROD: <boolean>(process.env.NODE_ENV == "production" ? true : false),
	PORT: <number>parseInt(process.env.PORT as string) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	CORES: <number>os.cpus().length,
	DISC_DATA_URL: <string>process.env.DISC_DATA_URL || undefined
};

export const Db = {
	DB_URL: process.env.DATABASE_URL,
	DB_TYPE: process.env.DB_TYPE,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: parseInt(process.env.DB_PORT as string),
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	DB_SYNC: process.env.DB_SYNC == "true",
	DB_LOGGING: process.env.DB_LOGGING == "true"
};

export default Config;
