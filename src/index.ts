import express from "express";

import { Env } from "@constants";
import { initEndpoints } from "@endpoints";
import { Config } from "@helpers";
import { errorHandler, initMiddleware, notFound } from "@middleware";
import { Disc } from "@models";
import { connectToDatabase, log } from "@services";

const { IS_PROD, PORT } = Config;

const app = express();

await connectToDatabase();

await Disc.setDiscData();

initMiddleware(app);

initEndpoints(app);

// these must be applied last
app.use(notFound());
app.use(errorHandler());

app.listen(PORT, () => {
	log.info(
		`Server started in ${IS_PROD ? Env.Production : Env.Development} mode - listening on ${!IS_PROD ? "http://localhost:" : "port "}${PORT}`
	);
});
