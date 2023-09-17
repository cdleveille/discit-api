import { Elysia } from "elysia";

import { initRoutes } from "@controllers";
import { cors } from "@elysiajs/cors";
import { Config, initJwt } from "@helpers";
import { Cron, log, refreshDiscs } from "@services";

export const startServer = async () => {
	const app = new Elysia();
	app.use(cors());
	initJwt(app);
	initRoutes(app);
	app.listen(Config.PORT, () =>
		log.info(
			`Server started in ${Config.IS_PROD ? "production" : "development"} mode - running at ${app.server
				?.hostname}:${app.server?.port}.`
		)
	);

	const cron = new Cron();
	cron.refreshDiscsNightly.start();

	if (Config.REFRESH_DISCS_START) {
		log.info("REFRESH_DISCS_START is set to true. Starting disc refresh process...");
		await refreshDiscs();
	}
};
