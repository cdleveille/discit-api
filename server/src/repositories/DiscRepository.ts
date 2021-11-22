import { EntityRepository, QueryOrder } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/knex";

import { cleanQueryField, cleanQueryValue, createDisc } from "../helpers/util";
import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";

export type RequestRepo = EntityRepository<Disc>;

export class DiscRepository {
	private static readonly CacheSize = 3000;

	public static async FindAll(manager: RequestRepo): Promise<Disc[]> {
		try {
			const res = await manager.find({}, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByQuery(em: EntityManager, query: any): Promise<Disc[]> {
		try {
			let cleanQuery: any = {};

			for (const key in query) {
				const cleanKey = cleanQueryField(key);
				const cleanValue = cleanQueryValue(cleanKey, query[key]);
				cleanQuery[cleanKey] = cleanValue;
			}

			const res = await em.createQueryBuilder(Disc).select("*").where(cleanQuery).orderBy({ name_slug: QueryOrder.ASC }).cache(DiscRepository.CacheSize).getResult();
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByName(manager: RequestRepo, name: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ name_slug: { $ilike: `%${name}%` } }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByBrand(manager: RequestRepo, brand: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ brand_slug: { $ilike: `%${brand}%` } }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByCategory(manager: RequestRepo, category: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ category_slug: { $ilike: `%${category}%` } }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindBySpeed(manager: RequestRepo, speed: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ speed }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByGlide(manager: RequestRepo, glide: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ glide }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByTurn(manager: RequestRepo, turn: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ turn }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByFade(manager: RequestRepo, fade: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ fade }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindByStability(manager: RequestRepo, stability: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ stability_slug: stability }, { cache: DiscRepository.CacheSize, orderBy: { name_slug: QueryOrder.ASC } });
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