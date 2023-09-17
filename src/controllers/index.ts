import { Request, Response, Router } from "express";

import { Routes } from "../types/constant";
import bagRouter from "./bag";
import discRouter from "./disc";
import userRouter from "./user";

const router = Router();
router.use(Routes.disc, discRouter);
router.use(Routes.user, userRouter);
router.use(Routes.bag, bagRouter);

router.get(Routes.root, async (_req: Request, res: Response) => {
	res.redirect(Routes.disc);
});

export default router;
export * from "./bag";
export * from "./disc";
export * from "./user";
