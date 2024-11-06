import { bagSchema, discFilterSchema, discQuerySchema, discSchema } from "@helpers";
import { z } from "@hono/zod-openapi";

export type TBase = {
	created_at: Date;
	updated_at: Date;
};

export type TDisc = z.infer<typeof discSchema>;

export type TDiscQuery = z.infer<typeof discQuerySchema>;

export type TDiscFilter = z.infer<typeof discFilterSchema>;

export type TBag = z.infer<typeof bagSchema>;
