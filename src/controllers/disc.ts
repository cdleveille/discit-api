import { Request, Response, Router } from "express";

import { Disc } from "../models/disc";
import log from "../services/log";
import { Routes } from "../types/constants";

const discRouter = Router();

discRouter.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const discs = await Disc.find();
		return res.json(discs);
	} catch (error) {
		log.error(error);
		return res.status(500);
	}
});

export default discRouter;
