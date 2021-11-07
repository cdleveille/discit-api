import "dotenv/config";
import "reflect-metadata";

import { ConnectionConfig } from "@mikro-orm/core";

const {
	NODE_ENV,
	DB_TYPE,
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME } = process.env;

const IS_PROD = NODE_ENV === "true" ? true : false;

export default {
	debug: true,
	entities: ["./src/models/**/*.ts"],
	dbName: DB_NAME,
	type: DB_TYPE,
	host: DB_HOST,
	port: parseInt(DB_PORT as string),
	user: DB_USERNAME,
	password: DB_PASSWORD,
	cache: {
		enabled: true,
		pretty: !IS_PROD,
		options: { cacheDir: process.cwd() + "/__db_cache__" }
	},
	migrations: {
		tableName: "mikro_orm_migrations",
		path: "./src/migrations",
		pattern: /^[\w-]+\d+\.ts$/,
		transactional: true,
		disableForeignKeys: true,
		allOrNothing: true,
		dropTables: true,
		safe: false,
		emit: "ts"
	}
} as ConnectionConfig;
