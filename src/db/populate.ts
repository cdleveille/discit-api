import axios from "axios";
import { JSDOM } from "jsdom";

import { slugify } from "../../client/src/shared/helpers/util";
import Config from "../helpers/config";
import { discNameAndBrandMatch, discsAreEqual, updateDiscFromOtherDisc } from "../helpers/util";
import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscUpsert } from "../types/abstract";
import { CategoryMap, Site, StabilityMap } from "../types/constants";

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
		const name: string = element.getAttribute(Site.discNameAttr);
		const brand: string = element.getAttribute(Site.brandAttr);
		const category: string = parseCategory(element.getAttribute(Site.categoryAttr));
		const speed: string = parseDecimalString(element.getAttribute(Site.speedAttr));
		const glide: string = parseDecimalString(element.getAttribute(Site.glideAttr));
		const turn: string = parseDecimalString(element.getAttribute(Site.turnAttr));
		const fade: string = parseDecimalString(element.getAttribute(Site.fadeAttr));
		const stability: string = parseStability(element, turn, fade);
		const link: string = element.getAttribute(Site.linkAttr);
		const pic: string = element.getAttribute(Site.discPicAttr);
		const name_slug: string = slugify(name);
		const brand_slug: string = slugify(brand);
		const category_slug: string = slugify(category);
		const stability_slug: string = slugify(stability);
		const color: string = element.getAttribute(Site.colorAttr);
		const background_color: string = element.getAttribute(Site.backgroundColorAttr);

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic, name_slug, brand_slug, category_slug, stability_slug, color, background_color };

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
		const name: string = element.getAttribute(Site.putterNameAttr);
		const brand: string = element.getAttribute(Site.brandAttr);
		const category: string = "Putter";
		const speed: string = parseDecimalString(element.getAttribute(Site.speedAttr));
		const glide: string = parseDecimalString(element.getAttribute(Site.glideAttr));
		const turn: string = parseDecimalString(element.getAttribute(Site.turnAttr));
		const fade: string = parseDecimalString(element.getAttribute(Site.fadeAttr));
		const stability: string = parseStability(element, turn, fade);
		const link: string = element.getAttribute(Site.linkAttr);
		const pic: string = element.getAttribute(Site.putterPicAttr);
		const name_slug: string = slugify(name);
		const brand_slug: string = slugify(brand);
		const category_slug: string = slugify(category);
		const stability_slug: string = slugify(stability);
		const color: string = element.getAttribute(Site.colorAttr);
		const background_color: string = element.getAttribute(Site.backgroundColorAttr);

		const disc: IDisc = { name, brand, category, speed, glide, turn, fade, stability, link, pic, name_slug, brand_slug, category_slug, stability_slug, color, background_color };

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
		if (discsToUpdate.length > 0 && !Config.INSERT_ONLY) await DiscRepo.UpdateMany(manager, discsToUpdate);

		let additionalUpdateOutput = "";
		if (discsToUpdate.length > 0 && Config.INSERT_ONLY) {
			additionalUpdateOutput = ` (fetched new data for ${discsToUpdate.length} existing discs, but INSERT_ONLY flag is set to true)`;
		}

		log.info(`${fetchCount} discs fetched from ${Config.DISC_FETCH_URL}.`);
		log.info(`${existingDiscs.length} existing discs in database.`);
		log.info(`${discsToInsert.length} new discs inserted.`);
		log.info(`${Config.INSERT_ONLY ? 0 : discsToUpdate.length} existing discs updated with new data${additionalUpdateOutput}.`);
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
			if (Array.from(StabilityMap.keys()).includes(stability)) return StabilityMap.get(stability);
		}
	}

	// if not found in html, calculate it based on turn and fade
	const diff: number = parseFloat(turn) + parseFloat(fade);
	switch (true) {
		case (diff >= 4): return "Very Overstable";
		case (diff >= 2 && diff < 4): return "Overstable";
		case (diff < 2 && diff > -2): return "Stable";
		case (diff <= -2 && diff > -4): return "Understable";
		case (diff <= -4): return "Very Understable";
		default: return null;
	}
};

const parseDecimalString = (decimal: string) => {
	if (decimal.startsWith(".") || decimal.startsWith("-.")) {
		return decimal.replace(".", "0.");
	}
	return decimal;
};
