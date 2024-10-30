import type { NextFunction, Request, Response } from "express";
import { z, type ZodError, type ZodIssue } from "zod";

import { RequestMethod } from "@constants";
import { CustomError } from "@helpers";
import type { TRegisterEndpointProps, TValidateRequestPayloadAgainstSchemaProps } from "@types";

export const registerEndpoint = <
	TReqParams extends z.ZodTypeAny,
	TResBody extends z.ZodTypeAny,
	TReqBody extends z.ZodTypeAny,
	TReqQuery extends z.ZodTypeAny
>({
	router,
	method,
	route,
	handler,
	schema
}: TRegisterEndpointProps<TReqParams, TResBody, TReqBody, TReqQuery>) => {
	const { reqParams = z.any(), reqBody = z.any(), reqQuery = z.any() } = schema ?? {};
	router[RequestMethod[method]](
		route,
		async (
			req: Request<TReqParams, TResBody, TReqBody, TReqQuery>,
			res: Response<TResBody>,
			next: NextFunction
		) => {
			try {
				validateRequestPayloadAgainstSchema({
					payload: req.params,
					schema: reqParams,
					message: "Invalid request route parameter(s)"
				});
				validateRequestPayloadAgainstSchema({
					payload: req.body,
					schema: reqBody,
					message: "Invalid request body"
				});
				validateRequestPayloadAgainstSchema({
					payload: req.query,
					schema: reqQuery,
					message: "Invalid request query parameter(s)"
				});
				await handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};

const validateRequestPayloadAgainstSchema = <TSchema extends z.ZodTypeAny>({
	payload,
	schema,
	message = "Invalid request payload"
}: TValidateRequestPayloadAgainstSchemaProps<TSchema>) => {
	const result = schema.safeParse(payload);
	if (!result.success) throwValidationError(message, result.error);
};

const throwValidationError = (message: string, error: ZodError) => {
	const errorMessages = error.errors
		.map(err => {
			const error = err as ZodIssue & { expected?: string };
			const path = error.path.join(".");
			const message = error.message;
			const expected = error.expected ? ` <${error.expected}>` : "";
			return `${path}${expected}: ${message}`;
		})
		.join(", ");
	throw new CustomError(`${message}: ${errorMessages}`, 400);
};
