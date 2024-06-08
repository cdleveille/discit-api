import { Elysia } from "elysia";

import { Config } from "@helpers";
import { log } from "@services";

export const useLogger = (app: Elysia) => {
	app.onResponse(({ request, error, path }) => {
		const { message } = error as { message?: string };
		if (message) return;
		!Config.IS_PROD && log.info(`${new Date().toISOString()} ${request.method} ${path} 200`);
	});
};
