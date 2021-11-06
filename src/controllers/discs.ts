import { Request, Response, Router } from "express";

import log from "../services/log";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		return res.send("disc info goes here");
	} catch (error) {
		log.error(error);
	}
});

export default router;
