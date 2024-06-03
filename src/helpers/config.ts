import { IConfig } from "@types";

export const Config = {
	IS_PROD: Bun.env.NODE_ENV === "production",
	PORT: parseInt(Bun.env.PORT || "5000"),
	MONGO_URI: Bun.env.MONGO_URI || "mongodb://localhost:27017/discit",
	API_KEY: Bun.env.API_KEY || undefined
} as IConfig;
