import { Elysia } from "elysia";

import { jwt } from "@elysiajs/jwt";
import { Config } from "@helpers";

export const initJwt = (app: Elysia) => {
	app.use(
		jwt({
			name: "jwt",
			secret: Config.JWT_SECRET,
			exp: Config.JWT_EXPIRATION
		})
	);
};
