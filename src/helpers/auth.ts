import { Config, CustomError } from "@helpers";

export const assertRequestIsAuthorized = (authorization: string | undefined) => {
	const token = authorization?.split("Bearer ")?.[1];
	if (!token || token !== Config.API_KEY) throw new CustomError("Unauthorized", 401);
};
