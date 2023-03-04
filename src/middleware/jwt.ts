import { NextFunction, Request, Response } from "express";

import Jwt from "../helpers/jwt";

export const validate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers["authorization"];

		const token = authHeader && authHeader.split(" ")[1];

		if (token == null) {
			res.locals.jwt = null;
			throw Error("Invalid JWT");
		}

		const payload = await Jwt.Verify(token);
		if (!payload) {
			res.locals.jwt = null;
			throw Error("Invalid JWT");
		}

		res.locals.jwt = payload;
		return next();
	} catch (e) {
		res.locals.jwt = null;
		next(e);
	}
};
