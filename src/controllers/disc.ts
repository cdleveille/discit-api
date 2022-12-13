import { Request, Response, Router } from "express";

import { regexify } from "../helpers/util";
import { Disc } from "../models/disc";
import log from "../services/log";
import { IDiscQuery } from "../types/abstract";
import { Routes } from "../types/constants";

const discRouter = Router();

discRouter.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const { name, brand, category, stability, speed, glide, turn, fade } = req.query as Record<string, string>;
		const query = {} as IDiscQuery;
		name && (query.name_slug = regexify(name));
		brand && (query.brand_slug = regexify(brand));
		category && (query.category_slug = regexify(category));
		stability && (query.stability_slug = regexify(stability));
		speed && (query.speed = speed);
		glide && (query.glide = glide);
		turn && (query.turn = turn);
		fade && (query.fade = fade);
		const discs = await Disc.find(query);
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.status(500);
	}
});

export default discRouter;
