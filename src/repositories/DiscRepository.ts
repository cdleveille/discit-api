import { Disc } from "../models/Disc";
import { IDisc } from "../types/abstract";

export class DiscRepository {
	public static async FindAnyOne(): Promise<boolean> {
		try {
			const res = await Disc.findOne();
			return res ? true : false;
		} catch (error) {
			throw Error(error);
		}
	}

	public static async InsertOne(disc: IDisc): Promise<Disc> {
		try {
			const newDisc = new Disc();
			newDisc.name = disc.name;
			newDisc.brand = disc.brand;
			newDisc.category = disc.category;
			newDisc.speed = disc.speed;
			newDisc.glide = disc.glide;
			newDisc.turn = disc.turn;
			newDisc.fade = disc.fade;

			return await newDisc.save();
		} catch (error) {
			throw Error(error);
		}
	}

	public static async UpdateOne(disc: Disc): Promise<Disc> {
		try {
			return await disc.save();
		} catch (error) {
			throw Error(error);
		}
	}
}
