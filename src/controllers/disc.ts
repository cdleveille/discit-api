import { NextFunction, Request, Response, Router } from "express";

import { projection, regexify } from "../helpers/util";
import { Disc } from "../models/disc";
import { IDisc, IDiscFilter } from "../types/abstract";
import { Routes } from "../types/constants";

const discRouter = Router();

discRouter.get(Routes.root, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filter = buildFilter(req.query as Record<string, string>);
		const discs = (await Disc.find(filter, projection).sort({
			name: 1
		})) as IDisc[];
		if (!discs || discs.length === 0) return res.status(404).json([]);
		return res.status(200).json(discs);
	} catch (error) {
		next(error);
	}
});

discRouter.get(`${Routes.root}:id_or_name`, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id_or_name } = req.params;
		const [discById, discByName] = (await Promise.all([
			Disc.findOne({ id: id_or_name }, projection),
			Disc.findOne({ name_slug: id_or_name }, projection)
		])) as IDisc[];
		if (discById || discByName) return res.status(200).json(discById ?? discByName);
		return res.status(404).json(null);
	} catch (error) {
		next(error);
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
