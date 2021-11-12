import "dotenv/config";
import "reflect-metadata";
import { ConnectionConfig } from "@mikro-orm/core";

import Config, { Db } from "./src/helpers/config";

export default {
	debug: true,
	entities: ["./src/models/**/*.ts"],
	dbName: Db.DB_NAME,
	type: Db.DB_TYPE,
	host: Db.DB_HOST,
	port: Db.DB_PORT,
	user: Db.DB_USERNAME,
	password: Db.DB_PASSWORD,
	cache: {
		enabled: true,
		pretty: !Config.IS_PROD,
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