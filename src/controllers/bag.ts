import { Elysia } from "elysia";

import { errorResponse, projection } from "@helpers";
import { Bag, Disc, User } from "@models";
import { IBag } from "@types";

export const initBagRoutes = (app: Elysia) => {
	app.get("/bag", async ({ set, query }) => {
		try {
			const { user_id } = query as Record<string, string>;
			if (!user_id) throw { code: 400, data: "Required query field: user_id" };

			const user = await User.findOne({ id: user_id });
			if (!user) throw { code: 404, data: "User not found." };

			const bags = await Bag.find({ user_id }, projection);
			if (!bags || bags.length === 0) return [];
			return bags;
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	app.get("/bag/:id", async ({ set, params }) => {
		try {
			const { id } = params as Record<string, string>;
			if (!id) throw { code: 400, data: "Required param field: id" };

			const bag = await Bag.findOne({ id }, projection);
			if (!bag) throw { code: 404, data: "Bag not found." };
			return bag;
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	app.post("/bag/create", async ({ set, body }) => {
		try {
			const { user_id, name } = body as IBag;

			const user = await User.findOne({ id: user_id });
			if (!user) throw { code: 404, data: "User not found." };

			if (await Bag.findOne({ user_id, name })) throw { code: 400, data: "You already have a bag of that name." };
			if (name.length < 1) throw { code: 400, data: "Bag name must be at least 1 character." };
			if (name.length > 32) throw { code: 400, data: "Bag name must be no more than 32 characters." };

			return await Bag.create({ user_id, name });
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	app.post("/bag/add-disc", async ({ set, body }) => {
		try {
			const { id, disc_id } = body as IBag & { disc_id: string };

			const bag = await Bag.findOne({ id });
			if (!bag) throw { code: 404, data: "Bag not found." };

			const disc = await Disc.findOne({ id: disc_id });
			if (!disc) throw { code: 404, data: "Disc not found." };
			if (bag.discs.includes(disc_id)) throw { code: 400, data: "Bag already contains this disc." };

			bag.discs.push(disc_id);
			return await Bag.updateOne({ id }, bag);
		} catch (error) {
			return errorResponse(set, error);
		}
	});

	app.post("/bag/remove-disc", async ({ set, body }) => {
		try {
			const { id, disc_id } = body as IBag & { disc_id: string };

			const bag = await Bag.findOne({ id });
			if (!bag) throw { code: 404, data: "Bag not found." };

			const disc = await Disc.findOne({ id: disc_id });
			if (!disc) throw { code: 404, data: "Disc not found." };
			if (!bag.discs.includes(disc_id)) throw { code: 400, data: "Bag does not contain this disc." };

			bag.discs = bag.discs.filter(discId => discId !== disc_id);
			return await Bag.updateOne({ id }, bag);
		} catch (error) {
			return errorResponse(set, error);
		}
	});
};
