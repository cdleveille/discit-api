import { Schema } from "mongoose";

import { z } from "@hono/zod-openapi";
import type { TBase } from "@types";

export const resMessageSchema = z.object({ message: z.string() });

export const authHeaderSchema = z.object({ authorization: z.string().optional() });

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
