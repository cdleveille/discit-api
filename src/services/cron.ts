import { CronJob } from "cron";

import { Config } from "@helpers";
import { log, refreshDiscs } from "@services";

export class Cron {
	private static EveryNightAtMidnight = "0 0 0 * * *";

	public refreshDiscsNightly = new CronJob(
		Cron.EveryNightAtMidnight,
		async () => {
			if (Config.REFRESH_DISCS_CRON) {
				log.info("REFRESH_DISCS_CRON is set to true. Starting disc refresh process...");
				await refreshDiscs();
			}
		},
		null,
		null,
		"America/New_York"
	);
}
