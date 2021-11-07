import * as fs from "fs";

import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscRaw } from "../types/abstract";

export const populateDB = async (manager: Manager): Promise<void> => {
	const hasAny = await DiscRepo.FindAnyOne(manager);
	if (hasAny) return;

	fs.readFile("./src/db/discs.json", "utf8", (err, jsonString) => {
		try {
			if (err) {
				log.error("File read failed: ", err);
				return;
			}

			const discs = JSON.parse(jsonString);
			parseDiscs(manager, discs);
		} catch (error) {
			log.error(error);
		}
	});
};

const parseDiscs = async (manager: Manager, discs: IDiscRaw[]): Promise<void> => {
	console.log(discs);

	const disc: IDiscRaw = discs[0];

	const newDisc: IDisc = {
		name: disc.title,
		brand: disc.brand,
		category: disc.category,
		speed: parseFloat(disc.speed),
		glide: parseFloat(disc.glide),
		turn: parseFloat(disc.turn),
		fade: parseFloat(disc.fade)
	};

	await DiscRepo.InsertOne(manager, newDisc);
};
