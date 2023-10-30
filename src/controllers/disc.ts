import { Elysia, t } from "elysia";

import { Config, discRequestSchema, discResponseSchema, errorResponse, projection, regexify } from "@helpers";
import { Disc } from "@models";
import { IDiscFilter } from "@types";

export const initDiscRoutes = (app: Elysia) => {
	/* Get all discs */
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
			response: t.Array(discResponseSchema)
		}
	);

	/* Get disc by id */
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
			response: discResponseSchema
		}
	);

	/* Delete all discs (bearer auth secured) */
	app.delete("/disc", async ({ set, request }) => {
		try {
			const tokenPrefix = "Bearer ";
			const bearerToken = request.headers.get("Authorization");
			if (bearerToken?.slice(0, tokenPrefix.length) !== tokenPrefix)
				throw { code: 401, data: "Invalid authorization method. Bearer token expected." };
			const token = bearerToken.slice(tokenPrefix.length);
			const auth = token === Config.API_KEY;
			if (!auth) throw { code: 401, data: "Invalid token." };
			await Disc.deleteMany();
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Delete disc by id (bearer auth secured) */
	app.delete("/disc/:id", async ({ set, params, request }) => {
		try {
			const { id } = params as Record<string, string>;
			const tokenPrefix = "Bearer ";
			const bearerToken = request.headers.get("Authorization");
			if (bearerToken?.slice(0, tokenPrefix.length) !== tokenPrefix)
				throw { code: 401, data: "Invalid authorization method. Bearer token expected." };
			const token = bearerToken.slice(tokenPrefix.length);
			const auth = token === Config.API_KEY;
			if (!auth) throw { code: 401, data: "Invalid token." };
			const disc = await Disc.findOne({ id });
			if (!disc) throw { code: 404, data: "Disc not found." };
			await Disc.deleteOne({ id });
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
