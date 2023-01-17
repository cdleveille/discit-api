import { NextFunction, Request, Response } from "express";

import log from "../services/log";
import { IError, IResponse } from "../types/abstract";

const errorHandler = (error: IError, _req: Request, res: Response, next: NextFunction) => {
	if (error) {
		const { status = 500, message } = error;
		log.error(`Error (${status}): ${message}`);
		return res.status(status).json({
			ok: false,
			status,
			error: message
		} as IResponse);
	} else next();
};

export default errorHandler;
