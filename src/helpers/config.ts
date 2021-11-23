import "dotenv/config";
import os from "os";
import path from "path";

import { Env, Host, DISC_FETCH_URL } from "../types/constants";

const Config = {
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	IS_PROD: <boolean>(process.env.NODE_ENV === Env.prod),
	PORT: <number>(parseInt(process.env.PORT) || 5000),
	HOST: <string>(process.env.NODE_ENV === Env.prod ? process.env.HOST : Host.local || Host.ip),
	CORES: <number>os.cpus().length,
	DISC_FETCH_URL: <string>DISC_FETCH_URL,
	FETCH_DISCS_START: <boolean>(process.env.FETCH_DISCS_START === "true"),
	FETCH_DISCS_CRON: <boolean>(process.env.FETCH_DISCS_CRON === "true"),
	INSERT_ONLY: <boolean>(process.env.INSERT_ONLY === "true")
};

export const Db = {
	DB_URL: <string>process.env.DATABASE_URL,
	DB_TYPE: <string>process.env.DB_TYPE,
	DB_HOST: <string>process.env.DB_HOST,
	DB_PORT: <number>parseInt(process.env.DB_PORT),
	DB_USERNAME: <string>process.env.DB_USERNAME,
	DB_PASSWORD: <string>process.env.DB_PASSWORD,
	DB_NAME: <string>process.env.DB_NAME,
	DB_SYNC: <boolean>(process.env.NODE_ENV !== Env.prod),
	DB_LOGGING: <boolean>(process.env.NODE_ENV !== Env.prod)
};

export default Config;