import axios from "axios";
import * as fs from "fs";
import { JSDOM } from "jsdom";

import Config from "../helpers/config";
import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscRaw } from "../types/abstract";

export const populateDB = async (manager: Manager): Promise<void> => {
	const hasAny = await DiscRepo.FindAny(manager);
	if (hasAny) {
		log.info("Database already has data - no discs need to be loaded!");
		return;
	}

	Config.DISC_DATA_URL ? await populateDBFromWeb(manager) : await populateDBFromJsonFile(manager);
};

export const populateDBFromWeb = async (manager: Manager): Promise<void> => {
	try {
		const { data } = await axios.get(Config.DISC_DATA_URL);
		if (!data) return populateDBFromJsonFile(manager);

		const dom = new JSDOM(data);

		let discs: IDisc[] = [];

		const discCollection = dom.window.document.getElementsByClassName("disc-item");
		for (const element of discCollection) {
			const disc: IDisc = {
				name: element.getAttribute("data-title"),
				brand: element.getAttribute("data-brand"),
				category: element.getAttribute("data-category"),
				speed: parseFloat(element.getAttribute("data-speed")),
				glide: parseFloat(element.getAttribute("data-glide")),
				turn: parseFloat(element.getAttribute("data-turn")),
				fade: parseFloat(element.getAttribute("data-fade"))
			};

			discs.push(disc);
		}

		const putterCollection = dom.window.document.getElementsByClassName("pc-entry");
		for (const element of putterCollection) {
			const disc: IDisc = {
				name: element.getAttribute("data-putter"),
				brand: element.getAttribute("data-brand"),
				category: "Putters",
				speed: parseFloat(element.getAttribute("data-speed")),
				glide: parseFloat(element.getAttribute("data-glide")),
				turn: parseFloat(element.getAttribute("data-turn")),
				fade: parseFloat(element.getAttribute("data-fade"))
			};

			discs.push(disc);
		}

		await insertDiscs(manager, discs, "web");
	} catch (error) {
		log.error(error);
	}
};

export const populateDBFromJsonFile = async (manager: Manager): Promise<void> => {
	fs.readFile("./src/db/discs.json", "utf8", async (err, jsonString) => {
		try {
			if (err) {
				log.error("File read failed: ", err);
				return;
			}

			const rawDiscs: IDiscRaw[] = JSON.parse(jsonString);
			const discs: IDisc[] = processRawDiscs(rawDiscs);

			await insertDiscs(manager, discs, "local");
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

const insertDiscs = async (manager: Manager, discs: IDisc[], source: string): Promise<void> => {
	const inserted = await DiscRepo.InsertMany(manager, discs);
	if (!inserted) throw "Error loading disc data into database!";
	log.info(`Successfully loaded data for ${discs.length} discs into database (source: ${source}).`);
};
