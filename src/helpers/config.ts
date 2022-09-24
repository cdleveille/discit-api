import "dotenv/config";
import os from "os";
import path from "path";

import { Env, Host, DISC_FETCH_URL, PROD_URL } from "../types/constants";

const Config = {
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
	IS_PROD: <boolean>(process.env.NODE_ENV === Env.prod),
	PORT: <number>(parseInt(process.env.PORT) || 3001),
	HOST: <string>(process.env.NODE_ENV === Env.prod ? process.env.HOST || PROD_URL : Host.local || Host.ip),
	CORES: <number>os.cpus().length,
	DISC_FETCH_URL: <string>DISC_FETCH_URL,
	FETCH_DISCS_START: <boolean>(process.env.FETCH_DISCS_START === "true"),
	FETCH_DISCS_CRON: <boolean>(process.env.FETCH_DISCS_CRON === "true"),
	INSERT_ONLY: <boolean>(process.env.INSERT_ONLY === "true"),
	MONGO_URI: <string>process.env.MONGO_URI || "mongodb://localhost:27047/discit"
};

export default Config;
