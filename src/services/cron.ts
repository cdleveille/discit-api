import { CronJob } from "cron";

import { fetchDiscs } from "../db/populate";
import Config from "../helpers/config";
import log from "./log";

export default class Cron {
	private static EveryNightAtMidnight = "0 0 0 * * *";

	public autoDiscMaintenance = new CronJob(
		Cron.EveryNightAtMidnight,
		async () => {
			if (Config.FETCH_DISCS_CRON) {
				log.info("FETCH_DISCS_CRON is set to true. Starting disc maintenance process...");
				await fetchDiscs();
			}
		},
		null,
		null,
		"America/New_York"
	);
}
