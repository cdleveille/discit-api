import { t } from "elysia";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { IBag, IBase } from "@types";

export const regexify = (field: string) => ({ $regex: field, $options: "i" });

export const newId = () => uuidv4();

export const isAlphaNumeric = (str: string): boolean => {
	let code: number, i: number, len: number;
	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (
			!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123)
		) {
			// lower alpha (a-z)
			return false;
		}
	}
	return true;
};

export const projection = { _id: 0, created_at: 0, updated_at: 0, __v: 0 };

export const BaseSchema = new Schema<IBase>({
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

export const parseBody = (body: unknown) => {
	if (typeof body === "string") return JSON.parse(body);
	return body;
};

export const buildBagResponse = ({ id, name, user_id, discs }: IBag) => ({
	id,
	name,
	user_id,
	discs
});

export const discQuerySchema = t.Object({
	id: t.Optional(t.String()),
	name: t.Optional(t.String()),
	brand: t.Optional(t.String()),
	category: t.Optional(t.String()),
	speed: t.Optional(t.String()),
	glide: t.Optional(t.String()),
	turn: t.Optional(t.String()),
	fade: t.Optional(t.String()),
	stability: t.Optional(t.String())
});

export const discResponseSchema = t.Object({
	id: t.String(),
	name: t.String(),
	brand: t.String(),
	category: t.String(),
	speed: t.String(),
	glide: t.String(),
	turn: t.String(),
	fade: t.String(),
	stability: t.String(),
	link: t.String(),
	pic: t.String(),
	name_slug: t.String(),
	brand_slug: t.String(),
	category_slug: t.String(),
	stability_slug: t.String(),
	color: t.String(),
	background_color: t.String()
});

export const discArrayResponseSchema = t.Array(discResponseSchema);
