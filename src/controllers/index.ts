import { Request, Response, Router } from "express";

import discRouter from "./disc";
import fs from "fs";
import path from "path";
import log from "../services/log";
import { Routes } from "../../client/src/shared/types/constants";

const router = Router();
router.use(Routes.disc, discRouter);


router.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	try {
		if (fs.existsSync(path.join(process.cwd(), "client/build"))) {
			res.sendFile(path.join(process.cwd(), "client/build/index.html"));
		} else {
			res.send("Run 'yarn dev' or 'debug' launch config and go to http://localhost:3000/ to use front end (/client/build folder does not exist)");
		}
	} catch (error) {
		log.error(error);
	}
});

export default router;