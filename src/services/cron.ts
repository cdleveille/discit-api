import { CronJob } from "cron";

import { refreshDiscs } from "../db/populate";
import Config from "../helpers/config";
import log from "./log";

export default class Cron {
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
