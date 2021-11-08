import { Request, Response, Router } from "express";

import log from "../services/log";
import { DiscRepository as DiscRepo } from "../repositories/DiscRepository";
import { Disc } from "../models/Disc";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		const manager = res.locals.em.getRepository(Disc);
		const discs = await DiscRepo.FindAll(manager);
		return res.send(discs);
	} catch (error) {
		log.error(error);
	}
});

export default router;
