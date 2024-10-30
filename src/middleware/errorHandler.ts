import type { NextFunction, Request, Response } from "express";

import { CustomError } from "@helpers";

export const errorHandler = () => (error: Error | CustomError, _req: Request, res: Response, next: NextFunction) => {
	if (!error) return next();
	const statusCode = error instanceof CustomError ? error.statusCode : res.statusCode !== 200 ? res.statusCode : 500;
	const errorMessage = (typeof error === "string" ? error : error.message) || "Internal Server Error";
	res.status(statusCode).json({ message: errorMessage });
};
