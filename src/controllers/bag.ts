import { Elysia } from "elysia";

import { errorResponse, projection } from "@helpers";
import { Bag, Disc } from "@models";
import { assertIsRequestAuthorized } from "@services";
import { IBag } from "@types";

export const initBagRoutes = (app: Elysia) => {
	/* Get all bags (optionally filter by user id) */
	app.get("/bag", async ({ set, request, query }) => {
		try {
			assertIsRequestAuthorized(request);
			const { user_id } = query as Record<string, string>;
			const bags = await (user_id ? Bag.find({ user_id }, projection) : Bag.find({}, projection));
			if (!bags || bags.length === 0) return [];
			return bags;
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Get bag by id */
	app.get("/bag/:id", async ({ set, request, params }) => {
		try {
			assertIsRequestAuthorized(request);
			const { id } = params as Record<string, string>;
			const bag = await Bag.findOne({ id }, projection);
			if (!bag) throw { code: 404, data: "Bag not found." };
			return bag;
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Create new bag (bearer auth secured) */
	app.post("/bag/create", async ({ set, body, request }) => {
		try {
			assertIsRequestAuthorized(request);
			const { user_id, name } = JSON.parse(body as string) as IBag;

			if (await Bag.findOne({ user_id, name }))
				throw { code: 400, data: "You already have a bag with that name." };
			if (name.length < 1) throw { code: 400, data: "Bag name must be at least 1 character." };
			if (name.length > 32) throw { code: 400, data: "Bag name must be no more than 32 characters." };

			return Bag.create({ user_id, name });
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Add disc to bag (bearer auth secured) */
	app.put("/bag/add-disc", async ({ set, body, request }) => {
		try {
			assertIsRequestAuthorized(request);
			const { id, disc_id } = body as IBag & { disc_id: string };

			const bag = await Bag.findOne({ id });
			if (!bag) throw { code: 404, data: "Bag not found." };

			const disc = await Disc.findOne({ id: disc_id });
			if (!disc) throw { code: 404, data: "Disc not found." };
			if (bag.discs.includes(disc_id)) throw { code: 400, data: "Bag already contains this disc." };

			bag.discs.push(disc_id);
			return Bag.updateOne({ id }, bag);
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Remove disc from bag (bearer auth secured) */
	app.put("/bag/remove-disc", async ({ set, body, request }) => {
		try {
			assertIsRequestAuthorized(request);
			const { id, disc_id } = body as IBag & { disc_id: string };

			const bag = await Bag.findOne({ id });
			if (!bag) throw { code: 404, data: "Bag not found." };

			const disc = await Disc.findOne({ id: disc_id });
			if (!disc) throw { code: 404, data: "Disc not found." };
			if (!bag.discs.includes(disc_id)) throw { code: 400, data: "Bag does not contain this disc." };

			bag.discs = bag.discs.filter(discId => discId !== disc_id);
			return Bag.updateOne({ id }, bag);
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	/* Delete bag (bearer auth secured) */
	app.delete("/bag/delete/:id", async ({ set, params, request }) => {
		try {
			assertIsRequestAuthorized(request);
			const { id } = params as Record<string, string>;
			if (!id) throw { code: 400, data: "Required param missing: id" };
			const bag = await Bag.findOne({ id });
			if (!bag) throw { code: 404, data: "Bag not found." };
			return Bag.deleteOne({ id });
		} catch (error) {
			return errorResponse(set, error);
		}
	});
};
