import { Config } from "@helpers";

export const getAuthToken = (request: Request) => {
	const bearerToken = request.headers.get("Authorization");
	return bearerToken?.split("Bearer ")[1];
};

export const assertIsRequestAuthorized = (request: Request) => {
	const token = getAuthToken(request);
	if (!token || token !== Config.API_KEY) throw { code: 401, data: "Unauthorized." };
};
