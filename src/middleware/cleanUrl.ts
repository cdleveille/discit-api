import { NextFunction, Request, Response } from "express";

const cleanUrl = (req: Request, res: Response, next: NextFunction) => {
	if (req.url.toLowerCase().startsWith("/disc")) {
		const cleanedUrl = correctURL(req.url);
		if (cleanedUrl !== req.url) res.redirect(cleanedUrl);
	}
	next();
};

const correctURL = (url: string) => {
	let slug = url.toLowerCase();
	slug = slug.replace(/[\\,+()$~!@^|`.'":;*<>{}[\]]/g, "");
	slug = slug.replace(/%20/g, "-");
	return slug;
};

export default cleanUrl;