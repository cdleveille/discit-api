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

	private static readonly Connector: ConnectionOptions = {
		debug: !Config.IS_PROD,
		logger: (msg: unknown) => log.info(msg),
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
			Database.orm = await MikroORM.init(Database.Connector);
			Database.Manager = Database.orm.em.fork();
			log.info(`successfully connected to database: ${await Database.orm.isConnected()}`, "database");
		} catch (e) {
			throw new Error(`error connecting to database: ${e}`);
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