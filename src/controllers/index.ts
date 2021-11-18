import { Request, Response, Router } from "express";

import discRouter from "./disc";
import log from "../services/log";
import { Routes } from "../types/constants";

const router = Router();
router.use(Routes.disc, discRouter);

router.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		res.render("index");
	} catch (error) {
		log.error(error);
	}
});

export default router;