import axios from "axios";
import { JSDOM } from "jsdom";

import Config from "../helpers/config";
import { discNameAndBrandMatch, discsAreEqual, updateDiscFromOtherDisc } from "../helpers/util";
import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscUpsert } from "../types/abstract";
import { CategoryMap, Site, StabilityValues } from "../types/constants";

export const fetchDiscs = async (manager: Manager) => {
	try {
		log.info("***START*** - disc maintenance process.");

		log.info("Getting all existing discs from database...");
		const existingDiscs: IDisc[] = await DiscRepo.FindAll(manager);

		await fetchDiscsFromWebPage(manager, existingDiscs);

		log.info("***END*** - disc maintenance process completed successfully.");
	} catch (error) {
		log.error(error, `Error fetching disc data from '${Config.DISC_FETCH_URL}'!`);
	}
};

const fetchDiscsFromWebPage = async (manager: Manager, existingDiscs: IDisc[]) => {
	try {
		log.info(`Fetching disc data from ${Config.DISC_FETCH_URL}...`);
		const { data } = await axios.get(Config.DISC_FETCH_URL);
		if (!data) throw `${Config.DISC_FETCH_URL} returned no data!`;

		const dom = new JSDOM(data);
		const discCollection = dom.window.document.getElementsByClassName(Site.discClass);
		const putterCollection = dom.window.document.getElementsByClassName(Site.putterClass);

		const discs: IDiscUpsert = getDiscsFromWebPage(discCollection, putterCollection, existingDiscs);

		await upsertDiscs(manager, discs.discsToInsert, discs.discsToUpdate, existingDiscs, discCollection.length + putterCollection.length);
	} catch (error) {
		log.error(error, `Error fetching disc data from '${Config.DISC_FETCH_URL}'!`);
	}
};

const getDiscsFromWebPage = (discCollection: any, putterCollection: any, existingDiscs: IDisc[]): IDiscUpsert => {
	let discsToInsert: IDisc[] = [];
	let discsToUpdate: IDisc[] = [];

	// distance drivers, hybrid drivers, control drivers, midranges
	for (const element of discCollection) {
		const name = element.getAttribute(Site.discNameAttr);
		const brand = element.getAttribute(Site.brandAttr);
		const category = parseCategory(element.getAttribute(Site.categoryAttr));
		const speed = element.getAttribute(Site.speedAttr);
		const glide = element.getAttribute(Site.glideAttr);
		const turn = element.getAttribute(Site.turnAttr);
		const fade = element.getAttribute(Site.fadeAttr);
		const stability = parseStability(element, turn, fade);
		const link = element.getAttribute(Site.linkAttr);
		const pic = element.getAttribute(Site.discPicAttr);

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic };

		let match;
		for (const existingDisc of existingDiscs) {
			match = discNameAndBrandMatch(disc, existingDisc);
			if (match) break;
		}

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
		const name = element.getAttribute(Site.putterNameAttr);
		const brand = element.getAttribute(Site.brandAttr);
		const category = "putter";
		const speed = element.getAttribute(Site.speedAttr);
		const glide = element.getAttribute(Site.glideAttr);
		const turn = element.getAttribute(Site.turnAttr);
		const fade = element.getAttribute(Site.fadeAttr);
		const stability = parseStability(element, turn, fade);
		const link = element.getAttribute(Site.linkAttr);
		const pic = element.getAttribute(Site.putterPicAttr);

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic };

		let match;
		for (const existingDisc of existingDiscs) {
			match = discNameAndBrandMatch(disc, existingDisc);
			if (match) break;
		}

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

const upsertDiscs = async (manager: Manager, discsToInsert: IDisc[], discsToUpdate: IDisc[], existingDiscs: IDisc[], fetchCount: number) => {
	try {
		if (discsToInsert.length > 0) await DiscRepo.InsertMany(manager, discsToInsert);
		if (discsToUpdate.length > 0) await DiscRepo.UpdateMany(manager, discsToUpdate);

		log.info(`${fetchCount} discs fetched from ${Config.DISC_FETCH_URL}.`);
		log.info(`${existingDiscs.length} existing discs in database.`);
		log.info(`${discsToInsert.length} new discs inserted.`);
		log.info(`${discsToUpdate.length} existing discs updated with new data.`);
	} catch (error) {
		log.error(error);
		log.error("Error updating disc data in database!");
	}
};

const parseCategory = (category: string): string => {
	return CategoryMap.get(category) || category;
};

const parseStability = (element: any, turn: string, fade: string): string => {
	if (element) {
		const classes: string = element.parentNode.parentNode.parentNode.className;
		const classesSplit = classes.split(" ");

		// check for stability via class name in html
		for (let i = classesSplit.length - 1; i >= 0; i--) {
			const stability = classesSplit[i];
			if (StabilityValues.includes(stability)) return stability;
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