import { Elysia, t } from "elysia";

import { discRequestSchema, discResponseSchema, errorResponse, projection, regexify } from "@helpers";
import { Disc } from "@models";
import { IDiscFilter } from "@types";

export const initDiscRoutes = (app: Elysia) => {
	app.get(
		"/disc",
		async ({ set, query }) => {
			try {
				const filter = buildFilter(query as Record<string, string>);
				return await Disc.find(filter, projection).sort({ name: 1 });
			} catch (error) {
				return errorResponse(set, error);
			}
		},
		{
			type: "application/json",
			query: discRequestSchema,
			response: {
				200: t.Array(discResponseSchema)
			}
		}
	);

	app.get(
		"/disc/:id",
		async ({ set, params }) => {
			try {
				const { id } = params as Record<string, string>;
				const disc = await Disc.findOne({ id }, projection);
				if (!disc) throw { code: 404, data: "Disc not found." };
				return disc;
			} catch (error) {
				return errorResponse(set, error);
			}
		},
		{
			type: "application/json",
			params: t.Object({ id: t.String() }),
			response: {
				200: discResponseSchema,
				404: t.Object({
					code: t.Integer({ default: 404 }),
					data: t.String({ default: "Disc not found." })
				})
			}
		}
	);
};

const buildFilter = (query: Record<string, string>) => {
	const { id, name, brand, category, stability, speed, glide, turn, fade } = query;
	const filter = {} as IDiscFilter;
	id && (filter.id = id);
	name && (filter.name_slug = regexify(name));
	brand && (filter.brand_slug = regexify(brand));
	category && (filter.category_slug = regexify(category));
	stability && (filter.stability_slug = stability.toLowerCase());
	speed && (filter.speed = speed);
	glide && (filter.glide = glide);
	turn && (filter.turn = turn);
	fade && (filter.fade = fade);
	return filter;
};
