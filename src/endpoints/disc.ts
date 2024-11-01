import { Router } from "express";
import { z } from "zod";

import { assertRequestIsAuthorized, discByIdSchema, discQuerySchema, discSchema, registerEndpoint } from "@helpers";
import { Disc } from "@models";

export const registerDiscEndpoints = () => {
	const discRouter = Router();

	// get all discs (optionally filter by field)
	registerEndpoint({
		router: discRouter,
		method: "GET",
		route: "/",
		handler: ({ req, res }) => {
			const discs = Disc.getDiscs(req.query);
			res.json(discs);
		},
		schema: {
			reqQuery: discQuerySchema,
			resBody: z.array(discSchema)
		}
	});

	// get disc by id
	registerEndpoint({
		router: discRouter,
		method: "GET",
		route: "/:id",
		handler: ({ req, res }) => {
			const { id } = req.params;
			const disc = Disc.assertDiscExists(id);
			res.json(disc);
		},
		schema: {
			reqParams: discByIdSchema,
			resBody: discSchema
		}
	});

	// insert discs (bearer auth secured)
	registerEndpoint({
		router: discRouter,
		method: "POST",
		route: "/",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			const discs = await Disc.insertDiscs(req.body);
			res.json(discs);
		},
		schema: {
			reqBody: z.array(discSchema),
			resBody: z.array(discSchema)
		}
	});

	// delete all discs (bearer auth secured)
	registerEndpoint({
		router: discRouter,
		method: "DELETE",
		route: "/",
		handler: async ({ req, res }) => {
			assertRequestIsAuthorized(req.headers.authorization);
			await Disc.deleteAllDiscs();
			res.json({ message: "All discs deleted successfully" });
		},
		schema: {
			resBody: z.object({ message: z.string() })
		}
	});

	return { discRouter };
};
