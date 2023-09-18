import { Elysia } from "elysia";

import { initRoutes } from "@controllers";
import { Config } from "@helpers";
import { initMiddleware } from "@middleware";
import { initCron, log, refreshDiscs } from "@services";

export const startServer = async () => {
	const app = new Elysia();
	initMiddleware(app);
	initRoutes(app);
	initCron(app);
	app.listen(Config.PORT, () =>
		log.info(
			`Server started in ${Config.IS_PROD ? "production" : "development"} mode - running at ${app.server
				?.hostname}:${app.server?.port}.`
		)
	);
	if (Config.REFRESH_DISCS_START) {
		log.info("REFRESH_DISCS_START is set to true. Starting disc refresh process...");
		await refreshDiscs();
	}
};
