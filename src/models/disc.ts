import fs from "fs";
import { model, Schema } from "mongoose";

import { DISCS_FILENAME } from "@constants";
import { BaseSchema, CustomError, filterDiscsByQuery, projection } from "@helpers";
import type { TDisc, TDiscQuery } from "@types";

const DiscModel = model<TDisc>(
	"Disc",
	new Schema<TDisc>({
		id: {
			type: String,
			required: true,
			index: true
		},
		name: {
			type: String,
			required: true
		},
		brand: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		speed: {
			type: String,
			required: true,
			index: true
		},
		glide: {
			type: String,
			required: true,
			index: true
		},
		turn: {
			type: String,
			required: true,
			index: true
		},
		fade: {
			type: String,
			required: true,
			index: true
		},
		stability: {
			type: String,
			required: true
		},
		link: {
			type: String,
			required: false
		},
		pic: {
			type: String,
			required: false
		},
		name_slug: {
			type: String,
			required: true,
			index: true
		},
		brand_slug: {
			type: String,
			required: true,
			index: true
		},
		category_slug: {
			type: String,
			required: true,
			index: true
		},
		stability_slug: {
			type: String,
			required: true,
			index: true
		},
		color: {
			type: String,
			required: false
		},
		background_color: {
			type: String,
			required: false
		}
	}).add(BaseSchema)
);

const getDiscsFromFile = async () => {
	if (!fs.existsSync(DISCS_FILENAME)) return [];
	const text = await Bun.file(DISCS_FILENAME).text();
	return JSON.parse(text) as TDisc[];
};

const writeDiscsToFile = async () => {
	const discs = await DiscModel.find({}, projection).sort({ name: 1 });
	await Bun.write(DISCS_FILENAME, JSON.stringify(discs));
	return discs;
};

const getDiscs = async (query?: TDiscQuery) => {
	const discs = await getDiscsFromFile();
	if (query) return filterDiscsByQuery(discs, query);
	return discs;
};

const assertDiscExists = async (id: string) => {
	const discs = await getDiscs();
	if (discs?.length > 0) {
		const disc = discs.find(d => d.id === id);
		if (disc) return disc;
	}
	throw new CustomError(`Disc with id '${id}' not found`, 404);
};

const insertDiscs = async (discs: TDisc[]) => {
	await DiscModel.insertMany(discs);
	return writeDiscsToFile();
};

const deleteAllDiscs = () => DiscModel.deleteMany();

const deleteDiscById = async (id: string) => {
	await assertDiscExists(id);
	DiscModel.deleteOne({ id });
};

export const Disc = {
	getDiscsFromFile,
	writeDiscsToFile,
	getDiscs,
	assertDiscExists,
	insertDiscs,
	deleteAllDiscs,
	deleteDiscById
};
