import { Schema } from "mongoose";

import type { TBase, TDisc, TDiscQuery } from "@types";

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

export const filterDiscsByQuery = (discs: TDisc[], query: TDiscQuery) => {
	const { id, name, brand, category, stability, speed, glide, turn, fade } = query;
	return discs.filter(disc => {
		return (
			(!id || disc.id === id) &&
			(!name || disc.name_slug.includes(name.toLowerCase())) &&
			(!brand || disc.brand_slug.includes(brand.toLowerCase())) &&
			(!category || disc.category_slug.includes(category.toLowerCase())) &&
			(!stability || disc.stability_slug === stability.toLowerCase()) &&
			(!speed || disc.speed === speed) &&
			(!glide || disc.glide === glide) &&
			(!turn || disc.turn === turn) &&
			(!fade || disc.fade === fade)
		);
	});
};
