import { CronJob } from "cron";

import { fetchDiscs } from "../db/populate";
import Config from "../helpers/config";

export default class Cron {
	private static EveryNightAtMidnight = "0 0 0 * * *";

	public autoDiscMaintenance = new CronJob(
		Cron.EveryNightAtMidnight,
		async () => {
			if (Config.FETCH_DISCS_CRON) await fetchDiscs();
		},
		null,
		null,
		"America/New_York"
	);
}
