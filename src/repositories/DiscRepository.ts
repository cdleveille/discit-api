import { EntityRepository } from "@mikro-orm/core";

import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";

export type RequestRepo = EntityRepository<Disc>;

export class DiscRepository {

	public static async FindAnyOne(manager: RequestRepo): Promise<boolean> {
		const res = await manager.find({}, { cache: 3000, limit: 1 });
		return res.length > 0 ? true : false;
	}

	public static async GetAll(manager: RequestRepo): Promise<Disc[]> {
		const res = await manager.findAll({}, { cache: 3000 });
		return res;
	}

	public static async InsertOne(manager: RequestRepo, disc: IDisc): Promise<Disc> {
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
	}
}
