import { Router } from "express";

import discsRouter from "./discs";

const router = Router();

router.use("/discs", discsRouter);

export default router;
