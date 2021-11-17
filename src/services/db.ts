import path from "path";
import { cwd } from "process";
import { Connection, IDatabaseDriver, MikroORM, ConnectionOptions, EntityManager } from "@mikro-orm/core";

import Config, { Db } from "../helpers/config";
import log from "./log";

export class Database {

	public static orm: MikroORM<IDatabaseDriver<Connection>>;

	/**
	 *
	 * An extension of the `orm.em` property from mikroorm
	 * ____
	 * @static
	 * @type {EntityManager<IDatabaseDriver<Connection>>}
	 * @memberof Database
	 */
	public static Manager: EntityManager<IDatabaseDriver<Connection>>;

	private static readonly ConnectorProd: ConnectionOptions = {
		debug: !Config.IS_PROD,
		logger: (msg: string) => log.query(msg),
		type: Db.DB_TYPE,
		clientUrl: Db.DB_URL,
		entities: [path.join(cwd(), "build/models/**/*.js")],
		entitiesTs: [path.join(cwd(), "src/models/**/*.ts")],
		cache: {
			enabled: true,
			pretty: !Config.IS_PROD,
			options: { cacheDir: cwd() + "/__db_cache__" }
		},
		driverOptions: {
			connection: { ssl: { rejectUnauthorized: false } }
		}
	} as ConnectionOptions;

	private static readonly ConnectorDev: ConnectionOptions = {
		debug: !Config.IS_PROD,
		logger: (msg: string) => log.query(msg),
		type: Db.DB_TYPE,
		host: Db.DB_HOST,
		port: Db.DB_PORT,
		user: Db.DB_USERNAME,
		password: Db.DB_PASSWORD,
		dbName: Db.DB_NAME,
		entities: [path.join(cwd(), "build/models/**/*.js")],
		entitiesTs: [path.join(cwd(), "src/models/**/*.ts")],
		cache: {
			enabled: true,
			pretty: !Config.IS_PROD,
			options: { cacheDir: cwd() + "/__db_cache__" }
		}
	} as ConnectionOptions;

	public static async Connect(): Promise<void> {
		try {
			Database.orm = await MikroORM.init(Config.IS_PROD ? Database.ConnectorProd : Database.ConnectorDev);
			Database.Manager = Database.orm.em.fork();
		} catch (e) {
			throw new Error(`Error connecting to database: ${e}`);
		}
	}

	public static async GetStatus(): Promise<boolean> {
		const connection = await Database.orm.isConnected();
		return connection;
	}

	public static async Close(): Promise<void> {
		return await Database.orm.close();
	}
}