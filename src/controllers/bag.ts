import { Elysia } from "elysia";

import { BadRequestError, buildBagResponse, NotFoundError, parseBody, projection } from "@helpers";
import { Bag, Disc } from "@models";
import { assertIsRequestAuthorized } from "@services";

export const initBagRoutes = (app: Elysia) => {
	/* Get all bags (optionally filter by user id) */
	app.get("/bag", async ({ request, query }) => {
		assertIsRequestAuthorized(request);
		const { user_id } = query as Record<string, string>;
		const bags = await (user_id ? Bag.find({ user_id }, projection) : Bag.find({}, projection));
		if (!bags || bags.length === 0) return [];
		return bags;
	});

	/* Get bag by id */
	app.get("/bag/:id", async ({ request, params: { id } }) => {
		assertIsRequestAuthorized(request);
		const bag = await Bag.findOne({ id }, projection);
		if (!bag) throw new NotFoundError("Bag not found");
		return bag;
	});

	/* Create new bag (bearer auth secured) */
	app.post("/bag/create", async ({ request, body }) => {
		assertIsRequestAuthorized(request);
		const { user_id, name } = parseBody(body) as {
			user_id: string;
			name: string;
		};
		if (!user_id) throw new BadRequestError("Required body field missing: user_id");
		if (!name) throw new BadRequestError("Required body field missing: name");
		if (await Bag.findOne({ user_id, name })) throw new BadRequestError("You already have a bag with that name");
		if (name.length < 1) throw new BadRequestError("Bag name must be at least 1 character");
		if (name.length > 32) throw new BadRequestError("Bag name must be no more than 32 characters");
		const bag = await Bag.create({ user_id, name });
		return buildBagResponse(bag);
	});

	/* Add disc to bag (bearer auth secured) */
	app.put("/bag/add-disc", async ({ request, body }) => {
		assertIsRequestAuthorized(request);
		const { id, disc_id } = parseBody(body) as { id: string; disc_id: string };
		if (!id) throw new BadRequestError("Required body field missing: id");
		if (!disc_id) throw new BadRequestError("Required body field missing: disc_id");
		const bag = await Bag.findOne({ id });
		if (!bag) throw new NotFoundError("Bag not found");
		const disc = await Disc.findOne({ id: disc_id });
		if (!disc) throw new NotFoundError("Disc not found");
		if (bag.discs.includes(disc_id)) throw new BadRequestError("Bag already contains this disc");
		bag.discs.push(disc_id);
		await Bag.updateOne({ id }, bag);
		return buildBagResponse(bag);
	});

	/* Remove disc from bag (bearer auth secured) */
	app.put("/bag/remove-disc", async ({ request, body }) => {
		assertIsRequestAuthorized(request);
		const { id, disc_id } = parseBody(body) as { id: string; disc_id: string };
		if (!id) throw new BadRequestError("Required body field missing: id");
		if (!disc_id) throw new BadRequestError("Required body field missing: disc_id");
		const bag = await Bag.findOne({ id });
		if (!bag) throw new NotFoundError("Bag not found");
		const disc = await Disc.findOne({ id: disc_id });
		if (!disc) throw new NotFoundError("Disc not found");
		if (!bag.discs.includes(disc_id)) throw new BadRequestError("Bag does not contain this disc");
		bag.discs = bag.discs.filter(discId => discId !== disc_id);
		await Bag.updateOne({ id }, bag);
		return buildBagResponse(bag);
	});

	/* Update name of bag (bearer auth secured) */
	app.put("/bag/update-name", async ({ request, body }) => {
		assertIsRequestAuthorized(request);
		const { id, name } = parseBody(body) as { id: string; name: string };
		if (!id) throw new BadRequestError("Required body field missing: id");
		if (!name) throw new BadRequestError("Required body field missing: name");
		if (name.length < 1) throw new BadRequestError("Bag name must be at least 1 character");
		if (name.length > 32) throw new BadRequestError("Bag name must be no more than 32 characters");
		const bag = await Bag.findOne({ id });
		if (!bag) throw new NotFoundError("Bag not found");
		if (await Bag.findOne({ user_id: bag.user_id, name }))
			throw new BadRequestError("You already have a bag with that name");
		bag.name = name;
		await Bag.updateOne({ id }, bag);
		return buildBagResponse(bag);
	});

	/* Delete bag (bearer auth secured) */
	app.delete("/bag/delete/:id", async ({ request, params: { id } }) => {
		assertIsRequestAuthorized(request);
		if (!id) throw new BadRequestError("Required path param missing: id");
		const bag = await Bag.findOne({ id });
		if (!bag) throw new NotFoundError("Bag not found");
		return await Bag.deleteOne({ id });
	});
};
