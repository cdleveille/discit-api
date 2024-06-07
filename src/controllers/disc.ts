import { Elysia } from "elysia";

import { NotFoundError, projection, regexify } from "@helpers";
import { Disc } from "@models";
import { assertIsRequestAuthorized } from "@services";
import { IDisc, IDiscFilter } from "@types";

export const initDiscRoutes = (app: Elysia) => {
	/* Get all discs (optionally filter by fields specified in query string) */
	app.get("/disc", async ({ query }) => {
		const filter = buildFilter(query as Record<string, string>);
		return Disc.find(filter, projection).sort({ name: 1 });
	});

	/* Get disc by id */
	app.get("/disc/:id", async ({ params: id }) => {
		const disc = await Disc.findOne({ id }, projection);
		if (!disc) throw new NotFoundError("Disc not found");
		return disc;
	});

	/* Insert discs (bearer auth secured) */
	app.post("/disc", async ({ request }) => {
		assertIsRequestAuthorized(request);
		const discs = (await Bun.readableStreamToJSON(request.body)) as IDisc[];
		return Disc.insertMany(discs);
	});

	/* Delete all discs (bearer auth secured) */
	app.delete("/disc", async ({ request }) => {
		assertIsRequestAuthorized(request);
		return Disc.deleteMany();
	});

	/* Delete disc by id (bearer auth secured) */
	app.delete("/disc/:id", async ({ request, params: id }) => {
		assertIsRequestAuthorized(request);
		const disc = await Disc.findOne({ id });
		if (!disc) throw new NotFoundError("Disc not found");
		return Disc.deleteOne({ id });
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
