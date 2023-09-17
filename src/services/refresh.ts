import { JSDOM } from "jsdom";

import {
	discMeetsMinCriteria,
	hashString,
	parseCategory,
	parseDecimalString,
	parseStability,
	slugify,
	writeDataToFile
} from "@helpers";
import { Disc } from "@models";
import { log } from "@services";
import { DISC_FETCH_URL, IDisc, IDiscCollections, Site } from "@types";

export const refreshDiscs = async () => {
	try {
		log.info("*** START *** - disc refresh process starting.");
		const existingDiscs = await backupDiscs();
		const discCollections = await getDiscs();
		const discsToInsert = processDiscs(discCollections);
		if (discsToInsert.length >= existingDiscs.length) {
			await deleteAllDiscs();
			await insertDiscs(discsToInsert);
		}
		log.info("*** END *** - disc refresh process completed successfully.");
	} catch (error) {
		log.error(error);
		log.error("*** ABEND *** - disc refresh process completed with errors.");
	}
};

const backupDiscs = async () => {
	try {
		log.info("Getting all existing discs from database...");
		const existingDiscs: IDisc[] = await Disc.find();
		log.info(`${existingDiscs.length} existing discs in database.`);
		if (existingDiscs.length > 0) {
			log.info("Backing up existing discs...");
			const filepath = "discs_backup.json";
			writeDataToFile(existingDiscs, filepath);
			log.info(`Backed up ${existingDiscs.length} existing discs to file '${filepath}.`);
		}
		return existingDiscs;
	} catch (error) {
		throw new Error(`${error} - Error backing up existing discs.`);
	}
};

const getDiscs = async () => {
	try {
		log.info(`Fetching discs from ${DISC_FETCH_URL}...`);
		const { status, body } = await fetch(DISC_FETCH_URL);
		if (status !== 200) throw `Bad response status: ${status}`;
		if (!body) throw `${DISC_FETCH_URL} returned no data!`;
		const dom = new JSDOM(await Bun.readableStreamToText(body));
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
			const id = hashString(element.getAttribute(Site.idAttr));
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
