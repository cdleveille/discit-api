import { Request, Response, Router } from "express";

import { Routes } from "../types/constants";
import discRouter from "./disc";

const router = Router();
router.use(Routes.disc, discRouter);

router.get(Routes.root, async (_req: Request, res: Response) => {
	res.redirect(Routes.disc);
});

export default router;
