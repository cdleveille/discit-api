import { Config } from "@helpers";

export const assertIsRequestAuthorized = (request: Request) => {
	const authorization = request.headers.get("Authorization");
	const token = authorization?.split("Bearer ")?.[1];
	if (!token || token !== Config.API_KEY) throw { code: 401, data: "Unauthorized." };
};
