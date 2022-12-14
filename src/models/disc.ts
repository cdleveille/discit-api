import { model, Schema } from "mongoose";

import { IDisc, IDiscModel } from "../types/abstract";
import { BaseSchema } from "./_base";

const DiscSchema = new Schema<IDisc>({
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
}).add(BaseSchema);

export const Disc = model<IDisc, IDiscModel>("Disc", DiscSchema);
