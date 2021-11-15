import { Connection, EntityRepository } from "@mikro-orm/core";

import { createDisc, equalsOrLike } from "../helpers/util";
import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";

export type RequestRepo = EntityRepository<Disc>;

export class DiscRepository {
	private static readonly CacheSize = 3000;

	public static async FindAll(manager: RequestRepo): Promise<Disc[]> {
		try {
			const res = await manager.findAll({}, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByQuery(connection: Connection, query: any): Promise<Disc[]> {
		try {
			let sql = "select name, brand, category, speed, glide, turn, fade, stability, link, pic, name_slug, brand_slug, category_slug, stability_slug from disc";

			for (const key in query) {
				let searchKey = key.includes("amp;") ? key.replace("amp;", "") : key;
				sql += (sql.includes(" where ") ? " and " : " where ") + equalsOrLike(searchKey, query[key]);
			}

			const res = await connection.execute(sql);
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByID(manager: RequestRepo, id: number): Promise<Disc> {
		try {
			const res = await manager.findOne({ id }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByName(manager: RequestRepo, name: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ name_slug: { $ilike: `%${name}%` } }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByBrand(manager: RequestRepo, brand: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ brand_slug: { $ilike: `%${brand}%` } }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByCategory(manager: RequestRepo, category: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ category_slug: { $ilike: `%${category}%` } }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindBySpeed(manager: RequestRepo, speed: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ speed }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByGlide(manager: RequestRepo, glide: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ glide }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByTurn(manager: RequestRepo, turn: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ turn }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByFade(manager: RequestRepo, fade: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ fade }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByStability(manager: RequestRepo, stability: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ stability_slug: stability }, { cache: DiscRepository.CacheSize });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async InsertOne(manager: RequestRepo, disc: IDisc): Promise<Disc> {
		try {
			const newDisc = createDisc(disc);
			await manager.persistAndFlush(newDisc);
			return newDisc;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async InsertMany(manager: RequestRepo, discs: IDisc[]): Promise<boolean> {
		try {
			for (const disc of discs) {
				const newDisc = createDisc(disc);

				manager.persist(newDisc);
			}

			await manager.flush();
			return true;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async UpdateOne(manager: RequestRepo, disc: Disc): Promise<boolean> {
		try {
			await manager.persistAndFlush(disc);
			return true;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async UpdateMany(manager: RequestRepo, discs: Disc[]): Promise<boolean> {
		try {
			for (const disc of discs) {
				await manager.persistAndFlush(disc);
			}

			await manager.flush();
			return true;
		} catch (error) {
			throw Error(error);
		}
	}
}