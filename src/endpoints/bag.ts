import { Router } from "express";
import { z } from "zod";

import { assertRequestIsAuthorized, bagSchema, registerEndpoint } from "@helpers";
import { Bag } from "@models";

export const registerBagEndpoints = () => {
	const bagRouter = Router();

	// get all bags (optionally filter by user_id) (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "GET",
		route: "/",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { user_id } = req.query;
			const bags = await Bag.getBags(user_id);
			res.json(bags);
		},
		schema: {
			reqQuery: z.object({ user_id: z.string().optional() }),
			resBody: z.array(bagSchema)
		}
	});

	// get bag by id (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "GET",
		route: "/:id",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { id } = req.params;
			const bag = await Bag.assertBagExists(id);
			res.json(bag);
		},
		schema: {
			reqParams: z.object({ id: z.string() }),
			resBody: bagSchema
		}
	});

	// create new bag (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "POST",
		route: "/create",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { user_id, name } = req.body;
			const bag = await Bag.createBag(user_id, name);
			res.json(bag);
		},
		schema: {
			reqBody: z.object({ user_id: z.string(), name: z.string() }),
			resBody: bagSchema
		}
	});

	// add disc to bag (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "PATCH",
		route: "/add-disc",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { id, disc_id } = req.body;
			const bag = await Bag.addDiscToBag(id, disc_id);
			res.json(bag);
		},
		schema: {
			reqBody: z.object({ id: z.string(), disc_id: z.string() }),
			resBody: bagSchema
		}
	});

	// remove disc from bag (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "PATCH",
		route: "/remove-disc",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { id, disc_id } = req.body;
			const bag = await Bag.removeDiscFromBag(id, disc_id);
			res.json(bag);
		},
		schema: {
			reqBody: z.object({ id: z.string(), disc_id: z.string() }),
			resBody: bagSchema
		}
	});

	// update bag name (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "PATCH",
		route: "/update-name",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { id, name } = req.body;
			const bag = await Bag.updateBagName(id, name);
			res.json(bag);
		},
		schema: {
			reqBody: z.object({ id: z.string(), name: z.string() }),
			resBody: bagSchema
		}
	});

	// delete bag (bearer auth secured)
	registerEndpoint({
		router: bagRouter,
		method: "DELETE",
		route: "/delete/:id",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const { id } = req.params;
			const bag = await Bag.deleteBag(id);
			res.json(bag);
		},
		schema: {
			reqParams: z.object({ id: z.string() }),
			resBody: bagSchema
		}
	});

	return { bagRouter };
};
