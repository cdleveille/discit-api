import { Request, Response, Router } from "express";

import discRouter from "./disc";
import log from "../services/log";

const router = Router();
router.use("/disc", discRouter);

router.get("/", async (req: Request, res: Response): Promise<Response | void> => {
	try {
		res.render("index");
	} catch (error) {
		log.error(error);
	}
});

export default router;