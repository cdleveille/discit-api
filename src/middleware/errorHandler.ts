import { Errback, NextFunction, Request, Response } from "express";

import log from "../services/log";
import { IResponse } from "../types/abstract";

const errorHandler = (error: Errback, req: Request, res: Response, next: NextFunction) => {
	if (error) {
		log.error(error.toString());
		return res.status(500).json({
			ok: false,
			status: 500,
			error: error.toString()
		} as IResponse);
	} else next();
};

export default errorHandler;
