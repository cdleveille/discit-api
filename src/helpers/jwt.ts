import dateFormat from "dateformat";
import jwt from "jsonwebtoken";

import { IJWT, IJwtPayload } from "../types/abstract";
import config from "./config";

export default class Jwt {
	public static async Sign(payload: IJwtPayload) {
		try {
			return jwt.sign(payload, config.JWT_SECRET, {
				expiresIn: config.JWT_EXPIRATION
			});
		} catch (e) {
			throw Error(e);
		}
	}

	public static async Verify(token: string) {
		try {
			const data = <IJWT>(<unknown>jwt.verify(token, config.JWT_SECRET));
			return {
				id: data.id,
				username: data.username,
				iat: data.iat,
				exp: data.exp,
				issued: dateFormat(new Date(parseInt(data.iat) * 1000), "yyyy-mm-dd h:MM:ss"),
				expires: dateFormat(new Date(parseInt(data.exp) * 1000), "yyyy-mm-dd h:MM:ss")
			} as IJWT;
		} catch (e) {
			throw Error(e);
		}
	}

	public static async SignUser(user: IJwtPayload) {
		const token: string = await Jwt.Sign({
			id: user.id,
			username: user.username
		} as IJwtPayload);
		return token;
	}
}
