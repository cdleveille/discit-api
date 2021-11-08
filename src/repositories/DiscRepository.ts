import { EntityRepository } from "@mikro-orm/core";

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
			const res = await manager.findAll({}, { cache: 3000 });
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

				await manager.persist(newDisc);
			}

			await manager.flush();
			return true;
		} catch (error) {
			throw Error(error);
		}
	}
}
