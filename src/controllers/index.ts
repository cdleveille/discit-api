import { Router } from "express";

import discRouter from "./disc";

const router = Router();
router.use("/disc", discRouter);

export default router;