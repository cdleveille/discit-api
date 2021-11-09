import express, { Request, Response, NextFunction } from "express";

import { Database } from "../services/db";
import router from "../controllers";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
	res.locals.em = Database.Manager.fork();
	next();
});

app.use("/", router);

export default app;
