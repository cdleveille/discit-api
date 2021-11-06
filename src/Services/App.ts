import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { Config } from "./Config";

export class App {

	private static instance = fastify({ logger: !Config.Environment.IS_PROD });

	private static async Prepare(): Promise<void> {
		App.instance.setErrorHandler(async (error: FastifyError, _: FastifyRequest, res: FastifyReply) => {
			console.log("application error", error);
			res.send({
				ok: false,
				status: error.code ?? 500,
				data: error
			});
		});
	}

	public static async Start(): Promise<void> {
		await App.Prepare();
		await App.instance.listen(Config.Environment.PORT, Config.Environment.HOST);
	}

}