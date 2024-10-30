import { Schema } from "mongoose";

import type { TBase, TDiscFilter, TDiscQuery } from "@types";

export const BaseSchema = new Schema<TBase>({
	created_at: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updated_at: {
		type: Date,
		default: () => Date.now()
	}
});
export const newId = () => crypto.randomUUID();

export const projection = { _id: 0, created_at: 0, updated_at: 0, __v: 0 };

export const regexify = (field: string) => ({ $regex: field, $options: "i" });

export const buildDiscFilter = (query: TDiscQuery) => {
	const { id, name, brand, category, stability, speed, glide, turn, fade } = query;
	const filter: TDiscFilter = {};
	if (id) filter.id = id;
	if (name) filter.name_slug = regexify(name);
	if (brand) filter.brand_slug = regexify(brand);
	if (category) filter.category_slug = regexify(category);
	if (stability) filter.stability_slug = stability.toLowerCase();
	if (speed) filter.speed = speed;
	if (glide) filter.glide = glide;
	if (turn) filter.turn = turn;
	if (fade) filter.fade = fade;
	return filter;
};
