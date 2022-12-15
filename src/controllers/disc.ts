import { Request, Response, Router } from "express";

import { regexify } from "../helpers/util";
import { Disc } from "../models/disc";
import log from "../services/log";
import { IDisc, IDiscFilter } from "../types/abstract";
import { Routes } from "../types/constants";

const discRouter = Router();

discRouter.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const filter = buildFilter(req.query as Record<string, string>);
		const discs = (await Disc.find(filter, { _id: 0, created_at: 0, updated_at: 0, __v: 0 }).sort({
			name: 1
		})) as IDisc[];
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.status(500);
	}
});

const buildFilter = (query: Record<string, string>) => {
	const { id, name, brand, category, stability, speed, glide, turn, fade } = query;
	const filter = {} as IDiscFilter;
	id && (filter.id = id);
	name && (filter.name_slug = regexify(name));
	brand && (filter.brand_slug = regexify(brand));
	category && (filter.category_slug = regexify(category));
	stability && (filter.stability_slug = stability);
	speed && (filter.speed = speed);
	glide && (filter.glide = glide);
	turn && (filter.turn = turn);
	fade && (filter.fade = fade);
	return filter;
};

export default discRouter;
