import { NextFunction, Request, Response } from "express";

import { FieldTypos } from "../types/constants";

export default () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const url = req.url.toLowerCase();
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
	let clean = url.replace(/[,+()$~!@^|`.'":;*<>{}[\]]/g, "");
	clean = clean.replace(/%20/g, "-");
	clean = clean.replace(/\\/g, "/");
	clean = clean.replace(/\/{2,}/g, "/");

	// correct typos
	for (let [key, values] of FieldTypos) {
		for (let value of values) {
			if (clean.includes(`/${value}`)) {
				clean = clean.replace(`/${value}`, `/${key}`);
			}
			if (clean.includes(`?${value}`)) {
				clean = clean.replace(`&${value}`, `&${key}`);
			}
			if (clean.includes(`?${value}`)) {
				clean = clean.replace(`?${value}`, `?${key}`);
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