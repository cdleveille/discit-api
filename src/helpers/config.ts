import { IConfig } from "@types";

export const Config = {
	IS_PROD: Bun.env.NODE_ENV === "production",
	PORT: parseInt(Bun.env.PORT || "5000"),
	REFRESH_DISCS_START: Bun.env.REFRESH_DISCS_START?.toLowerCase() === "true",
	REFRESH_DISCS_CRON: Bun.env.REFRESH_DISCS_CRON?.toLowerCase() === "true",
	MONGO_URI: Bun.env.MONGO_URI || "mongodb://localhost:27017/discit",
	JWT_SECRET: Bun.env.JWT_SECRET || undefined,
	JWT_EXPIRATION: "7d",
	API_KEY: Bun.env.API_KEY || undefined
} as IConfig;
