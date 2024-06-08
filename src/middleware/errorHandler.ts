import { Elysia } from "elysia";

import { Config } from "@helpers";
import { log } from "@services";

export const useErrorHandler = (app: Elysia) => {
	app.onError(({ error, request, path }) => {
		const { message = error.toString() || "Internal Server Error", status = 500 } = error as {
			message?: string;
			status?: number;
		};
		!Config.IS_PROD && log.error(`${new Date().toISOString()} ${request.method} ${path} ${status} ${message}`);
		return { error: message };
	});
};
