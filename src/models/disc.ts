import { model, Schema } from "mongoose";

import { BaseSchema, CustomError, projection } from "@helpers";
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

const getDiscs = (filter?: TDiscQuery) => DiscModel.find(filter ?? {}, projection).sort({ name: 1 });

const assertDiscExists = async (id: string) => {
	const disc = await DiscModel.findOne({ id }, projection);
	if (!disc) throw new CustomError(`Disc with id '${id}' not found`, 404);
	return disc;
};

const insertDiscs = (discs: TDisc[]) => DiscModel.insertMany(discs);

const deleteAllDiscs = () => DiscModel.deleteMany();

const deleteDiscById = async (id: string) => {
	await assertDiscExists(id);
	DiscModel.deleteOne({ id });
};

export const Disc = {
	getDiscs,
	assertDiscExists,
	insertDiscs,
	deleteAllDiscs,
	deleteDiscById
};
