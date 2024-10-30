import type { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import { type RequestMethod } from "@constants";

export type TRequestMethod = keyof typeof RequestMethod;

export type TEndpointHandler<
	TReqParams extends z.ZodTypeAny,
	TResBody extends z.ZodTypeAny,
	TReqBody extends z.ZodTypeAny,
	TReqQuery extends z.ZodTypeAny
> = (arg: {
	req: Request<z.infer<TReqParams>, z.infer<TResBody>, z.infer<TReqBody>, z.infer<TReqQuery>>;
	res: Response<z.infer<TResBody>>;
	next: NextFunction;
}) => Promise<void> | void;

export type TEndpointSchema<
	TReqParams extends z.ZodTypeAny,
	TResBody extends z.ZodTypeAny,
	TReqBody extends z.ZodTypeAny,
	TReqQuery extends z.ZodTypeAny
> = {
	reqParams?: TReqParams;
	resBody?: TResBody;
	reqBody?: TReqBody;
	reqQuery?: TReqQuery;
};

export type TRegisterEndpointProps<
	TReqParams extends z.ZodTypeAny,
	TResBody extends z.ZodTypeAny,
	TReqBody extends z.ZodTypeAny,
	TReqQuery extends z.ZodTypeAny
> = {
	router: Router;
	method: TRequestMethod;
	route: string;
	handler: TEndpointHandler<TReqParams, TResBody, TReqBody, TReqQuery>;
	schema?: TEndpointSchema<TReqParams, TResBody, TReqBody, TReqQuery>;
};

export type TValidateRequestPayloadAgainstSchemaProps<TSchema extends z.ZodTypeAny> = {
	payload: unknown;
	schema: TSchema;
	message?: string;
};
