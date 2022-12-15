import axios from "axios";
import { JSDOM } from "jsdom";
import path from "path";

import {
	discMeetsMinCriteria,
	hashString,
	parseCategory,
	parseDecimalString,
	parseStability,
	slugify,
	writeDataToFile
} from "../helpers/util";
import { Disc } from "../models/disc";
import log from "../services/log";
import { IDisc, IDiscCollections } from "../types/abstract";
import { DISC_FETCH_URL, Site } from "../types/constants";

export const fetchDiscs = async () => {
	try {
		log.info("*** START *** - disc maintenance process starting.");

		await backupDiscs();

		const discCollections = await getDiscs();

		const discsToInsert = processDiscs(discCollections);

		if (discsToInsert.length > 0) {
			await deleteAllDiscs();
			await insertDiscs(discsToInsert);
		}

		log.info("*** END *** - disc maintenance process completed successfully.");
	} catch (error) {
		log.error(error);
		log.error("*** ABEND *** - disc maintenance process completed with errors.");
	}
};

const backupDiscs = async () => {
	try {
		log.info("Getting all existing discs from database...");
		const existingDiscs: IDisc[] = await Disc.find();
		log.info(`${existingDiscs.length} existing discs in database.`);

		if (existingDiscs.length > 0) {
			log.info("Backing up existing discs...");
			const filepath = path.join(process.cwd(), "backup\\discs.json");
			writeDataToFile(existingDiscs, filepath);
			log.info(`Backed up ${existingDiscs.length} existing discs to file '${filepath}.`);
		}
	} catch (error) {
		throw new Error(`${error} - Error backing up existing discs.`);
	}
};

const getDiscs = async () => {
	try {
		log.info(`Fetching discs from ${DISC_FETCH_URL}...`);
		const { status, data } = await axios.get(DISC_FETCH_URL);
		if (status !== 200) throw `Bad response status: ${status}`;
		if (!data) throw `${DISC_FETCH_URL} returned no data!`;

		const dom = new JSDOM(data);
		const discCollection = dom.window.document.getElementsByClassName(Site.discClass);
		const putterCollection = dom.window.document.getElementsByClassName(Site.putterClass);
		log.info(`${discCollection.length + putterCollection.length} discs fetched.`);

		return { discCollection, putterCollection } as IDiscCollections;
	} catch (error) {
		throw new Error(`${error} - Error fetching disc data from '${DISC_FETCH_URL}'.`);
	}
};

const processDiscs = (collections: IDiscCollections) => {
	try {
		log.info("Processing fetched discs...");
		const discsToInsert: IDisc[] = [];

		// distance drivers, hybrid drivers, control drivers, midranges
		for (const element of collections.discCollection) {
			const name = element.getAttribute(Site.discNameAttr);
			const brand = element.getAttribute(Site.brandAttr);
			const id = hashString(name + brand);
			const category = parseCategory(element.getAttribute(Site.categoryAttr));
			const speed = parseDecimalString(element.getAttribute(Site.speedAttr));
			const glide = parseDecimalString(element.getAttribute(Site.glideAttr));
			const turn = parseDecimalString(element.getAttribute(Site.turnAttr));
			const fade = parseDecimalString(element.getAttribute(Site.fadeAttr));
			const stability = parseStability(element, turn, fade);
			const link = element.getAttribute(Site.linkAttr);
			const pic = element.getAttribute(Site.discPicAttr);
			const name_slug = slugify(name);
			const brand_slug = slugify(brand);
			const category_slug = slugify(category);
			const stability_slug = slugify(stability);
			const color = element.getAttribute(Site.colorAttr);
			const background_color = element.getAttribute(Site.backgroundColorAttr);

			const disc: IDisc = {
				id,
				name,
				brand,
				category,
				speed,
				glide,
				turn,
				fade,
				stability,
				link,
				pic,
				name_slug,
				brand_slug,
				category_slug,
				stability_slug,
				color,
				background_color
			};

			if (discMeetsMinCriteria(disc)) discsToInsert.push(disc);
		}

		// putters
		for (const element of collections.putterCollection) {
			const name = element.getAttribute(Site.putterNameAttr);
			const brand = element.getAttribute(Site.brandAttr);
			const id = hashString(name + brand);
			const category = "Putter";
			const speed = parseDecimalString(element.getAttribute(Site.speedAttr));
			const glide = parseDecimalString(element.getAttribute(Site.glideAttr));
			const turn = parseDecimalString(element.getAttribute(Site.turnAttr));
			const fade = parseDecimalString(element.getAttribute(Site.fadeAttr));
			const stability = parseStability(element, turn, fade);
			const link = element.getAttribute(Site.linkAttr);
			const pic = element.getAttribute(Site.putterPicAttr);
			const name_slug = slugify(name);
			const brand_slug = slugify(brand);
			const category_slug = slugify(category);
			const stability_slug = slugify(stability);
			const color = element.getAttribute(Site.colorAttr);
			const background_color = element.getAttribute(Site.backgroundColorAttr);

			const disc: IDisc = {
				id,
				name,
				brand,
				category,
				speed,
				glide,
				turn,
				fade,
				stability,
				link,
				pic,
				name_slug,
				brand_slug,
				category_slug,
				stability_slug,
				color,
				background_color
			};

			if (discMeetsMinCriteria(disc)) discsToInsert.push(disc);
		}

		log.info(
			`${discsToInsert.length}/${
				collections.discCollection.length + collections.putterCollection.length
			} fetched discs meet insert criteria.`
		);
		return discsToInsert;
	} catch (error) {
		throw new Error(`${error} - Error processing fetched disc data.`);
	}
};

const deleteAllDiscs = async () => {
	try {
		log.info("Deleting all existing discs...");
		await Disc.deleteMany();
		log.info("All existing discs deleted.");
	} catch (error) {
		throw new Error(`${error} - Error deleting existing discs from database.`);
	}
};

const insertDiscs = async (discsToInsert: IDisc[]) => {
	try {
		log.info(`Inserting ${discsToInsert.length} discs...`);
		await Disc.create(discsToInsert);
		log.info(`${discsToInsert.length} discs inserted.`);
	} catch (error) {
		throw new Error(`${error} - Error inserting discs into database.`);
	}
};
