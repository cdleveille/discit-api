import path from "path";
import { cwd } from "process";
import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";

import Config, { Db } from "../helpers/config";
import log from "./log";

export class Database {

	private static readonly BaseOrm = {
		name: "default",
		type: Db.DB_TYPE,
		synchronize: Db.DB_SYNC,
		logging: Db.DB_LOGGING,
		autoReconnect: true,
		reconnectTries: 5,
		reconnectInterval: 2000,
		entities: [path.join(cwd(), "build/models/**/*.js")]
	};

	private static readonly Orm = {
		...Database.BaseOrm,
		ssl: true,
		extra: { ssl: { rejectUnauthorized: false } },
		url: Db.DB_URL
	} as ConnectionOptions;

	private static readonly OrmLocal = {
		...Database.BaseOrm,
		host: Db.DB_HOST,
		port: Db.DB_PORT,
		username: Db.DB_USERNAME,
		password: Db.DB_PASSWORD,
		database: Db.DB_NAME,
		ssl: false
	} as ConnectionOptions;

	public static async Connect(): Promise<void> {

		let connection: Connection | undefined;
		try {
			connection = getConnection();
		} catch (e) {
			log.error(`no existing connection found: ${e}`, "Database");
		}

		try {
			if (connection) {
				if (!connection.isConnected)
					await connection.connect();
			} else
				await createConnection(Config.IS_PROD ? Database.Orm : Database.OrmLocal);
			log.info(" successfully connected to database", "Database");
		} catch (e) {
			throw new Error(`error connecting to database: ${e}`);
		}
	}

	public static async Close(): Promise<void> {
		try {
			const conn = getConnection();
			await conn.close();
		} catch (e) {
			throw new Error(e);
		}
	}
}
