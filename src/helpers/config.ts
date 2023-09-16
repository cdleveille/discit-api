import "dotenv/config";

import os from "os";

import { Env, Host, PROD_URL } from "../types/constants";

const Config = {
	IS_PROD: <boolean>(process.env.NODE_ENV === Env.prod),
	PORT: <number>(parseInt(process.env.PORT) || 5000),
	HOST: <string>(process.env.NODE_ENV === Env.prod ? process.env.HOST || PROD_URL : Host.local || Host.ip),
	CORES: <number>os.cpus().length,
	REFRESH_DISCS_START: <boolean>(process.env.REFRESH_DISCS_START?.toLowerCase() === "true"),
	REFRESH_DISCS_CRON: <boolean>(process.env.REFRESH_DISCS_CRON?.toLowerCase() === "true"),
	MONGO_URI: <string>process.env.MONGO_URI || "mongodb://localhost:27047/discit",
	JWT_SECRET: <string>process.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: <string | number>"7d"
};

export default Config;
