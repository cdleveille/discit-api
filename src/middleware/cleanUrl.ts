import { NextFunction, Request, Response } from "express";

import { FieldTypos } from "../types/constants";

export default () => {
	return (req: Request, res: Response, next: NextFunction) => {
		let url = req.url.toLowerCase()
			.replace(/\\/g, "/")
			.replace(/\/{2,}/g, "/");
		if (isDiscRoute(url)) {
			const clean = cleanUrl(url);
			if (clean !== req.url) {
				return res.redirect(clean);
			}
		}
		next();
	};
};

const cleanUrl = (url: string) => {
	// replace disallowed characters/sequences
	let clean = url.replace(/[,+()$~!@^|`.'":;*<>{}[\]]/g, "")
		.replace(/&amp/g, "&amp;")
		.replace(/%20/g, "-")
		.replace(/\?{2,}/g, "?")
		.replace(/={2,}/g, "=");

	// correct field name typos
	for (const [key, values] of FieldTypos) {
		for (const value of values) {
			for (const char of ["/", "&amp;", "?"]) {
				if (clean.includes(`${char}${value}`)) {
					clean = clean.replace(`${char}${value}`, `${char}${key}`);
					break;
				}
			}
		}
	}

	return clean;
};

const isDiscRoute = (url: string): boolean => {
	if (url.startsWith("/disc") || url.startsWith("\\disc")) return true;

	for (let value of FieldTypos.get("disc")) {
		if (url.startsWith(`/${value}`) || url.startsWith(`\\${value}`)) {
			return true;
		}
	}
	return false;
};