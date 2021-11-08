import * as fs from "fs";

import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscRaw } from "../types/abstract";

export const populateDB = async (manager: Manager): Promise<void> => {
	const hasAny = await DiscRepo.FindAny(manager);
	if (hasAny) {
		log.info("No discs loaded! Database already has data.");
		return;
	}

	fs.readFile("./src/db/discs.json", "utf8", async (err, jsonString) => {
		try {
			if (err) {
				log.error("File read failed: ", err);
				return;
			}

			const rawDiscs: IDiscRaw[] = JSON.parse(jsonString);
			const discs: IDisc[] = processRawDiscs(rawDiscs);
			await insertDiscs(manager, discs);
		} catch (error) {
			log.error(error);
		}
	});
};

const processRawDiscs = (rawDiscs: IDiscRaw[]): IDisc[] => {
	let discs: IDisc[] = [];

	for (const rawDisc of rawDiscs) {
		const disc: IDisc = {
			name: rawDisc.title,
			brand: rawDisc.brand,
			category: rawDisc.category,
			speed: parseFloat(rawDisc.speed),
			glide: parseFloat(rawDisc.glide),
			turn: parseFloat(rawDisc.turn),
			fade: parseFloat(rawDisc.fade)
		};

		discs.push(disc);
	}

	return discs;
};

const insertDiscs = async (manager: Manager, discs: IDisc[]): Promise<void> => {
	const inserted = await DiscRepo.InsertMany(manager, discs);
	if (!inserted) throw "Error loading disc data into database!";
	log.info(`Successfully loaded data for ${discs.length} discs into database.`);
};
