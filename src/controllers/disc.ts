import { Elysia, t } from "elysia";

import {
	discArrayResponseSchema,
	discQuerySchema,
	discResponseSchema,
	NotFoundError,
	projection,
	regexify
} from "@helpers";
import { Disc } from "@models";
import { assertIsRequestAuthorized } from "@services";
import { IDisc, IDiscFilter } from "@types";

export const initDiscRoutes = (app: Elysia) => {
	/* Get all discs (optionally filter by fields specified in query string) */
	app.get(
		"/disc",
		async ({ query }) => {
			const filter = buildFilter(query as Record<string, string>);
			return await Disc.find(filter, projection).sort({ name: 1 });
		},
		{
			type: "application/json",
			query: discQuerySchema,
			response: discArrayResponseSchema
		}
	);

	/* Get disc by id */
	app.get(
		"/disc/:id",
		async ({ params: { id } }) => {
			const disc = await Disc.findOne({ id }, projection);
			if (!disc) throw new NotFoundError("Disc not found");
			return Object.assign({}, disc)["_doc"];
		},
		{
			type: "application/json",
			params: t.Object({ id: t.String() }),
			response: discResponseSchema
		}
	);

	/* Insert discs (bearer auth secured) */
	app.post("/disc", async ({ request }) => {
		assertIsRequestAuthorized(request);
		const discs = (await Bun.readableStreamToJSON(request.body)) as IDisc[];
		return await Disc.insertMany(discs);
	});

	/* Delete all discs (bearer auth secured) */
	app.delete("/disc", async ({ request }) => {
		assertIsRequestAuthorized(request);
		return await Disc.deleteMany();
	});

	/* Delete disc by id (bearer auth secured) */
	app.delete(
		"/disc/:id",
		async ({ request, params: { id } }) => {
			assertIsRequestAuthorized(request);
			const disc = await Disc.findOne({ id });
			if (!disc) throw new NotFoundError("Disc not found");
			return await Disc.deleteOne({ id });
		},
		{
			type: "application/json",
			params: t.Object({ id: t.String() })
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
