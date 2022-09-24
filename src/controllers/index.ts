import { Request, Response, Router } from "express";

import discRouter from "./disc";
import { Routes } from "../types/constants";

const router = Router();
router.use(Routes.disc, discRouter);

router.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	res.redirect(Routes.disc);
});

export default router;
