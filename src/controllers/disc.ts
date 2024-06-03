import { Elysia, t } from "elysia";

import { discRequestSchema, discResponseSchema, errorResponse, projection, regexify } from "@helpers";
import { Disc } from "@models";
import { assertIsRequestAuthorized } from "@services";
import { IDisc, IDiscFilter } from "@types";

export const initDiscRoutes = (app: Elysia) => {
	/* Get all discs (optionally filter by fields specified in query string) */
	app.get(
		"/disc",
		async ({ set, query }) => {
			try {
				const filter = buildFilter(query as Record<string, string>);
				return Disc.find(filter, projection).sort({ name: 1 });
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

	/* Insert discs (bearer auth secured) */
	app.post("/disc", async ({ set, request }) => {
		try {
			assertIsRequestAuthorized(request);
			const discs = (await Bun.readableStreamToJSON(request.body)) as IDisc[];
			return Disc.insertMany(discs);
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Delete all discs (bearer auth secured) */
	app.delete("/disc", async ({ set, request }) => {
		try {
			assertIsRequestAuthorized(request);
			return Disc.deleteMany();
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Delete disc by id (bearer auth secured) */
	app.delete("/disc/:id", async ({ set, params, request }) => {
		try {
			assertIsRequestAuthorized(request);
			const { id } = params as Record<string, string>;
			const disc = await Disc.findOne({ id });
			if (!disc) throw { code: 404, data: "Disc not found." };
			return Disc.deleteOne({ id });
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
