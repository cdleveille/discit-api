import { NextFunction, Request, Response } from "express";

export default () => {
	return (req: Request, res: Response, next: NextFunction) => {
		const url = req.url.toLowerCase();
		if (url.startsWith("/disc") || url.startsWith("\\disc")) {
			const cleanedUrl = cleanUrl(url);
			if (cleanedUrl !== req.url) res.redirect(cleanedUrl);
		}
		next();
	};
};

const cleanUrl = (url: string) => {
	let clean = url.replace(/[,+()$~!@^|`.'":;*<>{}[\]]/g, "");
	clean = clean.replace(/%20/g, "-");
	clean = clean.replace(/\\/g, "/");
	return clean;
};