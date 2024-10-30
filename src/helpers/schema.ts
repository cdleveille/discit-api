import { Schema } from "mongoose";
import { z } from "zod";

import type { TBase } from "@types";

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

export const discSchema = z.object({
	id: z.string(),
	name: z.string(),
	brand: z.string(),
	category: z.string(),
	speed: z.string(),
	glide: z.string(),
	turn: z.string(),
	fade: z.string(),
	stability: z.string(),
	link: z.string().optional(),
	pic: z.string().optional(),
	name_slug: z.string(),
	brand_slug: z.string(),
	category_slug: z.string(),
	stability_slug: z.string(),
	color: z.string().optional(),
	background_color: z.string().optional()
});

export const discQuerySchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	brand: z.string().optional(),
	category: z.string().optional(),
	speed: z.string().optional(),
	glide: z.string().optional(),
	turn: z.string().optional(),
	fade: z.string().optional(),
	stability: z.string().optional()
});

export const discByIdSchema = z.object({
	id: z.string()
});

export const regexifySchema = z.object({
	$regex: z.string(),
	$options: z.string()
});

export const discFilterSchema = z.object({
	id: z.string().optional(),
	name_slug: regexifySchema.optional(),
	brand_slug: regexifySchema.optional(),
	category_slug: regexifySchema.optional(),
	speed: z.string().optional(),
	glide: z.string().optional(),
	turn: z.string().optional(),
	fade: z.string().optional(),
	stability_slug: z.string().optional()
});

export const bagSchema = z.object({
	id: z.string(),
	name: z.string(),
	user_id: z.string(),
	discs: z.array(z.string())
});
