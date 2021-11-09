import axios from "axios";
import * as fs from "fs";
import { JSDOM } from "jsdom";

import Config from "../helpers/config";
import { Disc } from "../models/Disc";
import { DiscRepository as DiscRepo, RequestRepo as Manager } from "../repositories/DiscRepository";
import log from "../services/log";
import { IDisc, IDiscRaw } from "../types/abstract";

export const maintainDiscs = async (manager: Manager) => {
	log.info("***START*** - disc maintenance process.");

	log.info("Getting all existing discs from database...");
	const existingDiscs = await DiscRepo.FindAll(manager);

	if (Config.DISC_FETCH_URL) {
		await populateDBFromWebPage(manager, existingDiscs);
	} else {
		log.error("DISC_FETCH_URL is not defined! Loading from discs.json file instead.");
		await populateDBFromJson(manager, existingDiscs);
	}
};

export const populateDBFromWebPage = async (manager: Manager, existingDiscs: Disc[]) => {
	try {
		log.info(`Fetching disc data from ${Config.DISC_FETCH_URL}...`);
		const { data } = await axios.get(Config.DISC_FETCH_URL);
		if (!data) throw `${Config.DISC_FETCH_URL} returned no data!`;

		const dom = new JSDOM(data);
		const discCollection = dom.window.document.getElementsByClassName("disc-item");
		const putterCollection = dom.window.document.getElementsByClassName("pc-entry");

		let discs: IDisc[] = getDiscsFromWebPage(discCollection, putterCollection, existingDiscs);

		await insertDiscs(manager, discs, Config.DISC_FETCH_URL, discCollection.length + putterCollection.length);
	} catch (error) {
		log.error(error);
		log.error(`Error fetching disc data from '${Config.DISC_FETCH_URL}'! Loading from discs.json file instead.`);
		return await populateDBFromJson(manager, existingDiscs);
	}
};

const getDiscsFromWebPage = (discCollection: any, putterCollection: any, existingDiscs: Disc[]): IDisc[] => {
	let newDiscs: IDisc[] = [];

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

		if (!discExistsInDB(disc, existingDiscs)) newDiscs.push(disc);
	}

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

		if (!discExistsInDB(disc, existingDiscs)) newDiscs.push(disc);
	}

	return newDiscs;
};

export const populateDBFromJson = async (manager: Manager, existingDiscs: Disc[]) => {
	fs.readFile("./src/db/discs.json", "utf8", async (err, jsonString) => {
		try {
			if (err) {
				log.error("File read failed: ", err);
				return;
			}

			const rawDiscs: IDiscRaw[] = JSON.parse(jsonString);
			const discs: IDisc[] = getDiscsFromJson(rawDiscs, existingDiscs);

			await insertDiscs(manager, discs, "discs.json", rawDiscs.length);

		} catch (error) {
			log.error(error);
		}
	});
};

const getDiscsFromJson = (rawDiscs: IDiscRaw[], existingDiscs: Disc[]): IDisc[] => {
	let newDiscs: IDisc[] = [];

	for (const rawDisc of rawDiscs) {
		const disc: IDisc = {
			name: rawDisc.name,
			brand: rawDisc.brand,
			category: rawDisc.category,
			speed: parseFloat(rawDisc.speed),
			glide: parseFloat(rawDisc.glide),
			turn: parseFloat(rawDisc.turn),
			fade: parseFloat(rawDisc.fade)
		};

		if (!discExistsInDB(disc, existingDiscs)) newDiscs.push(disc);
	}

	return newDiscs;
};

const insertDiscs = async (manager: Manager, discs: IDisc[], source: string, numFetched: number) => {
	const areThereNewDiscs: boolean = discs.length > 0;

	if (areThereNewDiscs) {
		const inserted = await DiscRepo.InsertMany(manager, discs);
		if (!inserted) throw "Error loading disc data into database!";
	}

	log.info(`Successfully fetched data for ${numFetched} discs (source: ${source}).`);
	log.info(`Database already contains data for ${numFetched - discs.length} discs fetched.`);
	log.info(`${!areThereNewDiscs ? "Up to date! " : ""}Inserted data for ${discs.length} new discs into database.`);

	log.info("***END*** - disc maintenance process.");
};

const discExistsInDB = (disc: IDisc, existingDiscs: Disc[]): boolean => {
	if (existingDiscs.length === 0) return false;

	for (const existingDisc of existingDiscs) {
		if (disc.name === existingDisc.name && disc.brand === existingDisc.brand)
			return true;
	}

	return false;
};
