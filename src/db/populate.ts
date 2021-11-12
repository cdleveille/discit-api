import axios from "axios";
import * as fs from "fs";
import { JSDOM } from "jsdom";

import Config from "../helpers/config";
import { discHasNameAndBrandMatch, discsAreEqual, updateDiscFromOtherDisc } from "../helpers/util";
import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscUpsert } from "../types/abstract";
import { categoryMap, stabilityValues } from "../types/constants";

export const fetchDiscs = async (manager: Manager) => {
	try {
		log.info("***START*** - disc maintenance process.");

		log.info("Getting all existing discs from database...");
		const existingDiscs: IDisc[] = await DiscRepo.FindAll(manager);

		if (Config.DISC_FETCH_URL) {
			await fetchDiscsFromWebPage(manager, existingDiscs);
		} else {
			log.error("DISC_FETCH_URL is not defined! Loading from discs.json file instead.");
			await fetchDiscsFromJson(manager, existingDiscs);
		}

		log.info("***END*** - disc maintenance process completed successfully.");
	} catch (error) {
		log.error(error, `Error fetching disc data from '${Config.DISC_FETCH_URL}'! Loading from discs.json file instead.`);
	}
};

const fetchDiscsFromWebPage = async (manager: Manager, existingDiscs: IDisc[]) => {
	try {
		log.info(`Fetching disc data from ${Config.DISC_FETCH_URL}...`);
		const { data } = await axios.get(Config.DISC_FETCH_URL);
		if (!data) throw `${Config.DISC_FETCH_URL} returned no data!`;

		const dom = new JSDOM(data);
		const discCollection = dom.window.document.getElementsByClassName("disc-item");
		const putterCollection = dom.window.document.getElementsByClassName("pc-entry");

		const discs: IDiscUpsert = getDiscsFromWebPage(discCollection, putterCollection, existingDiscs);

		await upsertDiscs(manager, discs.discsToInsert, discs.discsToUpdate, existingDiscs, discCollection.length + putterCollection.length, Config.DISC_FETCH_URL);
	} catch (error) {
		log.error(error, `Error fetching disc data from '${Config.DISC_FETCH_URL}'! Loading from discs.json file instead.`);
		return await fetchDiscsFromJson(manager, existingDiscs);
	}
};

const getDiscsFromWebPage = (discCollection: any, putterCollection: any, existingDiscs: IDisc[]): IDiscUpsert => {
	let discsToInsert: IDisc[] = [];
	let discsToUpdate: IDisc[] = [];

	// distance drivers, hybrid drivers, control drivers, midrange
	for (const element of discCollection) {
		const name = element.getAttribute("data-title");
		const brand = element.getAttribute("data-brand");
		const category = parseCategory(element.getAttribute("data-category"));
		const speed = element.getAttribute("data-speed");
		const glide = element.getAttribute("data-glide");
		const turn = element.getAttribute("data-turn");
		const fade = element.getAttribute("data-fade");
		const stability = parseStability(element, turn, fade);
		const link = element.getAttribute("data-link");
		const pic = element.getAttribute("data-pic");

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic };

		let match = discHasNameAndBrandMatch(disc, existingDiscs);
		if (match) {
			if (!discsAreEqual(disc, match)) {
				updateDiscFromOtherDisc(match, disc);
				discsToUpdate.push(match);
			}
		} else {
			discsToInsert.push(disc);
		}
	}

	// putters
	for (const element of putterCollection) {
		const name = element.getAttribute("data-putter");
		const brand = element.getAttribute("data-brand");
		const category = "Putter";
		const speed = element.getAttribute("data-speed");
		const glide = element.getAttribute("data-glide");
		const turn = element.getAttribute("data-turn");
		const fade = element.getAttribute("data-fade");
		const stability = parseStability(element, turn, fade);
		const link = element.getAttribute("data-link");
		const pic = element.getAttribute("data-image");

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic };

		let match = discHasNameAndBrandMatch(disc, existingDiscs);
		if (match) {
			if (!discsAreEqual(disc, match)) {
				updateDiscFromOtherDisc(match, disc);
				discsToUpdate.push(match);
			}
		} else {
			discsToInsert.push(disc);
		}
	}

	return { discsToInsert, discsToUpdate };
};

const fetchDiscsFromJson = async (manager: Manager, existingDiscs: IDisc[]) => {
	fs.readFile("./src/db/discs.json", "utf8", async (err, jsonString) => {
		try {
			if (err) {
				log.error("File read failed: ", err);
				return;
			}

			const rawDiscs: IDisc[] = JSON.parse(jsonString);
			const discs: IDiscUpsert = getDiscsFromJson(rawDiscs, existingDiscs);

			await upsertDiscs(manager, discs.discsToInsert, discs.discsToUpdate, existingDiscs, rawDiscs.length, "discs.json");

		} catch (error) {
			log.error(error);
		}
	});
};

const getDiscsFromJson = (rawDiscs: IDisc[], existingDiscs: IDisc[]): IDiscUpsert => {
	let discsToInsert: IDisc[] = [];
	let discsToUpdate: IDisc[] = [];

	for (const rawDisc of rawDiscs) {
		const name = rawDisc.name;
		const brand = rawDisc.brand;
		const category = parseCategory(rawDisc.category);
		const speed = rawDisc.speed;
		const glide = rawDisc.glide;
		const turn = rawDisc.turn;
		const fade = rawDisc.fade;
		const stability = parseStability(null, turn, fade);
		const link = rawDisc.link;
		const pic = rawDisc.pic;

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic };

		let match = discHasNameAndBrandMatch(disc, existingDiscs);
		if (match) {
			if (!discsAreEqual(disc, match)) {
				updateDiscFromOtherDisc(match, disc);
				discsToUpdate.push(match);
			}
		} else {
			discsToInsert.push(disc);
		}
	}

	return { discsToInsert, discsToUpdate };
};

const upsertDiscs = async (manager: Manager, discsToInsert: IDisc[], discsToUpdate: IDisc[], existingDiscs: IDisc[], fetchCount: number, source: string) => {
	try {
		if (discsToInsert.length > 0) await DiscRepo.InsertMany(manager, discsToInsert);
		if (discsToUpdate.length > 0 && source === Config.DISC_FETCH_URL) await DiscRepo.UpdateMany(manager, discsToUpdate);

		log.info(`${fetchCount} discs fetched from ${source}.`);
		log.info(`${existingDiscs.length} existing discs in database.`);
		log.info(`${discsToInsert.length} new discs inserted.`);
		if (existingDiscs.length > 0) {
			log.info(`${source === Config.DISC_FETCH_URL ? discsToUpdate.length : 0} existing discs updated with new data.`);
		}
	} catch (error) {
		log.error(error);
		log.error("Error updating disc data in database!");
	}
};

const parseCategory = (category: string): string => {
	return categoryMap.get(category) || category;
};

const parseStability = (element: any, turn: string, fade: string): string => {
	if (element) {
		const classes: string = element.parentNode.parentNode.parentNode.className;
		const classesSplit = classes.split(" ");

		// check for stability via class name in html
		for (let i = classesSplit.length - 1; i >= 0; i--) {
			const stability = classesSplit[i];
			if (stabilityValues.includes(stability)) return stability;
		}
	}

	// if not found in html, calculate it based on turn and fade
	const diff: number = parseFloat(turn) + parseFloat(fade);
	switch (true) {
		case (diff >= 4): return "very-overstable";
		case (diff >= 2 && diff < 4): return "overstable";
		case (diff < 2 && diff > -2): return "stable";
		case (diff <= -2 && diff > -4): return "understable";
		case (diff <= -4): return "very-understable";
		default: return null;
	}
};