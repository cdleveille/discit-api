import { Elysia } from "elysia";

import { errorResponse, projection, regexify } from "@helpers";
import { Disc } from "@models";
import { IDiscFilter } from "@types";

export const initDiscRoutes = (app: Elysia) => {
	app.get("/disc", async ({ set, query }) => {
		try {
			const filter = buildFilter(query as Record<string, string>);
			return await Disc.find(filter, projection).sort({
				name: 1
			});
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	app.get("/disc/:id", async ({ set, params }) => {
		try {
			const { id } = params as Record<string, string>;
			const disc = await Disc.findOne({ id }, projection);
			if (!disc) throw { code: 404, data: "Disc not found." };
			return disc;
		} catch (error) {
			return errorResponse(set, error);
		}
	});
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
