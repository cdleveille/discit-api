import { EntityRepository, QueryOrder } from "@mikro-orm/core";

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
			const res = await manager.findAll({}, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindName(manager: RequestRepo, name: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ name: { $ilike: `%${name}%` } }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindBrand(manager: RequestRepo, brand: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ brand: { $ilike: `%${brand}%` } }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindCategory(manager: RequestRepo, category: string): Promise<Disc[]> {
		try {
			const res = await manager.find({ category: { $ilike: `%${category}%` } }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindSpeed(manager: RequestRepo, speed: number): Promise<Disc[]> {
		try {
			const res = await manager.find({ speed }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindGlide(manager: RequestRepo, glide: number): Promise<Disc[]> {
		try {
			const res = await manager.find({ glide }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindTurn(manager: RequestRepo, turn: number): Promise<Disc[]> {
		try {
			const res = await manager.find({ turn }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async FindFade(manager: RequestRepo, fade: number): Promise<Disc[]> {
		try {
			const res = await manager.find({ fade }, { cache: 3000, orderBy: { speed: QueryOrder.DESC, name: QueryOrder.ASC } });
			return res;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async InsertOne(manager: RequestRepo, disc: IDisc): Promise<Disc> {
		try {
			const newDisc = new Disc({
				name: disc.name,
				brand: disc.brand,
				category: disc.category,
				speed: disc.speed,
				glide: disc.glide,
				turn: disc.turn,
				fade: disc.fade
			});

			await manager.persistAndFlush(newDisc);
			return newDisc;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async InsertMany(manager: RequestRepo, discs: IDisc[]): Promise<boolean> {
		try {
			for (const disc of discs) {
				const newDisc = new Disc({
					name: disc.name,
					brand: disc.brand,
					category: disc.category,
					speed: disc.speed,
					glide: disc.glide,
					turn: disc.turn,
					fade: disc.fade
				});

				manager.persist(newDisc);
			}

			await manager.flush();
			return true;
		} catch (error) {
			throw Error(error);
		}
	}
}
