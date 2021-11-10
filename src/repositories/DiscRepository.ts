import { EntityRepository, QueryOrder } from "@mikro-orm/core";

import { createDisc } from "../helpers/util";
import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";

export type RequestRepo = EntityRepository<Disc>;

export class DiscRepository {
	public static async FindAny(manager: RequestRepo): Promise<boolean> {
		try {
			const res = await manager.find({}, { cache: 3000, limit: 1 });
			return res.length > 0 ? true : false;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindAll(manager: RequestRepo): Promise<Disc[]> {
		try {
			const res = await manager.findAll({}, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindID(manager: RequestRepo, id: number): Promise<Disc[]> {
		try {
			const res = await manager.find({ id }, { cache: 3000, limit: 1 });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindName(manager: RequestRepo, name: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ name: { $ilike: `%${name}%` } }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindBrand(manager: RequestRepo, brand: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ brand: { $ilike: `%${brand}%` } }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindCategory(manager: RequestRepo, category: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ category: { $ilike: `%${category}%` } }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindSpeed(manager: RequestRepo, speed: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ speed }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindGlide(manager: RequestRepo, glide: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ glide }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindTurn(manager: RequestRepo, turn: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ turn }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindFade(manager: RequestRepo, fade: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ fade }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindStability(manager: RequestRepo, stability: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ stability }, { cache: 3000, orderBy: { name: QueryOrder.ASC } });
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
