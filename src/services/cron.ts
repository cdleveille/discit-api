import { CronJob } from "cron";

import { maintainDiscs } from "../db/populate";
import { RequestRepo as Manager } from "../repositories/DiscRepository";

export default class Cron {
	private static EveryNightAtMidnight = "0 0 0 * * *";

	private manager: Manager;

	constructor(manager: Manager) {
		this.manager = manager;
	}

	public autoDiscMaintenance = new CronJob(Cron.EveryNightAtMidnight, async () => {
		await maintainDiscs(this.manager);
	}, null, null, "America/New_York");
}
