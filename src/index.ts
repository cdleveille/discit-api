import { Config, initErrorHandling } from "@helpers";
import { OpenAPIHono } from "@hono/zod-openapi";
import { initMiddleware } from "@middleware";
import { Disc } from "@models";
import { initRoutes } from "@routes";
import { connectToDatabase, log } from "@services";

await connectToDatabase();

await Disc.refreshDiscCache();

const app = new OpenAPIHono({
	defaultHook: (result, c) => {
		if (!result.success) {
			return c.json(
				{
					message: result.error.errors
						.map(err => {
							const error = err as typeof err & { expected?: string };
							const path = error.path.join(".");
							const message = error.message;
							const expected = error.expected ? ` <${error.expected}>` : "";
							return `${path}${expected}: ${message}`;
						})
						.join(", ")
				},
				400
			);
		}
	},
	strict: false
});

initMiddleware(app);

initRoutes(app);

initErrorHandling(app);

log.info(`HTTP server started on port ${Config.PORT}.`);

export default {
	port: Config.PORT,
	fetch: app.fetch
};
