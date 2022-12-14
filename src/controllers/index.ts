import { Request, Response, Router } from "express";

import { Routes } from "../types/constants";
import discRouter from "./disc";

const router = Router();
router.use(Routes.disc, discRouter);

router.get(Routes.root, async (req: Request, res: Response): Promise<Response | void> => {
	res.redirect(Routes.disc);
});

export default router;
