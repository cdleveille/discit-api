import { Elysia } from "elysia";

import { cron } from "@elysiajs/cron";
import { Config } from "@helpers";
import { log, refreshDiscs } from "@services";

const everyNightAtMidnight = "0 0 0 * * *";

export const initCron = (app: Elysia) =>
	app.use(
		cron({
			name: "refreshDiscs",
			pattern: everyNightAtMidnight,
			async run() {
				if (Config.REFRESH_DISCS_CRON) {
					log.info("REFRESH_DISCS_CRON is set to true. Starting disc refresh process...");
					await refreshDiscs();
				}
			}
		})
	);
