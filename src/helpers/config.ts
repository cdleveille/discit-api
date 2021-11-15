import "dotenv/config";
import os from "os";
import path from "path";

import { Env, Host, DISC_FETCH_URL } from "../types/constants";

const Config = {
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	IS_PROD: <boolean>(process.env.NODE_ENV == Env.prod ? true : false),
	PORT: <number>parseInt(process.env.PORT as string) || 3000,
	HOST: <Host>(process.env.NODE_ENV == Env.prod ? process.env.HOST : Host.ip),
	CORES: <number>os.cpus().length,
	DISC_FETCH_URL: <string>DISC_FETCH_URL,
	FETCH_DISCS: <boolean>(process.env.FETCH_DISCS == "true")
};

export const Db = {
	DB_URL: process.env.DATABASE_URL,
	DB_TYPE: process.env.DB_TYPE,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: parseInt(process.env.DB_PORT as string),
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	DB_SYNC: process.env.NODE_ENV == Env.prod ? false : true,
	DB_LOGGING: process.env.NODE_ENV == Env.prod ? false : true
};

export default Config;